import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import PropTypes from 'prop-types';
import fslogo from './../foursquare.svg';

class MapContainer extends Component {
    static propTypes = {
        places: PropTypes.array.isRequired,
        onMarkerClick: PropTypes.func.isRequired,
        activeMarker: PropTypes.object.isRequired,
        isVisible: PropTypes.bool.isRequired,
        selectedPlace: PropTypes.object.isRequired,
        mapCenter: PropTypes.object.isRequired,
        onRef: PropTypes.func.isRequired,
        onWindowClose: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className='map-container' role='application'>
                <Map
                    google={this.props.google}
                    zoom={10}
                    initialCenter={{
                        lat: 51.50171149296445,
                        lng: -0.11976736805131989
                    }}
                    center = {this.props.mapCenter}
                    style={{width: '100%', height: '100%', position: 'relative'}}
                    onClick={this.props.onWindowClose}
                >
                    {this.props.places.map((place, index) => {
                        let address = '';
                        for (let i = place.location.formattedAddress.length - 2; i >= 0; i--) {
                            address += place.location.formattedAddress[i];
                            if (i !== 0) {
                                address += ', ';
                            }
                        }
                        return (
                            <Marker
                                key={place.id}
                                id={place.id}
                                ref={this.props.onRef}
                                title={place.name}
                                name={place.name}
                                icon = 'http://maps.google.com/mapfiles/ms/icons/flag.png'
                                position={{
                                    lat: place.location.lat,
                                    lng: place.location.lng
                                }}
                                address = {address}
                                onClick={this.props.onMarkerClick}
                                animation={this.props.activeMarker ? (place.name === this.props.activeMarker.title ? '1' : '0') : '0'}
                            />
                        );
                    })}

                    <InfoWindow
                        marker={this.props.activeMarker}
                        visible={this.props.isVisible}
                        maxWidth = {400}
                        onClose = {this.props.onWindowClose}
                    >
                        <div style={{color: '#000'}}>
                            <p className = 'info-place-name'>{this.props.selectedPlace.name}</p>
                            <p className = 'info-place-address'>{this.props.selectedPlace.address}</p>
                            <a href={'http://foursquare.com/v/' + this.props.selectedPlace.id} className='menu-icon'>
                                <img className='foursquare-logo' src={fslogo} alt='foursquare logo'/>
                            </a>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyA54v4LEs4BRA3h5A-HGCR3tIkjN8axRuI",
    language: "en"
})(MapContainer)
