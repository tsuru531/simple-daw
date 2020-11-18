import { initialState } from '../initialState';

export type state = typeof initialState;

export type wave = "sine" | "square" | "sawtooth" | "triangle";

export type trackState = {
  vol: number,
  type: wave
};

export type track = trackState & {
  id: string
};

export type note = {
  id: string,
  keyNum: number,
  startTime: number,
  length: number,
};
