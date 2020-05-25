import taskCalculatedShare, { getMaxArrayLengthByMaxTime } from './task-shares-of-array';

test('task1 test', () => {
  const INNER_ARRAY = [
    '1.5',
    '3',
    '6',
    '1.5'
  ];
  const RESULT_ARRAY = [
    '12.500',
    '25.000',
    '50.000',
    '12.500'
  ];

  // Border conditions
  expect(taskCalculatedShare([])).toEqual([]);
  expect(taskCalculatedShare).toThrow();

  expect(taskCalculatedShare(INNER_ARRAY)).toEqual(RESULT_ARRAY);

  const MAX_TIME = 5000;
  const length = getMaxArrayLengthByMaxTime(MAX_TIME, 2000000);
  const testArray = Array.from({ length }, () => `${(Math.random()*10).toFixed(1)}`);
  const t0 = performance.now();
  taskCalculatedShare(testArray);
  const t1 = performance.now();
  expect(t1-t0).toBeLessThan(MAX_TIME);
});
