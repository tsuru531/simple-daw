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

export const getMasterVolPer = createSelector(
  [audioSelector],
  state => {
    const masterVol = state.masterVol;
    const maxVol = 1;
    const percentage = masterVol / maxVol * 100;
    return percentage;
  }
);

export const getMasterLevel = createSelector(
  [audioSelector],
  state => state.masterLevel
);

export const getBpm = createSelector(
  [audioSelector],
  state => state.bpm
);
