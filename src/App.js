import React, { Component } from 'react';
import MapContainer from './components/MapContainer';
import PlacesFilter from './components/PlacesFilter';
import escapeRegExp from 'escape-string-regexp';
import Alert from 'react-s-alert';
import './App.css';
import './hamburger.min.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

/** Main app component */
class App extends Component {
    /**
     * Component constructor
     * @param {Object} props
     */
    constructor(props) {
        super(props);
        this.state = {
            places: [],
            query: '',
            selectedPlace: {},
            activeMarker: {},
            showingInfoWindow: false,
            mapCenter: {},
            hamburgerIconClasses: [
                'hamburger',
                'menu-icon',
                'hamburger--collapse'
            ],
            slideMenuClasses: [
                'slide-menu',
                'menu-hidden'
            ],
            tabAble: false // Used for a11y handling
        };
        this.markers = [];

        /**
         * Create reference to Marker
         * @param {Object} element
         */
        this.onMarkerMounted = (element) => {
            if (element) {
                const markerExists = this.markers.find((m) => m.marker.id === element.marker.id);
                if(markerExists == null) {
                    this.markers.push(element);
                }
            }
        };
    }

    /**
     * Set state after component is mounted.
     * Fetches Foursquare venues and handles some errors
     */
    componentDidMount() {
        fetch('https://api.foursquare.com/v2/venues/search?limit=50&near=London&categoryId=4fceea171983d5d06c3e9823&radius=50000&locale=en&client_id=3SLN3KVWQ4IV0B1HFKHEM2NOPRFOEVRAPCVHWIZONBZR5R2F&client_secret=JQOW54G1RO0AQV30MZGASVT2JF3GOH4ZB40J3O01RVP2JSGP&v=20180825', {
            headers: {
                "Accept-Language": "en"
            }
        })
        .then((response) => response.json())
        .then((respJson) => {
            this.setState({places: respJson.response.venues})
        })
        .catch((error) => {
            // Show alertbox to user
            Alert.error('Fetch Foursquare API failed! Try to reload the page.', {
                position: 'top-right',
                effect: 'stackslide',
                beep: false,
                timeout: 'none',
                offset: 100
            });
            console.log('Foursquare API fetch error: ' + error.message);
        });

        this.checkGoogleMapsError();
    }

    /**
     * Updates search query in state
     * @param {string} query - The search string
     */
    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    /**
     * Clears search query in state
     */
    clearQuery = () => {
        this.setState({ query: '' })
    }

    /**
     * Handles Marker click event
     * @param {Object} props - Marker props
     * @param {Object} marker - Marker component
     * @param {Event} e - Click event
     */
    onMarkerClick = (props, marker, e) => {
        if (this.state.activeMarker && this.state.activeMarker.title === marker.title) return; // Do not change the state if not necessary.

        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            mapCenter: {lat: props.position.lat + 0.1, lng: props.position.lng}
        });
    }

    /**
     * Handles places list click event
     * @param {Event} event
     */
    onListClick = (event) => {
        if (event.key && event.key !== 'Enter') return;
        const activeMarker = this.markers.find((m) => m.marker.id === event.currentTarget.getAttribute('data-id'));
        new window.google.maps.event.trigger( activeMarker.marker, 'click' );
    };

    /**
     * Callback for InfoWindow onClose event
     */
    onInfoWindowClose = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }

    /**
     * Slide menu handler
     */
    onHamburgerClick = () => {
        /**
         * Inverts item existance in given array
         * @param {Array} where - Where to search
         * @param {String} what - Item to search
         * @returns {Array} - Returns modified array
         */
        function checkArray(where, what) {
            const classExists = where.indexOf(what);
            if (classExists >= 0) {
                where.splice(classExists, 1);
            } else {
                where.push(what);
            }

            return where;
        }

        const iconClasses = checkArray(this.state.hamburgerIconClasses, 'is-active');
        const sliderClasses = checkArray(this.state.slideMenuClasses, 'menu-hidden');
        const tabAble = this.state.tabAble;
        if (tabAble) {
            this.clearQuery(); // Clear query when slide menu is closed
        }
        this.setState({
            hamburgerIconClasses: iconClasses,
            slideMenuClasses: sliderClasses,
            tabAble: !tabAble
        });
    }
    
    /**
     * Check if Google Maps API has errors
     */
    checkGoogleMapsError = () => {
        setTimeout(() => {
            const gmErrMessage = document.querySelector('.gm-err-message');
            const gmContainer = document.querySelector('.map-container');

            if ((gmErrMessage && gmErrMessage.innerText.length > 0) || !gmContainer) {
                Alert.error('Google Maps has errors while loading. Check console for details', {
                    position: 'top-right',
                    effect: 'stackslide',
                    beep: false,
                    timeout: 'none',
                    offset: 100
                });
            }
        }, 3000);
    }

    /**
     * Renders the component
     */
    render() {
        let showingPlaces;
        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i'); // Filter places using query string
            showingPlaces = this.state.places.filter((place) => match.test(place.name));
        } else {
            showingPlaces = this.state.places;
        }

        return (
            <div className = 'App'>
                <nav className = 'header'>
                    <button
                        className = {this.state.hamburgerIconClasses.join(' ')}
                        aria-label = 'Filter Places Menu'
                        aria-controls = 'navigation'
                        aria-expanded = {this.state.tabAble}
                        type = 'button'
                        onClick = {this.onHamburgerClick}
                    >
                        <span className = 'hamburger-box'>
                            <span className = 'hamburger-inner'></span>
                        </span>
                    </button>  
                    <h1 className = 'header-title'>London Aquarium Map</h1>
                </nav>
                <Alert stack = {{limit: 5}} />
                <PlacesFilter
                    places = {showingPlaces}
                    query = {this.state.query}
                    onFilterChange = {this.updateQuery}
                    onListClick = {this.onListClick}
                    slideMenuClasses = {this.state.slideMenuClasses}
                    tabAble = {this.state.tabAble}
                />
                <MapContainer
                    places = {showingPlaces}
                    onMarkerClick = {this.onMarkerClick}
                    activeMarker = {this.state.activeMarker}
                    isVisible = {this.state.showingInfoWindow}
                    selectedPlace = {this.state.selectedPlace}
                    mapCenter = {this.state.mapCenter}
                    onRef = {this.onMarkerMounted}
                    onWindowClose = {this.onInfoWindowClose}
                />
            </div>
        );
    }
}

export default App;
