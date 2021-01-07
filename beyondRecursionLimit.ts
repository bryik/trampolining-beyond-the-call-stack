import { benchmarkMergeArrays } from "./src/benchmark.ts";
import mergeArraysRecursive from "./src/mergeArraysRecursive.ts";
import mergeArraysTrampolined from "./src/mergeArraysTrampolined.ts";

console.log("\nTrampolined version has no problem...");
benchmarkMergeArrays(mergeArraysTrampolined, 10000, 1);

console.log("\nRecursive version is doomed to fail...\n");
benchmarkMergeArrays(mergeArraysRecursive, 10000, 1);
console.log();
