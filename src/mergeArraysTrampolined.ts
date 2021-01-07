import { trampoline } from "./trampoline.ts";

/**
 * Merges two sorted arrays into a single, sorted array.
 *
 * mergeArraysRecursive() except rewritten in tail recursive form and modified
 * to return either a value (when finished) or a function.
 *
 * Complexity: O(n^2)?
 */
export default function mergeArraysTrampolined(
  arrA: number[],
  arrB: number[],
): number[] {
  const _mergeArrays = trampoline(
    function self(
      acc: number[],
      arrA: number[],
      arrB: number[],
    ): Function | number[] {
      // Base case 1: both arrays are empty.
      if (arrA.length === 0 && arrB.length === 0) {
        return acc;
      }

      // Base case 2a: arrA is empty, arrB is not.
      if (arrA.length === 0 && arrB.length > 0) {
        return [...acc, ...arrB];
      }
      // Base case 2b: arrB is empty, arrA is not.
      if (arrB.length === 0 && arrA.length > 0) {
        return [...acc, ...arrA];
      }

      // Recursive case: both arrays have elements.
      const [elA, ...restA] = arrA;
      const [elB, ...restB] = arrB;

      if (elA < elB) {
        // Note: unlike mergeArraysTailRecursiveForm(), we must return
        // a function wrapping the recursive self() call.
        return () => self([...acc, elA], restA, arrB);
      } else {
        // Same here.
        return () => self([...acc, elB], arrA, restB);
      }
    },
  );

  return _mergeArrays([], arrA, arrB);
}
