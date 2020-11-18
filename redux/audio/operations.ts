import * as Actions from './actions';
import * as Selectors from './selectors';
import * as Types from './types';
import { createUniqueString } from '../../models';

let audioContext,
    masterOutInterval;

export const play = () => {
  return (dispatch, getState) => {
    const selector: Types.state = getState();
    const isPlaying: boolean = Selectors.getIsPlaying(selector);
    const masterVol: number = Selectors.getMasterVol(selector);
    const bpm: number = Selectors.getBpm(selector);
    const notes: Types.note[] = Selectors.getNotes(selector);

    if (!isPlaying) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const masterGain = audioContext.createGain();
      masterGain.gain.value = masterVol;
      masterGain.connect(audioContext.destination);

      const playOsc = (noteNum, time, noteLength) => {
        const seondsPerBeat = 60 / bpm;
        const frequency = 440 * Math.pow(2, (noteNum - 69) / 12);
        const osc = audioContext.createOscillator();
        osc.type = "sawtooth";
        osc.frequency.value = frequency;
        osc.connect(masterGain);
        osc.start(time * seondsPerBeat);
        osc.stop((time + noteLength) * seondsPerBeat);
      };

      for (let note of notes) {
        playOsc(note.keyNum, note.startTime, note.length);
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
      masterOutInterval = setInterval(() => {
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
      clearInterval(masterOutInterval);
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

export const addNote = (
  keyNum: number,
  startTime: number,
  length: number
) => {
  return (dispatch, getState) => {
    const selector: Types.state = getState();
    const notes: Types.note[] = Selectors.getNotes(selector);
    const id: string = createUniqueString();
    const note: Types.note = {
      id: id,
      keyNum: keyNum,
      startTime: startTime,
      length: length
    };

    notes.push(note);
    dispatch(Actions.setNotes(notes));
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
