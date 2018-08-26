import React, { Component } from 'react';
import MapContainer from './components/MapContainer';
import PlacesFilter from './components/PlacesFilter';
import escapeRegExp from 'escape-string-regexp';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: [],
            query: '',
            selectedPlace: {},
            activeMarker: {},
            showingInfoWindow: false,
            mapCenter: {}
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
            console.log(respJson.response.venues);
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
        console.log('marker');
        console.log(marker);
        console.log(props);
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            mapCenter: {lat: props.position.lat, lng: props.position.lng}
        });
    }

    onMapClick = (props) => {
        console.log('Map');
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    onListClick = (event) => {
        const activeMarker = this.markers.find((m) => m.marker.id === event.currentTarget.getAttribute('data-id'));
        new window.google.maps.event.trigger( activeMarker.marker, 'click' );
    };

    render() {
        //console.log(this.state.markers);
        let showingPlaces;
        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i')
            showingPlaces = this.state.places.filter((place) => match.test(place.name))
        } else {
            showingPlaces = this.state.places
        }

        return (
            <div className='App'>
                <div className='header'>
                    <a href="#" className='menu-icon'>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                            <path d='M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z'></path>
                        </svg>
                    </a>
                    <h1 className='header-title'>London Aquarium Map</h1>
                </div>
                <PlacesFilter
                    places = {showingPlaces}
                    query = {this.state.query}
                    onFilterChange = {this.updateQuery}
                    onListClick = {this.onListClick}
                />
                <MapContainer
                    places = {showingPlaces}
                    onMarkerClick = {this.onMarkerClick}
                    onMapClick = {this.onMapClick}
                    activeMarker = {this.state.activeMarker}
                    isVisible = {this.state.showingInfoWindow}
                    selectedPlace = {this.state.selectedPlace}
                    mapCenter = {this.state.mapCenter}
                    onRef = {this.onMarkerMounted}
                    
                />
            </div>
        );
    }
}

export default App;
