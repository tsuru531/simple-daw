import * as Actions from './actions';
import * as Selectors from './selectors';

let audioContext,
    masterOutInterval;

export const play = () => {
  return (dispatch, getState) => {
    const selector = getState();
    const isPlaying: boolean = Selectors.getIsPlaying(selector);
    const masterVol: number = Selectors.getMasterVol(selector);
    const bpm: number = Selectors.getBpm(selector);

    if (!isPlaying) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const masterGain = audioContext.createGain();
      masterGain.gain.value = masterVol;
      masterGain.connect(audioContext.destination);

      const familymart = [
        [76, 0, .5],
        [72, .5, .5],
        [67, 1, .5],
        [72, 1.5, .5],
        [74, 2, .5],
        [79, 2.5, 1],
        [67, 3.5, .5],
        [74, 4, .5],
        [76, 4.5, .5],
        [74, 5, .5],
        [67, 5.5, .5],
        [72, 6, 1]
      ];

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

      for (let item of familymart) {
        playOsc(item[0], item[1], item[2]);
      };

      class volume {
        analyserNode: any;
        uint8Array: number[];

        constructor(analyserNode, uint8Array) {
          this.analyserNode = analyserNode;
          this.uint8Array = uint8Array;
        };
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
        const masterOut = convertToVolume(masterAnalyser, data);
        dispatch(Actions.setMasterOutAction(masterOut));
      }, 100);

      dispatch(Actions.playAction());
    };
  };
};

export const stop = () => {
  return (dispatch, getState) => {
    const state = getState();
    const isPlaying: boolean = Selectors.getIsPlaying(state);

    if (isPlaying) {
      audioContext.close();
      clearInterval(masterOutInterval);
      dispatch(Actions.stopAction());
    };
  };
};

export const setMasterVol = (value: number) => {
  return (dispatch) => {
    dispatch(Actions.setMasterVol(value));
  };
};

export const setBpm = (value: number) => {
  return (dispatch) => {
    dispatch(Actions.setBpm(value));
  };
};
