export const PLAY = "PLAY";
export const playAction = () => {
  return {
    type: "PLAY",
    payload: {
      isPlaying: true
    }
  }
};

export const STOP = "STOP";
export const stopAction = () => {
  return {
    type: "STOP",
    payload: {
      isPlaying: false
    }
  }
};

export const SET_MASTER_OUT = "SET_MASTER_OUT";
export const setMasterOutAction = (value) => {
  return {
    type: "SET_MASTER_OUT",
    payload: {
      masterOut: value
    }
  };
};
