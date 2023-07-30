import * as Actions from './actions';
import * as Selectors from './selectors';
import * as Types from './types';
import { 
  playOsc,
  createMaster, 
  convertToVolume,
  formatGain
} from "../../models/audio";
import { createUniqueString } from '../../models';

let audioContext;
let masterLevelInterval;
let setCurrentTimeInterval;

export const play = () => {
  return (dispatch, getState) => {
    const selector: Types.state = getState();
    const isPlaying: boolean = Selectors.getIsPlaying(selector);
    const beatsPerSecond: number = Selectors.getBeatsPerSecond(selector);
    const allBeats: number = Selectors.getAllBeats(selector);
    const masterVol: number = Selectors.getMasterVol(selector);
    const notes: Types.note[] = Selectors.getNotes(selector);

    if (isPlaying) return;

    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    const master = createMaster(audioContext, masterVol);

    for (let note of notes) {
      const playFormatNote = Selectors.getPlayFormatNote(selector, note);

      playOsc(audioContext, master.gain, playFormatNote);
    };

    setCurrentTimeInterval = setInterval(() => {  
      dispatch(Actions.setCurrentTime(audioContext.currentTime));
      
      if (audioContext.currentTime >= allBeats / beatsPerSecond) {
        audioContext.close();
        clearInterval(masterLevelInterval);
        clearInterval(setCurrentTimeInterval);
        dispatch(Actions.setCurrentTime(0));
        dispatch(Actions.setPlaying(false));
      };
    }, 25);

    const data = new Uint8Array(256);
    masterLevelInterval = setInterval(() => {
      const masterLevel = convertToVolume(master.analyser, data);
      dispatch(Actions.setMasterLevel(masterLevel));
    }, 100);

    dispatch(Actions.setPlaying(true));
  };
};

export const stop = () => {
  return (dispatch, getState) => {
    const selector = getState();
    const isPlaying: boolean = Selectors.getIsPlaying(selector);

    if (!isPlaying) return;

    audioContext.close();
    clearInterval(masterLevelInterval);
    clearInterval(setCurrentTimeInterval);
    dispatch(Actions.setCurrentTime(0));
    dispatch(Actions.setPlaying(false));
  };
};

export const setMasterVol = (value: number) => {
  return (dispatch) => {
    if (value > 1) value = 1;
    if (value < 0) value = 0;

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
    const gain = formatGain(volume);
    const track: Types.track = Selectors.getTrack(selector, id);
    const newTrack: Types.track = {
      ...track,
      vol: gain
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
    const range: number = Selectors.getFluctuationRange(selector);
    const allBeats: number = Selectors.getAllBeats(selector);
    const scaleCount: number = Selectors.getScaleCount(selector);
    
    const newNotes: Types.note[] = notes.map(note => {
      if (note.id !== newNote.id) return note;

      if (newNote.length <= 0) newNote.length = range;
      if (newNote.keyNum < 0) newNote.keyNum = 0;
      if (newNote.keyNum >= scaleCount) newNote.keyNum = scaleCount - 1;
      if (
        newNote.startTime < 0 ||
        newNote.startTime + newNote.length > allBeats
      ) {
        newNote.length = note.length;
        newNote.startTime = note.startTime;
      };

      return newNote;
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
