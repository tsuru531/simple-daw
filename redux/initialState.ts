export const initialState = {
  audio: {
    isPlaying: false,
    masterVol: 1,
    masterLevel: 0,
    bpm: 120,
    notes: [
      {keyNum: 76, startTime: 0, length: .5},
      {keyNum: 72, startTime: .5, length: .5},
      {keyNum: 67, startTime: 1, length: .5},
      {keyNum: 72, startTime: 1.5, length: .5},
      {keyNum: 74, startTime: 2, length: .5},
      {keyNum: 79, startTime: 2.5, length: 1},
      {keyNum: 67, startTime: 3.5, length: .5},
      {keyNum: 74, startTime: 4, length: .5},
      {keyNum: 76, startTime: 4.5, length: .5},
      {keyNum: 74, startTime: 5, length: .5},
      {keyNum: 67, startTime: 5.5, length: .5},
      {keyNum: 72, startTime: 6, length: 1}
    ],
  }
};
