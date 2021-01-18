# trampolining-beyond-the-call-stack

> "We have lists of orders sorted numerically in arrays. Write a function to merge our arrays of orders into one sorted array." - [An Interview Cake problem (paraphrased)](https://www.interviewcake.com/question/javascript/merge-sorted-arrays?course=fc1&section=array-and-string-manipulation) 

This was my solution:

```ts
/**
 * Merges two sorted arrays into a single, sorted array.
 * Complexity: O(n^2)?
 */
function mergeArraysRecursive(
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
```

This is not optimal and JavaScript's recursion limit causes it to fail when either input array contains 10,000 or more elements. [Interview Cake's solution](https://github.com/bryik/trampolining-beyond-the-call-stack/blob/main/src/mergeArraysIterative.ts#L9) is optimal and works on arrays larger than 10,000 elements thanks to using an iterative approach instead of recursion. However, juggling indices in a `while` loop is more error-prone and harder to follow.

Is recursion simply a bad approach in languages that put limits on it? Or is there a way to get around it? Raganwald has an excellent article on a topic closely related to these questions: [Trampolines in JavaScript](https://raganwald.com/2013/03/28/trampolines-in-javascript.html). This is a general problem with recursive techniques and languages where recursion is common typically have "tail-call optimization" (TCO). 

> "...when a function returns the result of calling itself, the language doesn’t actually perform another function call, it turns the whole thing into a loop for you." - [Raganwald](https://raganwald.com/2013/03/28/trampolines-in-javascript.html)

Only functions that either return a value or return a function call to themselves are candidates for TCO (this description is pretty handwavy, checkout Raganwald's article for a more thorough explanation). `mergeArraysRecursive()` is not a candidate for TCO because it makes a recursive call and uses the result to construct an array `[elA, ...mergeArraysRecursive(restA, arrB)];`, but it can be rewritten to be tail-recursive [without too much trouble](https://github.com/bryik/trampolining-beyond-the-call-stack/blob/main/src/mergeArraysTailRecursive.ts).

Unfortunately, JavaScript does not have TCO; well, it does in Safari but Mozilla and Microsoft were [unable or unwilling to implement it in their respective browsers](https://stackoverflow.com/a/54721813/6591491). So are we out of luck?

[JohanP on Stack Overflow](https://stackoverflow.com/a/54719630/6591491) suggests "trampolining":

> "...by using a trampoline technique, you can easily convert your code to run as if it is being tail optimized."

Is this true? Seems so!

The recursion limit is no longer hit:

```
# deno run --allow-hrtime ./beyondRecursionLimit.ts

Trampolined version has no problem...
    mergeArraysTrampolined() took an average of 1213.180 milliseconds to sort 10000 numbers.

Recursive version is doomed to fail...

error: Uncaught RangeError: Maximum call stack size exceeded
export default function mergeArraysRecursive(
                                            ^
    at mergeArraysRecursive...
```

And an [optimized variant of the recursive solution](https://github.com/bryik/trampolining-beyond-the-call-stack/blob/main/src/mergeArraysTrampolinedOptimized.ts) is more or less as fast as the iterative solution:

```
# deno run --allow-hrtime ./comparisons.ts

Iterative solution vs optimized recursive solution...
    mergeArraysIterative() took an average of 0.498 milliseconds to sort 1000 numbers.
    mergeArraysTrampolinedOptimized() took an average of 0.769 milliseconds to sort 1000 numbers.

Extras...
    mergeArraysRecursive() took an average of 46.720 milliseconds to sort 1000 numbers.
    mergeArraysTrampolined() took an average of 15.584 milliseconds to sort 1000 numbers.
```

Trampolining is a pretty interesting technique that calls back to a lot of things I had forgotten from university. The problem with recursive functions is that each recursive call requires a frame and these frames build up until a base case is reached. Raganwald has a great analogy for this with `factorial()`: "it's as if we actually wrote out 1 x 1 x 2 x 3 x 4 x ... before doing any calculations". 

Functions in tail-recursive form have the same problem, but they don't actually need the frames to persist. A trampolined function returns a ["continuation"](https://en.wikipedia.org/wiki/Continuation) (a function that can be called to continue a computation) and the [trampoline()](https://github.com/bryik/trampolining-beyond-the-call-stack/blob/main/src/trampoline.ts) keeps calling these continuations until the result is reached—instead of a function calling itself recursively, you have a series of independent function calls.

This has reminded me that recursion is a rather risky technique. Without TCO or trampolining, the recursion limit hangs above like the sword of Damocles. And even with these tools, one must take care to write in tail-recursive form. Iterative solutions may be more fiddly, but they are generally less abstract and probably what I'd go with at work.

## development

First clone this repo and `cd` into it. You will need to have [deno](https://deno.land/) installed.

### installation

```bash
deno cache --reload --lock=lock.json ./deps.ts
```

### updating lock file

```bash
deno cache --lock=lock.json --lock-write ./deps.ts
```

### running tests

```bash
deno test
```

### running the benchmark

```bash
deno run --allow-hrtime ./comparisons.ts
```

#### running the recursion vs trampolined demo

```bash
deno run --allow-hrtime ./beyondRecursionLimit.ts
```

### permissions

Running with the [`--allow-hrtime` permission flag](https://deno.land/manual/getting_started/permissions) is optional, but leaving it out may reduce the accuracy of the benchmark as it [reduces the precision of `performance.now()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now#reduced_time_precision) which is used to measure execution time.

```ts
// ./src/benchmark.ts
export function benchmarkOnce(f: Function): number {
  const startTime = performance.now();
  f();
  const endTime = performance.now();
  return endTime - startTime;
}
```
