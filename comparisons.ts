import { benchmarkOnce } from "./src/benchmark.ts";
import { generateRandomNumbers } from "./src/random.ts";
import mergeArraysIterative from "./src/mergeArraysIterative.ts";
import mergeArraysTrampolinedOptimized from "./src/mergeArraysTrampolinedOptimized.ts";
import mergeArraysRecursive from "./src/mergeArraysRecursive.ts";
import mergeArraysTrampolined from "./src/mergeArraysTrampolined.ts";

function benchmarkMergeArrays(f: Function, arrSize = 1000, rounds = 10) {
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
    `\t${f.name}() took an average of ${averageTime} milliseconds to sort ${arrSize} numbers.`,
  );
}

console.log("TRAMPOLINE TIME");
console.log("Iterative solution vs optimized recursive solution...");
benchmarkMergeArrays(mergeArraysIterative);
benchmarkMergeArrays(mergeArraysTrampolinedOptimized);

console.log("\nExtras...");
benchmarkMergeArrays(mergeArraysRecursive);
benchmarkMergeArrays(mergeArraysTrampolined);
