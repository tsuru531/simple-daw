export const SET_PLAYING = "AUDIO/SET_PLAYING" as const;
export const setPlaying = (status: boolean) => {
  return {
    type: SET_PLAYING,
    payload: {
      isPlaying: status
    }
  };
};


export const SET_MASTER_VOL = "SET_MASTER_VOL";
export const setMasterVol = (value) => {
  return {
    type: "SET_MASTER_VOL",
    payload: {
      masterVol: value
    }
  }
};

export const SET_MASTER_LEVEL = "SET_MASTER_LEVEL" as const;
export const setMasterLevel = (value: number) => {
  return {
    type: "SET_MASTER_LEVEL",
    payload: {
      masterLevel: value
    }
  };
};

export const SET_BPM = "AUDIO/SET_BPM" as const;
export const setBpm = (value: number) => {
  return {
    type: SET_BPM,
    payload: {
      bpm: value
    }
  };
};
