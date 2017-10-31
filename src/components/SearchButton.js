import React, { Component } from 'react';

import * as searchActions from '../actions/SearchActions';


export default class SearchButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
        mounted:false
    }
  }

  componentDidMount() {
    this.setState({mounted:true});
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.locationOne !== this.props.locationOne || nextProps.locationTwo !== this.props.locationTwo
  }

  componentWillUnmount() {
     this.setState({mounted:false});
  }

  _onClickHandler(e) {
    e.preventDefault();
    if(this.state.mounted) {
      const searchButtonElement = document.querySelector('#search__button');
      if(searchButtonElement.classList.contains('submit__loading-start')) {
          if(searchButtonElement.classList.contains('submit__loading-end')) {
            return searchButtonElement.className = '';
          }
        } else {
          setTimeout((() => {
            if(this.props.locationOne.name !== undefined) {
              this.props.dispatch(searchActions.fetchLocationTwo(this.props.iata))
            } else {
              this.props.dispatch(searchActions.fetchLocationOne(this.props.iata))
            }
            return searchButtonElement.classList.add('submit__loading-start');
          }), 0);
          setTimeout((() => {
            return searchButtonElement.classList.add('submit__loading-progress');
          }), 500);
          setTimeout((() => {
            return searchButtonElement.classList.add('submit__loading-end');
          }), 1500);
          setTimeout((() => {
            this.props.dispatch(searchActions.getChosenSelection([]))
          }), 2350);
        }
    }
  }

  render() {

    return (
      <div id="search__button"
        onClick={this._onClickHandler.bind(this)}>
        <a className="submit__text" href="#">submit?</a>
        <a className="submit__loading" href="#">loading</a>
        <svg className="submit__svg" viewBox="0 0 240 220">
          <rect id="submitMiddle" x="20" y="100" width="200" height="60" rx="30"></rect>
          <path id="submitTop" d="
            M 60,100
            L 50,100
            C 33.4357078,100 20,113.427814 20,130
            L 20,130
            C 20,146.568541 33.4331197,160  50,160
            L190,160
            C206.570288,160 220,146.572314 220,130
            L220,100
            C220,-60 180, 80 160,100
            C140,120 100,160 100,160
          "></path>
          <path id="submitBottom" d="
            M180,160
            L190,160
            C206.564295,160 220,146.572186 220,130
            L220,130
            C220,113.431458 206.56688,100 190,100
            L 50,100
            C33.4297125,100 20,113.435296 20,130
            C20,130 20,120 20,140
            C20,220 180,200 120,140
            C100,120 80,100 80,100
          "></path>
        </svg>
        <a className="submit__feedback" href="#"></a>
      </div>
    );
  }
}
