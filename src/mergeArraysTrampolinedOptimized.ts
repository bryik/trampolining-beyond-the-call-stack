import { trampoline } from "./trampoline.ts";

/**
 * Merges two sorted arrays into a single, sorted array.
 *
 * This is mergeArraysTrampolined() except the arrays being merged
 * are mostly not copied[0], instead cursors are passed (iA and iB) that
 * are used to keep track of our positions in arrA and arrB as the
 * merge progresses.
 *
 * Complexity: O(n)?
 *
 * ---
 * 0 - base case 2 is the exception and this happens at most once.
 */
export default function mergeArraysTrampolinedOptimized(
  arrA: number[],
  arrB: number[],
): number[] {
  const _mergeArrays = trampoline(
    function self(acc: number[], iA: number, iB: number): Function | number[] {
      // Base case 1: both arrays have reached their end.
      if (arrA.length === iA && arrB.length === iB) {
        return acc;
      }

      // Base case 2a: arrA is finished, arrB is not.
      if (arrA.length === iA && arrB.length > iB) {
        return [...acc, ...arrB.slice(iB)];
      }
      // Base case 2b: arrB is finished, arrA is not.
      if (arrB.length === iB && arrA.length > iA) {
        return [...acc, ...arrA.slice(iA)];
      }

      // Recursive case: both arrays have elements.
      let elA = arrA[iA];
      let elB = arrB[iB];

      if (elA < elB) {
        acc.push(elA);
        return () => self(acc, iA + 1, iB);
      } else {
        acc.push(elB);
        return () => self(acc, iA, iB + 1);
      }
    },
  );

  return _mergeArrays([], 0, 0);
}
