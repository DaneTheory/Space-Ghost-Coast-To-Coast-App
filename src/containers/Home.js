import React, { Component } from 'react';
import {connect} from 'react-redux';

import Map from '../components/Map';
import SearchBar from '../components/SearchBar';
import LocationBar from '../components/LocationBar';


class Home extends Component {

  render() {
    let searchComponent;

    (() => {
      if(!this.props.isReady) {
        searchComponent = <SearchBar {...this.props} />;
      }
    })()

    return (
      <div className="region__wrapper">
        <div className="content__search__wrapper">
          {searchComponent}
        </div>
        <div className="content__map__wrapper">
          <Map {...this.props}/>
        </div>
        <div className="content__calculation__wrapper">
          <LocationBar {...this.props}/>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
   return {
     isLoading: state.GlobalReducer.isLoading,
     isLoaded: state.MapReducer.isLoaded,
     center: state.MapReducer.center,
     zoom: state.MapReducer.zoom,
     query: state.SearchReducer.query,
     suggestions: state.SearchReducer.suggestions,
     iata: state.SearchReducer.iata,
     chosenSelection: state.SearchReducer.chosenSelection,
     locationOne: state.SearchReducer.locationOne,
     locationTwo: state.SearchReducer.locationTwo,
     isFinished: state.SearchReducer.isFinished,
     totalDistance: state.SearchReducer.totalDistance,
     isReady: state.SearchReducer.isReady
   };
}

export default connect(mapStateToProps)(Home);
