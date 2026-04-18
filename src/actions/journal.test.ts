import { describe, expect, it, vi } from 'vitest';
import { entryHasAnalysis } from './journal';
import db from '@/utils/db';
import { getUserByClerkId } from '@/utils/auth';

vi.mock('@/utils/auth', () => ({
  getUserByClerkId: vi.fn(),
}));

vi.mock('@/utils/db', () => ({
  default: {
    entry: {
      findFirst: vi.fn(),
    },
  },
}));

describe('entryHasAnalysis', () => {
  it('returns false when user is not authenticated', async () => {
    vi.mocked(getUserByClerkId).mockResolvedValueOnce(null);

    const result = await entryHasAnalysis('entry-1');

    expect(result).toBe(false);
    expect(db.entry.findFirst).not.toHaveBeenCalled();
  });

  it('returns false when entry has no analysis', async () => {
    vi.mocked(getUserByClerkId).mockResolvedValueOnce({ id: 'user-1' } as never);
    vi.mocked(db.entry.findFirst).mockResolvedValueOnce({ analysis: null } as never);

    const result = await entryHasAnalysis('entry-1');

    expect(result).toBe(false);
    expect(db.entry.findFirst).toHaveBeenCalledWith({
      where: { id: 'entry-1', userId: 'user-1' },
      select: { analysis: { select: { id: true } } },
    });
  });

  it('returns true when entry has analysis', async () => {
    vi.mocked(getUserByClerkId).mockResolvedValueOnce({ id: 'user-1' } as never);
    vi.mocked(db.entry.findFirst).mockResolvedValueOnce({ analysis: { id: 'analysis-1' } } as never);

    const result = await entryHasAnalysis('entry-1');

    expect(result).toBe(true);
  });
});
