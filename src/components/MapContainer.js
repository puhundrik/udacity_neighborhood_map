import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import fslogo from './../foursquare.svg';

class MapContainer extends Component {
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
                    onClick={this.props.onMapClick}
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
                                title={place.name}
                                name={place.name}
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
