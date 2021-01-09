import { generateRandomNumbers } from "./random.ts";

/**
 * Measures the duration of a single call to a given
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

/**
 * A utility for benchmarking a mergeArray function.
 * @param f e.g. mergeArraysIterative
 * @param arrSize The amount of numbers to sort
 * @param rounds The number of times to run the given function. The individual
 * times will be used to compute an average run time.
 */
export function benchmarkMergeArrays(f: Function, arrSize = 1000, rounds = 10) {
  const ascendingCompare = (a: number, b: number) => a - b;
  const arrayA = generateRandomNumbers(arrSize).sort(ascendingCompare);
  const arrayB = generateRandomNumbers(arrSize).sort(ascendingCompare);

  let times = [];
  for (let i = 0; i < rounds; i++) {
    const appliedF = () => f(arrayA, arrayB);
    times.push(benchmarkOnce(appliedF));
  }

  const sumOfTimes = times.reduce((acc, curr) => acc + curr, 0);
  const averageTime = sumOfTimes / times.length;

  console.log(
    `    ${f.name}() took an average of ${
      averageTime.toFixed(3)
    } milliseconds to sort ${arrSize} numbers.`,
  );
}
