import { initialState } from '../initialState';
import { playFormat, wave } from "../../models/audio/types";
export type { playFormat, wave };

export type state = typeof initialState;

export type trackState = {
  vol: number,
  type: wave,
};

export type track = trackState & {
  id: string
};

export type noteState = {
  keyNum: number,
  startTime: number,
  length: number,
  trackId: string
};

export type note = {
  id: string,
} & noteState;
