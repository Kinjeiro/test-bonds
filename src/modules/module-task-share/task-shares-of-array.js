/*
1. Долевое строительство

ESTIMATION TIME: 0,2h
ACTUAL TIME: 0,8h
DIFFICULTY (from 1 to 10): 2

NOTE:
Потратил значительное время, желая написать функцию для расчета оптимального кол-ва значений в рамках максимального времени работы и ожидая время исполнения.

====================================
Task

Дан массив из N долей, представленных в виде N рациональных:
  [
  '1.5',
  '3',
  '6',
  '1.5'
  ]

Задача
Написать программу, представляющую эти доли в процентном выражении с точностью
до трех знаков после запятой:
  [
  '12.500',
  '25.000',
  '50.000',
  '12.500'
  ]

Ожидаемое решение
  ● программа на языке JavaScript в виде одного исходного файла или сниппета на
  любом открытом веб-хостинге, без использования сторонних библиотек,
  ● вычислительная сложность алгоритма и оценка необходимой памяти для его
  выполнения,
  ● ограничения на размер входного массива, при котором алгоритм будет
  выполняться разумное время (до 5 секунд, например).
*/

/**
 * Function calculated shares for each array value
 *
 * @param array of rational numbers
 * @param fixed (3) - The number of digits to appear after the decimal point;
 * @param withoutCache (false) - (for performance test) if true - doesn't use caching
 * @return {*[]|*} - shares array
 */
export default function taskCalculatedShare(array, fixed = 3, withoutCache = false) {
  if (!array) {
    throw new TypeError('Array not set');
  }
  /*
    Сложность решение с прямым перебором: 2N = N (получить сумму) + N (проходка и получение числа от суммы)

    Можно сэкономить вычислительные мощности (не будем лишний раз делить и преобразовать), чтобы увеличить объем, который мы сможем обработать за 5 секунд.
    Это достигает за счет мемоизации процента для доли.
  */
  const sum = array.reduce((result, value) => result + Number(value), 0);

  const cache = {};
  return array.map((value) => {
    if (withoutCache) {
      /*
        Length: 1,100,000.		Cache efficiency: 224.15%	1175.194852	2634.150858
        Length: 1,200,000.		Cache efficiency: 202.24%	1497.402544999999	3028.3941189999987
        Length: 1,300,000.		Cache efficiency: 277.86%	1172.3219989999998	3257.4389269999974
        Length: 1,400,000.		Cache efficiency: 280.61%	1284.877281000001	3605.4749279999996
        Length: 1,500,000.		Cache efficiency: 280.94%	1351.6738920000025	3797.382615999999
        Length: 1,600,000.		Cache efficiency: 284.27%	1442.1820169999992	4099.725373000001
        Length: 1,700,000.		Cache efficiency: 270.60%	1630.9059629999974	4413.234537999997
        Length: 1,800,000.		Cache efficiency: 266.91%	1686.1855030000006	4500.513589000002
        Length: 1,900,000.		Cache efficiency: 444.48%	1682.8208689999956	7479.804074999993
        Length: 2,000,000.		Cache efficiency: 274.90%	3051.444936999993	8388.348310999994
        Length: 2,100,000.		Cache efficiency: 179.24%	3273.394849999997	5867.201751999994
        Length: 2,200,000.		Cache efficiency: 261.14%	2051.0746040000085	5356.161923000007
        Length: 2,300,000.		Cache efficiency: 275.19%	2066.4532190000027	5686.707645999995
        Length: 2,400,000.		Cache efficiency: 286.55%	2197.7658629999933	6297.59173
        Length: 2,500,000.		Cache efficiency: 281.46%	2258.673510000008	6357.265221999987
        Length: 2,600,000.		Cache efficiency: 265.63%	2389.798420999985	6347.907282
        Length: 2,700,000.		Cache efficiency: 275.59%	2494.8452850000176	6875.653534000012
        Length: 2,800,000.		Cache efficiency: 273.93%	2591.097833000007	7097.6744349999935
        Length: 2,900,000.		Cache efficiency: 274.82%	2683.571369000012	7374.892343000014
        Length: 3,000,000.		Cache efficiency: 225.03%	3709.1319779999903	8346.656021999981
        Length: 3,100,000.		Cache efficiency: 312.21%	5159.693078000011	16108.916108000005
      */
      return String((Number(value) * 100 / sum).toFixed(fixed));
    }

    let resultValue = cache[value];
    if (typeof resultValue === 'undefined') {
      resultValue = String((Number(value) * 100 / sum).toFixed(fixed));
      cache[value] = resultValue;
    }
    return resultValue;
  });
}


function defaultGenerateArrayItem() {
  return `${(Math.random()*10).toFixed(1)}`;
}

/**
 * Calculates the approximate number of elements for which we can calculate fractions within maxTime milliseconds.
 *
 * @param maxTime
 * @param startLength (1000)
 * @param options -
 *    step = startLength / 10 - search step
 *    measurementRisk = 0.1 - percentage of maxTime to guarantee a more repeatable result
 *    generateItemFn = (random item fn) - function to generate array test item
 *    withNotCacheDiff = false - (for performance test) - if true compare with no cache time in console
 * @return {number} - approximate number of elements
 */
export function getMaxArrayLengthByMaxTime(maxTime, startLength = 1000, options = {}) {
  if (!maxTime || maxTime < 0 || !startLength || startLength < 0) {
    return 0;
  }

  const {
    step = startLength / 10,
    measurementRisk = 0.1,
    generateItemFn = defaultGenerateArrayItem,
    withNotCacheDiff = false
  } = options;

  let lastResultTime = 0;
  let length = startLength || 0;
  let isOutOfMemory = false;

  // так как измерения на разных массивах могут быть разные, необходимо заложить риски, чтобы точно гарантировать число (хотя тут точность будет еще зависеть от шага)
  const maxTimeWithMeasurementRisk = maxTime - maxTime * measurementRisk;
  while(lastResultTime <= maxTimeWithMeasurementRisk) {
    length += step;

    const tempArray = Array.from({ length }, generateItemFn);
    const t0 = performance.now();
    taskCalculatedShare(tempArray);
    const t1 = performance.now();
    lastResultTime = t1 - t0;

    if (withNotCacheDiff) {
      let lastResultWithoutCacheTime;
      if (!isOutOfMemory) {
        try {
          const t3 = performance.now();
          taskCalculatedShare(tempArray, undefined, true);
          const t4 = performance.now();
          lastResultWithoutCacheTime = t4 - t3;
        } catch (e) {
          // out of memory
          isOutOfMemory = true;
        }
      }
      const percent = lastResultWithoutCacheTime && `${(lastResultWithoutCacheTime * 100 / lastResultTime).toFixed(2)}%`;
      console.log(`Length: ${length.toLocaleString()}.\t\tCache efficiency: ${percent}\t${lastResultTime}\t${lastResultWithoutCacheTime || 'out of memory'}`);
    } else {
      console.log(`Length: ${length.toLocaleString()}.\t\t${lastResultTime}`);
    }
  }

  const lastLength = length - step;
  console.log('Result ', lastLength.toLocaleString());
  return lastLength;
}
