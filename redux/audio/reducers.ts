import * as Actions from './actions';
import { initialState } from '../initialState';

export const audioReducer = (state = initialState.audio, action) => {
  switch (action.type) {
    case Actions.PLAY:
      return {
        ...state,
        ...action.payload
      };
    case Actions.STOP:
      return {
        ...state,
        ...action.payload
      };
    case Actions.SET_MASTER_VOL:
      return {
        ...state,
        ...action.payload
      };
    case Actions.SET_MASTER_OUT:
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
