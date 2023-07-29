/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` through `iteratee`. The corresponding value
 * of each key is an array of the elements responsible for generating the key.
 *
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function|string} iteratee The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
 */
export default function groupBy(collection, iteratee) {
  const result = {};
  const isFunc = typeof iteratee === 'function';

  for (const value of collection) {
    const key = isFunc ? String(iteratee(value)) : value[iteratee];

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(value);
  }

  return result;
}
