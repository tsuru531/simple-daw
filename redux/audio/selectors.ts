import { createSelector } from 'reselect';
import * as Types from './types';
import { convertKeyNumToFrequency } from "../../models/audio"

const audioSelector = (state: Types.state) => state.audio;

export const getIsPlaying = createSelector(
  [audioSelector],
  state => state.isPlaying
);

export const getCurrentTime = createSelector(
  [audioSelector],
  state => state.currentTime
);

export const getCurrentTimePercentage = createSelector(
  [audioSelector],
  state => {
    const allBeats: number = state.beatsPerBar * state.bar;
    const beatsPerSecond: number = state.bpm / 60;
    const percentage: number = (100 / allBeats) * state.currentTime * beatsPerSecond;

    return percentage;
  }
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

export const getBeatsPerSecond = createSelector(
  [audioSelector],
  state => {
    const beatsPerSecond: number = state.bpm / 60;

    return beatsPerSecond;
  }
); 

export const getBeatsPerBar = createSelector(
  [audioSelector],
  state => state.beatsPerBar
);

export const getBar = createSelector(
  [audioSelector],
  state => state.bar
);

export const getAllBeats = createSelector(
  [audioSelector],
  state => {
    const beatsPerBar: number = state.beatsPerBar;
    const bar: number = state.bar;
    const allBeats: number = beatsPerBar * bar;

    return allBeats;
  }
);

export const getFluctuationRange = createSelector(
  [audioSelector],
  state => state.fluctuationRange
);

export const getScaleCount = createSelector(
  [audioSelector],
  state => state.scaleCount
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

export const getPlayFormatNote = (state, note: Types.note): Types.playFormat => {
  return createSelector(
    [audioSelector],
    state => {
      const tracks = state.tracks as Types.track[];
      const track: Types.track = tracks.find(track => track.id === note.trackId);
      const bpm = state.bpm;
      const frequency: number = convertKeyNumToFrequency(note.keyNum);
      const secondsPerBeat: number = 60 / bpm;
      const startTime: number = note.startTime * secondsPerBeat;
      const stopTime: number = (note.startTime + note.length) * secondsPerBeat;

      const formatNote: Types.playFormat = {
        gain: track.vol,
        type: track.type,
        frequency: frequency,
        startTime: startTime,
        stopTime: stopTime,
      };
      
      return formatNote;
    }
  )(state);
};

export const getNotesForSelectedTrack = createSelector(
  audioSelector,
  state => {
    const notes: Types.note[] = state.notes;
    const selectedTrack: string = state.selectedTrack;
    const sortedNotes: Types.note[] = notes.filter(note => note.trackId === selectedTrack);

    return sortedNotes;
  }
);
