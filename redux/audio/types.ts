import { initialState } from '../initialState';

export type state = typeof initialState;

export type note = {
  keyNum: number,
  startTime: number,
  length: number
};
