/* Joins class names and drops anything falsy, so a conditional modifier
   can be written inline without leaving a stray "undefined" in class.
   The argument type is deliberately loose: `error && 'x'` where error is
   a ReactNode can evaluate to 0 or '', and both mean "no class here". */
export const cx = (...parts: unknown[]) =>
  parts.filter((p): p is string => typeof p === 'string' && p.length > 0).join(' ');
