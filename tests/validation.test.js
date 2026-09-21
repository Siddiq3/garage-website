import { describe, expect, it } from 'vitest';
import { RULES, validate } from '../lib/validation';
import cases from '../shared/validation-cases.json' with { type: 'json' };

/**
 * The website must agree with the API and the app on every shared example.
 * Cases live in shared/validation-cases.json; adding one there tests all three.
 */
describe('shared validation cases', () => {
  const rules = Object.keys(cases).filter((rule) => RULES[rule]);

  it('covers the fields this site collects', () => {
    expect(rules).toContain('email');
  });

  rules.forEach((rule) => {
    describe(rule, () => {
      cases[rule].valid.forEach((value) => {
        it(`accepts ${JSON.stringify(value)}`, () => {
          expect(RULES[rule](value)).toBeUndefined();
        });
      });

      cases[rule].invalid.forEach((value) => {
        it(`rejects ${JSON.stringify(value)}`, () => {
          expect(RULES[rule](value)).toBeTypeOf('string');
        });
      });
    });
  });
});

describe('rules applied to a form', () => {
  it('rejects a blank sign-in', () => {
    expect(validate({ email: '', password: '' }, { email: RULES.email, password: RULES.password })).toEqual({
      email: 'Required',
      password: 'Required',
    });
  });

  it('rejects a password longer than the API accepts', () => {
    expect(RULES.password('x'.repeat(65))).toBe('Must be at most 64 characters');
  });

  it('accepts a real sign-in', () => {
    expect(validate({ email: 'owner@garage.in', password: 'secret123' }, { email: RULES.email, password: RULES.password })).toEqual({});
  });

  it('rejects text with control characters instead of stripping them', () => {
    expect(RULES.email('owner\u0000@garage.in')).toBe('Contains invalid characters');
  });
});
