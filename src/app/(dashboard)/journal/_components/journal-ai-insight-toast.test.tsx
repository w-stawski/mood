import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { JournalAiInsightToast } from './journal-ai-insight-toast';

const mockRefresh = vi.fn();
const mockReplace = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: mockRefresh,
    replace: mockReplace,
  }),
  useSearchParams: () => new URLSearchParams('insights=entry_123'),
}));

vi.mock('@/actions/journal', () => ({
  entryHasAnalysis: vi.fn(),
}));

describe('JournalAiInsightToast', () => {
  beforeEach(() => {
    mockRefresh.mockReset();
    mockReplace.mockReset();
  });

  it('shows toast once analysis is detected', async () => {
    const { entryHasAnalysis } = await import('@/actions/journal');
    vi.mocked(entryHasAnalysis).mockResolvedValueOnce(true);

    render(<JournalAiInsightToast />);

    expect(await screen.findByText('AI insights are ready')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View entry' })).toHaveAttribute('href', '/journal/entry_123');
    expect(mockRefresh).toHaveBeenCalled();
    expect(mockReplace).toHaveBeenCalledWith('/journal', { scroll: false });
  });
});

