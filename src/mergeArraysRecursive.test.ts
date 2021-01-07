import { assertEquals } from "../deps.ts";

import mergeArraysRecursive from "./mergeArraysRecursive.ts";

Deno.test("mergeArraysRecursive() handles empty inputs", () => {
  const arrA: any = [];
  const arrB: any = [];

  const actual = mergeArraysRecursive(arrA, arrB);
  const expected: any = [];
  assertEquals(actual, expected);
});

Deno.test("mergeArraysRecursive() handles empty first array", () => {
  const arrA: any = [];
  const arrB: any = [1, 2, 3];

  const actual = mergeArraysRecursive(arrA, arrB);
  const expected: any = [1, 2, 3];
  assertEquals(actual, expected);
});

Deno.test("mergeArraysRecursive() handles empty second array", () => {
  const arrA: any = [1, 2, 3];
  const arrB: any = [];

  const actual = mergeArraysRecursive(arrA, arrB);
  const expected: any = [1, 2, 3];
  assertEquals(actual, expected);
});

Deno.test("mergeArraysRecursive() handles two non-empty arrays", () => {
  const arrA: any = [1, 3, 7];
  const arrB: any = [2, 4, 6];

  const actual = mergeArraysRecursive(arrA, arrB);
  const expected: any = [1, 2, 3, 4, 6, 7];
  assertEquals(actual, expected);
});

Deno.test("mergeArraysRecursive() handles two non-empty arrays (of different lengths)", () => {
  const arrA: any = [1, 3, 7];
  const arrB: any = [2, 4, 6, 8];

  const actual = mergeArraysRecursive(arrA, arrB);
  const expected: any = [1, 2, 3, 4, 6, 7, 8];
  assertEquals(actual, expected);
});
