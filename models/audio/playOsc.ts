import { playFormat } from "./types";

export const playOsc = (audioContext, connectTo, playFormat: playFormat): void => {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  gain.gain.value = playFormat.gain;
  osc.type = playFormat.type;
  osc.frequency.value = playFormat.frequency;
  osc.connect(gain).connect(connectTo);
  osc.start(playFormat.startTime);
  osc.stop(playFormat.stopTime);
};
