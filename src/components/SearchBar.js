import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

import * as searchActions from '../actions/SearchActions';
import SearchButton from './SearchButton';


export default class SearchBar extends Component {
  componentWillReceiveProps(nextProps) {
    const searchWrapper =
      document.querySelector('.content__search__wrapper');
    nextProps.isLoading !== this.props.isLoading ?
     searchWrapper.classList.toggle('is--loading') :
     searchWrapper.classList.toggle('is--active')
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps
  }

  onSuggestionsFetchRequested({ value }) {
    this.props.dispatch(searchActions.fetchSearchQuery(value));
  }

  onSuggestionsClearRequested() {
    this.props.dispatch(searchActions.fetchSearchQuery(''));
  }

  getSuggestionValue(suggestion) {
    this.props.dispatch(searchActions.getSuggestionIata(suggestion.iata));
  }

  onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {
    if(method === 'click') {
      this.props.dispatch(searchActions.getChosenSelection([suggestion]))
    }
    if(method === 'enter') {
      let chosenSelection = this.props.suggestions
        .filter((suggestion) => {
          return suggestion.iata === this.props.iata
        })
      this.props.dispatch(searchActions.getChosenSelection(chosenSelection))
    }
  }

  onChange(event, { newValue, method }) {
  }

  renderSuggestion(suggestion) {
    let suggestionDataArray =
    [
      suggestion.iata, suggestion.name, suggestion.city, suggestion.state.abbr
    ];
    let queryDataCheck = this.props.query;
    let sanintizedArray = suggestionDataArray.map((chunk) => {
      return chunk.trim().toLowerCase()
    })

    let iataClassName =
      [suggestion.iata]
        .map((iata) => {
          return iata.trim().toLocaleLowerCase();
        })
        .map((iata) => {
          return [iata].includes(queryDataCheck) ? 'airport__iata highlight' : 'airport__iata';
        })

    let nameClassName =
      [suggestion.name]
        .map((name) => {
          return name.trim().toLocaleLowerCase();
        })
        .map((name) => {
          return name.includes(queryDataCheck) ? 'airport__name highlight' : 'airport__name';
        })

    let cityClassName =
      [suggestion.city]
        .map((city) => {
          return city.trim().toLocaleLowerCase();
        })
        .map((city) => {
          return city.includes(queryDataCheck) ? 'airport__city highlight' : 'airport__city';
        })

    let stateClassName =
      [suggestion.state.name]
        .map((state) => {
          return state.trim().toLocaleLowerCase();
        })
        .map((state) => {
          return state.includes(queryDataCheck) ? 'airport__state highlight' : 'airport__state';
        })


    if(!suggestion.status !== false) {
      return (
        <div className="suggestion__item__wrapper">
          {
            !this.props.isLoading ?
              (() => {

                return (

                  <div className="item__list">
                    <h1>IATA: <span className={iataClassName}>{suggestion.iata}</span></h1>
                    <h1>NAME: <span className={nameClassName}>{suggestion.name}</span></h1>
                    <h1>CITY: <span className={cityClassName}>{suggestion.city}</span></h1>
                    <h1>STATE: <span className={stateClassName}>{suggestion.state.name}</span></h1>
                  </div>
                )
              })()
            :
            (() => {

              return (
                <div className="item__list">
                  <span className="loading__item">
                    <h1>
                      LOADING...
                    </h1>
                    <img src="../public/images/loading1.gif" />
                  </span>
                </div>
              )
            })()

          }
        </div>
      );
    } else {
      return (
        <div className="suggestion__error">
          {suggestion.message}
        </div>
      );
    }
  }


  render() {
    let chosenContent;

    const inputProps = {
      id: 'search__input',
      placeholder: 'Type here to begin search...',
      value: this.props.query,
      onChange: this.onChange.bind(this)
    };

    (() => {
        if(this.props.chosenSelection.length > 0) {
            chosenContent =
            <div className="search__chosen__content active">
              {
                this.props.chosenSelection
                .map((selection, i) => {
                  return (
                    <div className="chosen__content" key={i}>
                      <div className="chosen__content__message">
                        <h3>Submit a search for:</h3>
                      </div>
                      <span className="chosen__content__iata">
                        ({selection.iata})
                      </span>
                      <span className="chosen__content__name">
                        {selection.name}
                      </span>
                      <br />
                      <span className="chosen__content__city">
                        {selection.city},
                      </span>
                      <span className="chosen__content__state">
                        {selection.state.name}
                      </span>
                    </div>
                  )
                })
              }
              <SearchButton {...this.props} />
            </div>
        } else {
          chosenContent =
            <div className="search__chosen__content inactive"></div>
        }
    })()


    return (
      <div>
        <Autosuggest
          suggestions={this.props.suggestions}
          focusInputOnSuggestionClick={false}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
          getSuggestionValue={this.getSuggestionValue.bind(this)}
          onSuggestionSelected={this.onSuggestionSelected.bind(this)}
          renderSuggestion={this.renderSuggestion.bind(this)}
          inputProps={inputProps}
        />
        {chosenContent}
      </div>
    );
  }
}
