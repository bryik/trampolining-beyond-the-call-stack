/**
 * Convenience function for measuring the duration of a single call to a given
 * function.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/API/Performance/now
 *
 * @param f The function to run. If your function requires parameters, wrap it
 *   in another function e.g. () => myFunction(1, 2);
 * @returns The amount of time the call to f() took (in milliseconds).
 */
export function benchmarkOnce(f: Function): number {
  const startTime = performance.now();
  f();
  const endTime = performance.now();
  return endTime - startTime;
}
