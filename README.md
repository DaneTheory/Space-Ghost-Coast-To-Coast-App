# Space Ghost, Coast To Coast
A React/Redux application that provides all US airports and maps the distance between them in Nautical miles. Uses 3D mapping software Eegeo!


## Getting Started

1. Download or clone the repo.
2. Using a terminal application, <code>cd</code> into the project directory.
3. Run <code>npm i</code> and wait for dependencies to successfully install.
4. Run <code>npm start</code>. Your web browser will open with the project ready to view!

### Prerequisites

1.NodeJS

## Built With

* [ReactJS](https://facebook.github.io/react/) - Front-End Framework
* [Redux](http://redux.js.org/) - State management
* [Eegeo](https://www.wrld3d.com/) - 3D maping software
* [Air-Port-Codes] (https://www.air-port-codes.com) - API for retreiving list of Airports.

## Author

* **Branden Dane** - *Portfolio* - [DaneTheory](http://DaneTheory.com)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## Acknowledgments

* The wonderful people over at at Eegeo (https://www.wrld3d.com/). It's been a pleasure contributing to such an awesome library.

### The Challenge

Create a web app that calculates the distance (in nautical miles) between two airports. The app should auto-
complete the airports and should feature all airports in the U.S. only. Bonus: plot the trip on Google maps.

### Notes

Not a crazy difficult challenge, so I figured why not have some fun with it and go all out?!
Though serious overkill, this was built entirely in React, utilizing Redux for state management.
The easiest method for aggregating US airports would have been to simply include a JSON file and parse over it as needed.
Instead I opted for a pure asyncronous driven application and chose to use the API provided by Air-Port-Codes.com
The initial search query into the provided input makes an AJAX call for the autocomplete functionality. The user can search IATA
codes, by state, city, or airport name. Results that include the user's query string are highlited in the autocomplete form for a sexier
user experince. Once the autocomplete choice is selected, a second AJAX call is made using the selection's IATA code to return the
relevant latitude and longitude. Then, using the Haversine formula, geospatial data distance is derived and then converted to
nautical miles. The UI updates with each choice the user selects and even zooms into an awesome 3D map for an even cooler experience.
Fun fact, the ENTIRE autocomplete functionality from loading to styles was built entirely with Vanilla JavaScript. In fact no jQuery
was used in making this at all. All AJAX requests were made using vanilla JS as well. Cool Stuff. One important thing to note is
there is currently a bug we are working on with Eegeo.JS that break the animation after the second input is chosen. Oh well.
Cheers!
