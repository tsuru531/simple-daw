export const createMaster = (audioContext, volume: number) => {
  const gain = audioContext.createGain();
  const analyser = audioContext.createAnalyser();
  
  gain.gain.value = volume;
  
  gain
  .connect(analyser)
  .connect(audioContext.destination);

  const master = {
    gain: gain,
    analyser: analyser,
  };

  return master;
};
