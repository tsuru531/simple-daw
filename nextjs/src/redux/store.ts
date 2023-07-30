import * as redux from 'redux';
import { combineReducers, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { audioReducer } from './audio/reducers';

export const createStore = (history) => {
  return redux.createStore(
    combineReducers({
      router: connectRouter(history),
      audio: audioReducer
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  );
};
