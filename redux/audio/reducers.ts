import * as Actions from './actions';
import { initialState } from '../initialState';

export const audioReducer = (state = initialState.audio, action) => {
  switch (action.type) {
    case Actions.SET_PLAYING:
      return {
        ...state,
        ...action.payload
      };
    case Actions.SET_MASTER_VOL:
      return {
        ...state,
        ...action.payload
      };
    case Actions.SET_MASTER_LEVEL:
      return {
        ...state,
        ...action.payload
      };
    case Actions.SET_BPM:
      return {
        ...state,
        ...action.payload
      };
    default: return state;
  };
};
