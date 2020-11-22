export const initialState = {
  audio: {
    isPlaying: false,
    masterVol: 1,
    masterLevel: 0,
    bpm: 120,
    selectedTrack: "",
    tracks: [
      {id: "1", vol: 0.1, type: "sawtooth"},
      {id: "2", vol: 0.1, type: "square"}
    ],
    notes: [
      {id: "1-01", keyNum: 67, startTime: 0, length: .5, trackId: "1"},
      {id: "1-02", keyNum: 63, startTime: .5, length: .5, trackId: "1"},
      {id: "1-03", keyNum: 58, startTime: 1, length: .5, trackId: "1"},
      {id: "1-04", keyNum: 63, startTime: 1.5, length: .5, trackId: "1"},
      {id: "1-05", keyNum: 65, startTime: 2, length: .5, trackId: "1"},
      {id: "1-06", keyNum: 70, startTime: 2.5, length: 1, trackId: "1"},
      {id: "1-07", keyNum: 58, startTime: 3.5, length: .5, trackId: "1"},
      {id: "1-08", keyNum: 65, startTime: 4, length: .5, trackId: "1"},
      {id: "1-09", keyNum: 67, startTime: 4.5, length: .5, trackId: "1"},
      {id: "1-10", keyNum: 65, startTime: 5, length: .5, trackId: "1"},
      {id: "1-11", keyNum: 58, startTime: 5.5, length: .5, trackId: "1"},
      {id: "1-12", keyNum: 63, startTime: 6, length: 1, trackId: "1"},
      {id: "2-01", keyNum: 58, startTime: 1, length: 1, trackId: "2"},
      {id: "2-02", keyNum: 62, startTime: 2, length: 1, trackId: "2"},
      {id: "2-03", keyNum: 53, startTime: 3.5, length: .5, trackId: "2"},
      {id: "2-04", keyNum: 58, startTime: 4, length: 1, trackId: "2"},
      {id: "2-05", keyNum: 58, startTime: 5, length: 1, trackId: "2"},
      {id: "2-06", keyNum: 55, startTime: 6, length: 1, trackId: "2"},
    ],
  }
};
