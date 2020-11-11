export const initialState = {
  audio: {
    isPlaying: false,
    masterVol: 1,
    masterLevel: 0,
    bpm: 120,
    notes: [
      {id: "1", keyNum: 76, startTime: 0, length: .5},
      {id: "2", keyNum: 72, startTime: .5, length: .5},
      {id: "3", keyNum: 67, startTime: 1, length: .5},
      {id: "4", keyNum: 72, startTime: 1.5, length: .5},
      {id: "5", keyNum: 74, startTime: 2, length: .5},
      {id: "6", keyNum: 79, startTime: 2.5, length: 1},
      {id: "7", keyNum: 67, startTime: 3.5, length: .5},
      {id: "8", keyNum: 74, startTime: 4, length: .5},
      {id: "9", keyNum: 76, startTime: 4.5, length: .5},
      {id: "10", keyNum: 74, startTime: 5, length: .5},
      {id: "11", keyNum: 67, startTime: 5.5, length: .5},
      {id: "12", keyNum: 72, startTime: 6, length: 1}
    ],
  }
};
