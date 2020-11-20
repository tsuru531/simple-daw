export const toFrequency = (keyNum: number): number => {
  const frequency = 440 * Math.pow(2, (keyNum - 69) / 12);

  return frequency;
};
