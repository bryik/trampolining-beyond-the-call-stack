# trampolining-beyond-the-call-stack

I wrote a nice recursive solution to [an Interview Cake problem](https://www.interviewcake.com/question/javascript/merge-sorted-arrays?course=fc1&section=array-and-string-manipulation), but IC's solution was an iterative one. The logic is clearer in the recursive version, but it cannot handle arrays as large as the iterative version (JavaScript's max recursion limit prevents this).

If JavaScript had tail call optimization (TCO), then I believe rewriting the recursive solution to be tail-recursive would solve the recursion limit problem. However, [JavaScript does not have TCO](https://stackoverflow.com/a/54721813/6591491)--is the recursive solution hopeless? 

[JohanP on Stack Overflow](https://stackoverflow.com/a/54719630/6591491) suggests "trampolining":

> "...by using a trampoline technique, you can easily convert your code to run as if it is being tail optimized."

Is this true? Seems so:

```bash
# deno run ./comparisons.ts
TRAMPOLINE TIME
Iterative solution vs optimized recursive solution...
    mergeArraysIterative() took an average of 0.6 milliseconds to sort 1000 numbers.
    mergeArraysTrampolinedOptimized() took an average of 0.6 milliseconds to sort 1000 numbers.

Extras...
    mergeArraysRecursive() took an average of 47.6 milliseconds to sort 1000 numbers.
    mergeArraysTrampolined() took an average of 14.4 milliseconds to sort 1000 numbers.
```

If you're interested in the trampoline technique, Raganwald has an [excellent article on it](https://raganwald.com/2013/03/28/trampolines-in-javascript.html).

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

### running the benchmark

```bash
# --allow-hrtime - Allows high-resolution time measurement.
# https://deno.land/manual/getting_started/permissions
deno run --allow-hrtime ./comparisons.ts
```

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

### running tests

```bash
deno test
```
