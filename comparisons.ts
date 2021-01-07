import { benchmarkMergeArrays } from "./src/benchmark.ts";
import mergeArraysIterative from "./src/mergeArraysIterative.ts";
import mergeArraysTrampolinedOptimized from "./src/mergeArraysTrampolinedOptimized.ts";
import mergeArraysRecursive from "./src/mergeArraysRecursive.ts";
import mergeArraysTrampolined from "./src/mergeArraysTrampolined.ts";

console.log("\nIterative solution vs optimized recursive solution...");
benchmarkMergeArrays(mergeArraysIterative);
benchmarkMergeArrays(mergeArraysTrampolinedOptimized);

console.log("\nExtras...");
benchmarkMergeArrays(mergeArraysRecursive);
benchmarkMergeArrays(mergeArraysTrampolined);
console.log();
