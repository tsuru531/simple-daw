import { createSelector } from 'reselect';
import * as Types from './types';

const audioSelector = (state: Types.state) => state.audio;

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

export const getTracks = createSelector(
  [audioSelector],
  state => <Types.track[]>state.tracks
);

export const getTrack = (state, id: string) => {
  return createSelector(
    [audioSelector],
    state => {
      const tracks = state.tracks as Types.track[];
      const matchTrack = tracks.find(track => track.id === id);

      return matchTrack;
    }
  )(state);
};

export const getTrackVol = (state, id: string) => {
  return createSelector(
    [audioSelector],
    state => {
      const track: Types.track = getTrack(state, id);
      const volume: number = track.vol;

      return volume;
    }
  )(state);
};

export const getTrackVolPer = (state, id: string) => {
  return createSelector(
    [audioSelector],
    state => {
      const volume = getTrackVol(state, id);
      const maxVol = 1;
      const percentage = volume / maxVol * 100;
      return percentage;
    }
  )(state);
};

export const getNotes = createSelector(
  [audioSelector],
  state => state.notes
);
