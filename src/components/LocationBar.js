import React, { Component } from 'react';
import { distance } from '@turf/distance';
import { point } from '@turf/helpers'

import * as searchActions from '../actions/SearchActions';


export default class LocationBar extends Component {
  constructor(props){
  	super(props);

  	this.state = {
      mounted: false,
      mountAnswer: false
    };
  }

  componentDidMount() {
    this.setState({mounted:  true});
    if(this.props.locationOne.name && this.props.locationTwo.name) {
      this.props.dispatch(searchActions.calculateTotalDistance(this.props.locationOne, this.props.locationTwo))
    } else if(this.props.totalDistance !== '') {
      this.props.dispatch(searchActions.toggleIsReady(true))
    } else {
      this.props.dispatch(searchActions.toggleIsReady(false))
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.locationTwo !== nextProps.locationTwo) {
      this.props.dispatch(searchActions.calculateTotalDistance(nextProps.locationOne, nextProps.locationTwo))
    }

    if(this.props.totalDistance !== nextProps.totalDistance) {
      this.props.dispatch(searchActions.toggleIsReady(true))
    }

    if(this.props.isReady !== nextProps.isReady) {
        setTimeout(() => {
          this.setState({mountAnswer:  true});
          this.props.dispatch(searchActions.toggleComplete(true))
        }, 500)
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.locationOne !== nextProps.locationOne || this.props.locationTwo !== nextProps.locationTwo || this.props.totalDistance !== nextProps.totalDistance || this.props.isReady !== nextProps.isReady || this.props.isFinished !== nextProps.isFinished
  }

  componentWillUnmount() {
    this.setState({
      mounted:  false,
      mountAnswer: false
    })
    this.props.dispatch(searchActions.toggleComplete(false))
  }

  render() {
    let locationOneContent;
    let locationTwoContent;
    let locationTotalContent;

    (() => {
      if(this.props.locationOne.name) {
        locationOneContent =
          <div className="location__one__wrapper">
            <div className="location__message">
              <h3>Location One</h3>
            </div>
            <div className="location__name">
              <h4>{this.props.locationOne.name}</h4>
            </div>
            <div className="location__latitude">
              <h4>Latitude</h4><span>{this.props.locationOne.latitude}</span>
            </div>
            <div className="location__longitude">
              <h4>Longitude</h4><span>{this.props.locationOne.longitude}</span>
            </div>
          </div>
      } else {
        locationOneContent =
          <div className="location__one__wrapper">
            <div className="location__intro">
              <h3>Start By Searching For An Airport</h3>
            </div>
          </div>
      }

      if(this.props.locationTwo.name) {
        locationTwoContent =
          <div className="location__two__wrapper">
            <div className="location__message">
              <h3>Location Two</h3>
            </div>
            <div className="location__name">
              <h4>{this.props.locationTwo.name}</h4>
            </div>
            <div className="location__latitude">
              <h4>Latitude</h4> <span>{this.props.locationTwo.latitude}</span>
            </div>
            <div className="location__longitude">
              <h4>Longitude</h4><span>{this.props.locationTwo.longitude}</span>
            </div>
          </div>
      } else {
        locationTwoContent =
          <div className="location__two__wrapper">
          </div>
      }

    if(this.props.totalDistance !== '') {
        locationTotalContent =
          <div className="location__total__wrapper">
            <div className="total__distance">
              <span>{`${this.props.totalDistance} Nautical Miles`}</span>
            </div>
            <div className="location__heading">
              <h3>Distance Between Two Airports</h3>
            </div>
          </div>
      } else {
        locationTotalContent =
          <div className="location__total__wrapper"></div>
    }
    })()

    return (

      <div>
        {locationOneContent},
        {locationTwoContent},
        {locationTotalContent}
      </div>
    );
  }
}
