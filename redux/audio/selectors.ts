import { createSelector } from 'reselect';

const audioSelector = state => state.audio;

export const getIsPlaying = createSelector(
  [audioSelector],
  state => state.isPlaying
);

export const getMasterVol = createSelector(
  [audioSelector],
  state => state.masterVol
);

export const getMasterOut = createSelector(
  [audioSelector],
  state => state.masterOut
);

export const getBpm = createSelector(
  [audioSelector],
  state => state.bpm
);
