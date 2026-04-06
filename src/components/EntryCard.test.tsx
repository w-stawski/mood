import { render, screen } from '@testing-library/react';
import EntryCard from './EntryCard';
import { describe, it, expect } from 'vitest';
import { JournalEntryWithFormattedDates } from '@/utils/db-helpers';
import { expectNoA11yViolations } from '@/test/a11y';

describe('EntryCard', () => {
  const mockEntry: JournalEntryWithFormattedDates = {
    id: '1',
    title: 'Test Entry',
    content: 'This is a test journal entry content.',
    createdAt: 'March 27, 2026',
    updatedAt: 'March 27, 2026',
    userId: 'user_123',
    analysis: null,
  };

  it('renders entry title and content', () => {
    render(<EntryCard entry={mockEntry} />);
    
    expect(screen.getByText('Test Entry')).toBeInTheDocument();
    expect(screen.getByText('This is a test journal entry content.')).toBeInTheDocument();
    expect(screen.getByText('March 27, 2026')).toBeInTheDocument();
  });

  it('has no obvious accessibility violations', async () => {
    const { container } = render(<EntryCard entry={mockEntry} />);
    await expectNoA11yViolations(container);
  });
});
