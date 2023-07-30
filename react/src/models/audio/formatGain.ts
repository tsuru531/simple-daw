export const formatGain = (volume: number): number => {
  if (volume > 1) volume = 1;
  if (volume < 0) volume = 0;

  return volume;
};
