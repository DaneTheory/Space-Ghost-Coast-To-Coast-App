import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import Home from '../containers/Home';


export default class Root extends Component {

  render() {
    const {store} = this.props;

    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};
