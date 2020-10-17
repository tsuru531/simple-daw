import * as Actions from './actions';
import * as Selectors from './selectors';

let audioContext,
    masterOutInterval;

export const play = () => {
  return (dispatch, getState) => {
    const state = getState();
    const isPlaying: boolean = Selectors.getIsPlaying(state);
    const bpm: number = Selectors.getBpm(state);

    if (!isPlaying) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const masterVol = audioContext.createGain();
      masterVol.gain.value = 0.1;
      masterVol.connect(audioContext.destination);

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
        osc.connect(masterVol);
        osc.start(time * seondsPerBeat);
        osc.stop((time + noteLength) * seondsPerBeat);
      };

      for (let item of familymart) {
        playOsc(item[0], item[1], item[2]);
      };

      const data = new Uint8Array(1);
      const masterAnalyser = audioContext.createAnalyser();
      masterVol.connect(masterAnalyser).connect(audioContext.destination);
      masterOutInterval = setInterval(() => {
        masterAnalyser.getByteTimeDomainData(data);
        dispatch(Actions.setMasterOutAction(Math.abs(128 - data[0])));
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
