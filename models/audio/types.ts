export type playFormat = {
  gain: number,
  type: wave,
  frequency: number,
  startTime: number,
  stopTime: number,
};

export type wave = "sine" | "square" | "sawtooth" | "triangle";
