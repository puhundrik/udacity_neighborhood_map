import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';

class MapContainer extends Component {
    render() {
        return (
            <div className='map-container' role='application'>
                <Map
                    google={this.props.google}
                    zoom={14}
                    initialCenter={{
                        lat: 55.75920632539493,
                        lng: 37.61785223845053
                    }}
                    style={{width: '100%', height: '100%', position: 'relative'}}
                >
                    {this.props.places.map((place, index) => {
                        console.log(place);
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
                            />
                        );
                    })}
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyA54v4LEs4BRA3h15A-HGCR3tIkjN8axRuI",
    language: "en"
})(MapContainer)
