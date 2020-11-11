import { initialState } from '../initialState';

export type state = typeof initialState;

export type note = {
  id: string,
  keyNum: number,
  startTime: number,
  length: number,
};
