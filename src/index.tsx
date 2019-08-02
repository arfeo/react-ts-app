import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Store } from 'redux';

import { TellName } from './components/TellName';
import { SayHi } from './components/SayHi';

import { InjectProvider } from './utils/inject/InjectProvider';
import { configureStore } from './store/configureStore';

import './assets/styles/global.scss';

const store: Store<{}> = configureStore();

const renderPage = (): React.ReactElement => (
  <Provider store={store}>
    <Router>
      <InjectProvider>
        <Route exact path="/" component={(): React.ReactElement => <TellName />} />
        <Route exact path="/hi" component={(): React.ReactElement => <SayHi />} />
      </InjectProvider>
    </Router>
  </Provider>
);

ReactDOM.render(
  renderPage(),
  document.getElementById('root'),
);
