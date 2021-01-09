/**
 * This is mergeArraysRecursive() rewritten in tail recursive form[0].
 */
export default function mergeArraysTailRecursiveForm(
  arrA: number[],
  arrB: number[],
): number[] {
  const _mergeArrays = function self(
    acc: number[],
    arrA: number[],
    arrB: number[],
  ): number[] {
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
      return self([...acc, elA], restA, arrB);
    } else {
      return self([...acc, elB], arrA, restB);
    }
  };

  return _mergeArrays([], arrA, arrB);
}
