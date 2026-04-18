import { describe, expect, it, vi } from 'vitest';
import { getAnalyses, getEntries } from './db-helpers';
import db from './db';
import { getUserByClerkId } from './auth';
import { cacheLife, cacheTag } from 'next/cache';

vi.mock('next/cache', () => ({
  cacheLife: vi.fn(),
  cacheTag: vi.fn(),
}));

vi.mock('./auth', () => ({
  getUserByClerkId: vi.fn(),
}));

vi.mock('./date', () => ({
  formatDate: vi.fn((value: Date) => `formatted-${value.toISOString()}`),
}));

vi.mock('./db', () => ({
  default: {
    entry: {
      findMany: vi.fn(),
    },
    analysis: {
      findMany: vi.fn(),
    },
  },
}));

describe('db-helpers', () => {
  it('getEntries returns null for unauthenticated user', async () => {
    vi.mocked(getUserByClerkId).mockResolvedValueOnce(null);

    const entries = await getEntries();

    expect(entries).toBeNull();
    expect(db.entry.findMany).not.toHaveBeenCalled();
  });

  it('getEntries fetches entries with analysis and formats dates', async () => {
    const now = new Date('2026-01-01T00:00:00.000Z');
    vi.mocked(getUserByClerkId).mockResolvedValueOnce({ id: 'user-1' } as never);
    vi.mocked(db.entry.findMany).mockResolvedValueOnce([
      {
        id: 'entry-1',
        title: 'Title',
        content: 'Content',
        userId: 'user-1',
        createdAt: now,
        updatedAt: now,
      },
    ] as never);

    const entries = await getEntries();

    expect(cacheTag).toHaveBeenCalledWith('user-entries-user-1');
    expect(cacheLife).toHaveBeenCalledWith('max');
    expect(db.entry.findMany).toHaveBeenCalledWith({
      where: { userId: 'user-1' },
      include: { analysis: true },
      orderBy: { createdAt: 'desc' },
    });
    expect(entries?.[0].createdAt).toContain('formatted-');
  });

  it('getAnalyses fetches user analysis trends', async () => {
    vi.mocked(getUserByClerkId).mockResolvedValueOnce({ id: 'user-2' } as never);
    vi.mocked(db.analysis.findMany).mockResolvedValueOnce([
      {
        createdAt: new Date('2026-01-01T00:00:00.000Z'),
        mood: 8,
      },
    ] as never);

    const analyses = await getAnalyses();

    expect(cacheTag).toHaveBeenCalledWith('user-analyses-user-2');
    expect(cacheLife).toHaveBeenCalledWith('max');
    expect(db.analysis.findMany).toHaveBeenCalledWith({
      where: { entry: { userId: 'user-2' } },
      orderBy: { createdAt: 'desc' },
    });
    expect(analyses).toEqual([{ createdAt: new Date('2026-01-01T00:00:00.000Z'), mood: 8 }]);
  });
});
