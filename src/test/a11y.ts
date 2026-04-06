import { expect } from 'vitest';
import { axe } from 'vitest-axe';

/**
 * Convenience wrapper with sane defaults.
 * Add rule overrides per-test if needed.
 */
export async function expectNoA11yViolations(container: HTMLElement) {
  const results = await axe(container);
  expect(
    results.violations,
    results.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length} node(s))`).join('\n'),
  ).toHaveLength(0);
}

