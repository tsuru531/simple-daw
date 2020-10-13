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
