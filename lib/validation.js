/**
 * The same field rules the API enforces (garage-saas-backend/src/validators/fields.js)
 * and the app applies (garage-app/src/validation/rules.js): type, length then format.
 * Input is rejected, never silently "cleaned up".
 *
 * Each rule returns an error message, or undefined when the value is valid.
 */
export const PATTERNS = {
  email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/,
  mobile: /^[6-9][0-9]{9}$/,
};

export const LIMITS = { email: 254, password: 64, name: 60, message: 1000 };

const CONTROL_CHARS = /[\u0000-\u0009\u000B-\u001F\u007F]/;

function text({ min = 1, max, pattern, message, multiline = false }) {
  return (value) => {
    if (typeof value !== 'string') return 'Must be text';
    if (value.length === 0 && min > 0) return 'Required';
    if (value.length < min) return `Must be at least ${min} characters`;
    if (value.length > max) return `Must be at most ${max} characters`;
    if (value !== value.trim()) return 'Must not start or end with spaces';
    if (!multiline && / {2,}/.test(value)) return 'Must not contain double spaces';
    if (CONTROL_CHARS.test(value)) return 'Contains invalid characters';
    if (pattern && !pattern.test(value)) return message;
    return undefined;
  };
}

export const RULES = {
  email: text({ min: 5, max: LIMITS.email, pattern: PATTERNS.email, message: 'Enter a valid email address' }),
  password: text({ min: 1, max: LIMITS.password }),
};

/** Returns { field: message } for the fields that fail; empty when the form is valid. */
export function validate(values, rules) {
  const errors = {};
  Object.entries(rules).forEach(([field, rule]) => {
    const error = rule(values[field] ?? '');
    if (error) errors[field] = error;
  });
  return errors;
}
