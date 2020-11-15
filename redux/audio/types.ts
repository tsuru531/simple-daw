import { initialState } from '../initialState';

export type state = typeof initialState;

export type wave = "sine" | "square" | "sawtooth" | "triangle";

export type track = {
  id: string,
  vol: number,
  type: wave
};

export type note = {
  id: string,
  keyNum: number,
  startTime: number,
  length: number,
};
