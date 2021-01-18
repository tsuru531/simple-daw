import * as Actions from './actions';
import * as Selectors from './selectors';
import * as Types from './types';
import { createUniqueString, toFrequency } from '../../models';

let audioContext,
    masterGain,
    masterLevelInterval;

const adjustVolume = (volume: number): number => {
  if (volume > 1) {
    volume = 1;
  };
  if (volume < 0) {
    volume = 0;
  };
  return volume;
};

const playOsc = (selector: Types.state, noteState: Types.noteState) => {
  const seondsPerBeat = Selectors.getSecondsPerBeat(selector);
  const track: Types.track = Selectors.getTrack(selector, noteState.trackId);
  const type: Types.wave = track.type;
  const frequency = toFrequency(noteState.keyNum);
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  gain.gain.value = track.vol;
  osc.type = type;
  osc.frequency.value = frequency;
  osc.connect(gain).connect(masterGain);
  osc.start(noteState.startTime * seondsPerBeat);
  osc.stop((noteState.startTime + noteState.length) * seondsPerBeat);
};

export const play = () => {
  return (dispatch, getState) => {
    const selector: Types.state = getState();
    const isPlaying: boolean = Selectors.getIsPlaying(selector);
    const masterVol: number = Selectors.getMasterVol(selector);
    const notes: Types.note[] = Selectors.getNotes(selector);

    if (!isPlaying) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      masterGain = audioContext.createGain();
      masterGain.gain.value = masterVol;
      masterGain.connect(audioContext.destination);

      for (let note of notes) {
        const noteState: Types.noteState = {
          keyNum: note.keyNum,
          startTime: note.startTime,
          length: note.length,
          trackId: note.trackId
        }
        playOsc(selector, noteState);
      };

      const convertToVolume = (analyserNode, uint8Array) => {
        analyserNode.getByteTimeDomainData(uint8Array);
        const max = uint8Array.reduce((a, b) => {
          return Math.max(a, b);
        });
        const min = uint8Array.reduce((a, b) => {
          return Math.min(a, b);
        });
        const result = Math.max(Math.abs(128 - max), Math.abs(128 - min));
        return result;
      };

      const data = new Uint8Array(256);
      const masterAnalyser = audioContext.createAnalyser();
      masterGain.connect(masterAnalyser).connect(audioContext.destination);
      masterLevelInterval = setInterval(() => {
        const masterLevel = convertToVolume(masterAnalyser, data);
        dispatch(Actions.setMasterLevel(masterLevel));
      }, 100);

      dispatch(Actions.setPlaying(true));
    };
  };
};

export const stop = () => {
  return (dispatch, getState) => {
    const selector = getState();
    const isPlaying: boolean = Selectors.getIsPlaying(selector);

    if (isPlaying) {
      audioContext.close();
      clearInterval(masterLevelInterval);
      dispatch(Actions.setPlaying(false));
    };
  };
};

export const setMasterVol = (value: number) => {
  return (dispatch) => {
    if (value > 1) {
      value = 1;
    };
    if (value < 0) {
      value = 0;
    };
    dispatch(Actions.setMasterVol(value));
  };
};

export const setBpm = (value: number) => {
  return (dispatch) => {
    dispatch(Actions.setBpm(value));
  };
};

export const setSelectedTrack = (trackId: string) => {
  return (dispatch, getState) => {
    const selector: Types.state = getState();
    const tracks: Types.track[] = Selectors.getTracks(selector);
    const isThere: boolean = tracks.filter(track => track.id === trackId).length !== 0;
    const id: string = isThere ? trackId : "";

    dispatch(Actions.setSelectedTrack(id));
  };
};

export const addTrack = () => {
  return (dispatch, getState) => {
    const selector: Types.state = getState();
    const tracks: Types.track[] = Selectors.getTracks(selector);
    const id: string = createUniqueString();
    const track: Types.track = {id: id, vol: 0.1, type: "sawtooth"};
    const newTracks: Types.track[] = [...tracks, track];

    dispatch(Actions.setTracks(newTracks));
  };
};

export const updateTrack = (newTrack: Types.track) => {
  return (dispatch, getState) => {
    const selector: Types.state = getState();
    const tracks: Types.track[] = Selectors.getTracks(selector);
    const newTracks: Types.track[] = tracks.map(track => (track.id === newTrack.id) ? newTrack : track);

    dispatch(Actions.setTracks(newTracks));
  };
};

export const setTrackVol = (id: string, volume: number) => {
  return (dispatch, getState) => {
    const selector: Types.state = getState();
    const adjustedVolume = adjustVolume(volume);
    const track: Types.track = Selectors.getTrack(selector, id);
    const newTrack: Types.track = {
      ...track,
      vol: adjustedVolume
    };

    dispatch(updateTrack(newTrack));
  };
};

export const deleteTrack = (id: string) => {
  return (dispatch, getState) => {
    const selector: Types.state = getState();
    const tracks: Types.track[] = Selectors.getTracks(selector);
    const notes: Types.note[] = Selectors.getNotes(selector);
    const newTracks: Types.track[] = tracks.filter(track => track.id !== id);
    const newNotes: Types.note[] = notes.filter(note => note.trackId !== id);

    dispatch(Actions.setTracks(newTracks));
    dispatch(Actions.setNotes(newNotes));
  };
};

export const addNote = (noteState: Types.noteState) => {
  return (dispatch, getState) => {
    const selector: Types.state = getState();
    const notes: Types.note[] = Selectors.getNotes(selector);
    const id: string = createUniqueString();
    const note: Types.note = {
      id: id,
      keyNum: noteState.keyNum,
      startTime: noteState.startTime,
      length: noteState.length,
      trackId: noteState.trackId,
    };
    const newNotes: Types.note[] = [...notes, note];

    dispatch(Actions.setNotes(newNotes));
  };
};

export const updateNote = (newNote: Types.note) => {
  return (dispatch, getState) => {
    const selector: Types.state = getState();
    const notes: Types.note[] = Selectors.getNotes(selector);
    const newNotes: Types.note[] = notes.map(note => {
      if (note.id === newNote.id) {
        if (newNote.length <= 0) newNote.length = note.length;
        return newNote;
      };
      return note;
    });

    dispatch(Actions.setNotes(newNotes));
  };
};

export const deleteNote = (id: string) => {
  return (dispatch, getState) => {
    const selector: Types.state = getState();
    const notes: Types.note[] = Selectors.getNotes(selector);
    const newNotes: Types.note[] = notes.filter(note => note.id !== id);

    dispatch(Actions.setNotes(newNotes));
  };
};
