import React, { Component } from 'react';
import 'wrld.js';

import * as mapActions from '../actions/MapActions';
import { EegeoAPIKey } from '../../config/configs';


export default class Map extends Component {
  componentWillReceiveProps(nextProps) {
    if(this.props.locationOne !== nextProps.locationOne) {
      this.props.dispatch(mapActions.setMapZoom(15))
      this.props.dispatch(mapActions.setMapCenter(
      [Number(nextProps.locationOne.latitude),
       Number(nextProps.locationOne.longitude)]))
    }
    if(this.props.locationTwo !== nextProps.locationTwo) {
      this.props.dispatch(mapActions.setMapZoom(15))
      this.props.dispatch(mapActions.setMapCenter(
      [Number(nextProps.locationTwo.latitude),
       Number(nextProps.locationTwo.longitude)]))
    }
    if(this.props.center !== nextProps.center || this.props.zoom !== nextProps.zoom) {
      this._myMap().init(nextProps.center)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.center !== nextProps.center || this.props.zoom !== nextProps.zoom || this.props.locationOne !== nextProps.locationOne || this.props.locationTwo !== nextProps.locationTwo
  }

  _myMap() {
    this.props.dispatch(mapActions.isMapLoading(true));
    const _mapConfig = L.eeGeo.map("map", EegeoAPIKey,{
      center: this.props.center,
      zoom: this.props.zoom,
      dragging: false,
      scrollWheelZoom: false,
      boxZoom: false,
      worldCopyJump: true
    })
    const _mapLoader = (centerProp)  => {
      const getmarkerName = this.props.locationOneName !== undefined ?
                              this.props.locationOne.name :
                              this.props.locationTwo.name
      let marker = L.Wrld.marker(centerProp, { title: getmarkerName }).addTo(_mapConfig);
      _mapConfig.whenReady(() => {
        _mapConfig.setView(centerProp, 15, {
          animate: true,
          durationSeconds: 5
        })
        _mapConfig.setCameraHeadingDegrees(90).setCameraTiltDegrees(45);
        _mapConfig.invalidateSize(true)
      })
    }
    return {init: _mapLoader}
  }

  render() {

    return (
      <div className="component__map__wrapper">
        <div id="map"></div>
      </div>
    );
  }
}
