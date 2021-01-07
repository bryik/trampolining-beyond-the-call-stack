/**
 * Takes a recursive function that:
 *   - is in 'tail recursive form'
 *   - only returns either a function (to continue) or a value (to finish)
 *
 * and wraps it to produce a pseudo-tail call optimized function.
 *
 * Source:
 * https://stackoverflow.com/a/54719630/6591491
 */
export const trampoline = (f: Function) =>
  (...args: any) => {
    let result = f(...args);
    while (typeof result === "function") {
      result = result();
    }
    return result;
  };
