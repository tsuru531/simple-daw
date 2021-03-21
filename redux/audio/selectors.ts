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

export const getSecondsPerBeat = createSelector(
  [audioSelector],
  state => {
    const bpm = state.bpm;
    const secondsPerBeat = 60 / bpm;

    return secondsPerBeat;
  }
);

export const getSelectedTrack = createSelector(
  [audioSelector],
  state => state.selectedTrack
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
      const tracks = state.tracks as Types.track[];
      const matchTrack = tracks.find(track => track.id === id);
      const volume: number = matchTrack.vol;

      return volume;
    }
  )(state);
};

export const getTrackVolPer = (state, id: string) => {
  return createSelector(
    [audioSelector],
    state => {
      const tracks = state.tracks as Types.track[];
      const matchTrack = tracks.find(track => track.id === id);
      const volume = matchTrack.vol;
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

export const getNotesForSelectedTrack = createSelector(
  audioSelector,
  state => {
    const notes: Types.note[] = state.notes;
    const selectedTrack: string = state.selectedTrack;
    const sortedNotes: Types.note[] = notes.filter(note => note.trackId === selectedTrack);

    return sortedNotes;
  }
);
