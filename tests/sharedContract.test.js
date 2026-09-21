import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

/**
 * The validation contract is duplicated in the backend and app repositories,
 * because none of the three can import from the others. Nothing would break
 * loudly if the copies drifted — a rule relaxed in the API and tightened here
 * would leave every suite green while the products disagreed about what is
 * valid — so the file is pinned by digest.
 */
const file = new URL('../shared/validation-cases.json', import.meta.url);

describe('shared validation contract', () => {
  it('matches the digest recorded beside it', () => {
    const digest = createHash('sha256').update(readFileSync(file)).digest('hex');
    const recorded = readFileSync(new URL('../shared/validation-cases.sha256', import.meta.url), 'utf8').trim();

    expect(digest).toBe(recorded);
  });

  it('covers the fields this site collects', () => {
    const cases = JSON.parse(readFileSync(file, 'utf8'));
    expect(Object.keys(cases)).toContain('email');
  });
});
