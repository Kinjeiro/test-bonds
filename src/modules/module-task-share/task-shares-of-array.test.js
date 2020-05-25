import taskCalculatedShare, { getMaxArrayLengthByMaxTime } from './task-shares-of-array';

describe('taskCalculatedShare', () => {
  test('work correct with border conditions', () => {
    expect(taskCalculatedShare([])).toEqual([]);
    expect(taskCalculatedShare).toThrow();
  });

  test('return correct shares', () => {
    expect(taskCalculatedShare([
      '1.5',
      '3',
      '6',
      '1.5'
    ])).toEqual([
      '12.500',
      '25.000',
      '50.000',
      '12.500'
    ]);
  })
});

describe('getMaxArrayLengthByMaxTime', () => {
  // skip because in project run auto test when release new version
  // test('should return the number of elements from which there will be shares up to 5 seconds', () => {
  test.skip('should return the number of elements from which there will be shares up to 5 seconds', () => {
    const MAX_TIME = 5000;
    const length = getMaxArrayLengthByMaxTime(MAX_TIME, 2000000);
    const testArray = Array.from({ length }, () => `${(Math.random()*10).toFixed(1)}`);
    const t0 = performance.now();
    taskCalculatedShare(testArray);
    const t1 = performance.now();
    expect(t1-t0).toBeLessThan(MAX_TIME);
  })
});
