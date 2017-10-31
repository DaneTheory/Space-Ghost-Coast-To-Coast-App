/* eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import WebFont from 'webfontloader';

import Root from './components/Root';
import configureStore from './store/configureStore';

require('./favicon.ico');

WebFont.load({
  google: {
    families: ['Cardo:400,400i,700','Pathway Gothic One']
  }
});

import './styles/index.scss';


const store = configureStore();

render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
