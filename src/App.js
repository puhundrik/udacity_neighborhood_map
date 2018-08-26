import React, { Component } from 'react';
import MapContainer from './components/MapContainer';
import PlacesFilter from './components/PlacesFilter';
import escapeRegExp from 'escape-string-regexp';
import './App.css';
import './hamburger.min.css';

class App extends Component {
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
            ]
        };
        this.markers = [];

       this.onMarkerMounted = (element) => {
           if (element) {
               const markerExists = this.markers.find((m) => m.marker.id === element.marker.id);
                if(markerExists == null) {
                    this.markers.push(element);
                }
           }
       };
    }

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
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            mapCenter: {lat: props.position.lat, lng: props.position.lng}
        });
    }

    onListClick = (event) => {
        const activeMarker = this.markers.find((m) => m.marker.id === event.currentTarget.getAttribute('data-id'));
        new window.google.maps.event.trigger( activeMarker.marker, 'click' );
    };
    
    onInfoWindowClose = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }
    
    onHamburgerClick = () => {
        function checkArray(where, what) {

            const classExists = where.indexOf(what);
            if (classExists >= 0) {
                where.splice(classExists, 1);
                //this.setState({hamburgerIconClasses: iconClasses});
            } else {
                where.push(what);
                //this.setState({hamburgerIconClasses: iconClasses});
            }
            
            return where;
        }
        console.log('click!');
        const iconClasses = checkArray(this.state.hamburgerIconClasses, 'is-active');
        const sliderClasses = checkArray(this.state.slideMenuClasses, 'menu-hidden');
        //const classExists = iconClasses.indexOf('is-active');
        console.log(iconClasses);
        console.log(sliderClasses);
        this.setState({
            hamburgerIconClasses: iconClasses,
            slideMenuClasses: sliderClasses
        });
    }

    render() {
        let showingPlaces;
        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i')
            showingPlaces = this.state.places.filter((place) => match.test(place.name))
        } else {
            showingPlaces = this.state.places
        }

        return (
            <div className = 'App'>
                <div className = 'header'>
                    <button
                        className = {this.state.hamburgerIconClasses.join(' ')}
                        type='button'
                        onClick = {this.onHamburgerClick}
                    >
                        <span className = 'hamburger-box'>
                            <span className = 'hamburger-inner'></span>
                        </span>
                    </button>  
                    <h1 className = 'header-title'>London Aquarium Map</h1>
                </div>
                <PlacesFilter
                    places = {showingPlaces}
                    query = {this.state.query}
                    onFilterChange = {this.updateQuery}
                    onListClick = {this.onListClick}
                    slideMenuClasses = {this.state.slideMenuClasses}
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
