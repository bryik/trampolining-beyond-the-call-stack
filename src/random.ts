/**
 * Returns a random integer between min and max (inclusive).
 * Source:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values_inclusive
 * @param min
 * @param max
 */
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

/**
 * Convenience function for generating a lot of random numbers.
 * @param amount how many random numbers should be generated?
 */
export function generateRandomNumbers(amount: number): number[] {
  let result = [];
  for (let i = 0; i < amount; i++) {
    result.push(getRandomInt(-10000, 10000));
  }
  return result;
}
