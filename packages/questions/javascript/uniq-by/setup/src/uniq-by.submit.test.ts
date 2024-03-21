import uniqBy from './uniq-by';

describe('uniqBy', () => {
  test('empty array', () => {
    expect(uniqBy([])).toEqual([]);
  });

  test('duplicate values', () => {
    expect(uniqBy([2, 1, 2])).toEqual([2, 1]);
    expect(uniqBy([2, 2, 1])).toEqual([2, 1]);
    expect(uniqBy([2, 1, 2, 3])).toEqual([2, 1, 3]);
  });

  test('iteratee as a string', () => {
    expect(uniqBy([{ n: 1 }, { n: 2 }, { n: 1 }], 'n')).toEqual([
      { n: 1 },
      { n: 2 },
    ]);
    expect(uniqBy([{ age: 30 }, { age: 22 }, { age: 22 }], 'age')).toEqual([
      { age: 30 },
      { age: 22 },
    ]);
  });

  test('iteratee as a function', () => {
    expect(
      uniqBy(
        [{ data: { score: 10 } }, { data: { score: 10 } }],
        (o: any) => o.data.score,
      ),
    ).toEqual([{ data: { score: 10 } }]);
  });

  test('strings comparison', () => {
    expect(
      uniqBy(['apple', 'pear', 'mango'], (fruit: any) => fruit.length),
    ).toEqual(['apple', 'pear']);
  });

  test('non-existent property', () => {
    expect(uniqBy([{ n: 1 }, { n: 2 }], 'm')).toEqual([{ n: 1 }]);
    expect(uniqBy([{ n: 1 }, { m: 2 }], 'm')).toEqual([{ n: 1 }, { m: 2 }]);
  });

  test('mixed data types', () => {
    expect(uniqBy([1, '2', 3], (item: any) => Number(item))).toEqual([
      1,
      '2',
      3,
    ]);
  });
});
