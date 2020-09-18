import * as redux from 'redux';
import { combineReducers, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

export const createStore = (history) => {
  return redux.createStore(
    combineReducers({
      router: connectRouter(history),
      
    }),
    applyMiddleware(
      routerMiddleware(history)
    )
  );
};
