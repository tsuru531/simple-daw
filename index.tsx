import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createStore } from './redux/store';
import { GlobalStyle } from './GlobalStyle';
import { App } from './App';

const history = createBrowserHistory();
export const store = createStore(history);

render(
  <>
    <GlobalStyle />
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </>,
  document.getElementById('root')
);
