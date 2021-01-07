/**
 * Merges two sorted arrays into a single, sorted array.
 *
 * A plain, recursive solution.
 *
 * Complexity: O(n^2)?
 */
export default function mergeArraysRecursive(
  arrA: number[],
  arrB: number[],
): number[] {
  // Base case 1: both arrays are empty.
  if (arrA.length === 0 && arrB.length === 0) {
    return [];
  }

  // Base case 2a: arrA is empty, arrB is not.
  if (arrA.length === 0 && arrB.length > 0) {
    return arrB;
  }
  // Base case 2b: arrB is empty, arrA is not.
  if (arrB.length === 0 && arrA.length > 0) {
    return arrA;
  }

  // Recursive case: both arrays have elements.
  const [elA, ...restA] = arrA;
  const [elB, ...restB] = arrB;

  if (elA < elB) {
    return [elA, ...mergeArraysRecursive(restA, arrB)];
  } else {
    return [elB, ...mergeArraysRecursive(arrA, restB)];
  }
}
