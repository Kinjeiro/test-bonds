export function getRandomInt(minValue = 0, maxValue = Number.MAX_VALUE) {
  return Math.floor(Math.random() * ((maxValue - minValue) + 1)) + minValue;
}

export function getRandomValue(minValue: number, maxValue: number | null = null) {
  if (maxValue === null) {
    return minValue;
  }
  return minValue % 1 !== 0 || maxValue % 1 !== 0
    ? minValue + (Math.random() * (maxValue - minValue))
    : getRandomInt(minValue, maxValue);
}
