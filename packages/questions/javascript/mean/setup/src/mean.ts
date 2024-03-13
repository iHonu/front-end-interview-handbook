/**
 * @param {Array<number>} array - Array from which the elements are all numbers.
 * @return {number} Returns mean.
 */
export default function mean(array: Array<number>): number {
  let total: number = 0;

  // Calculate the sum of all numbers in the array.
  for (let i: number = 0; i < array.length; i++) {
    total += array[i];
  }

  // Calculate the mean from the sum.
  const mean: number = total / array.length;

  return mean;
}