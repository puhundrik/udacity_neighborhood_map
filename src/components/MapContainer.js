import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';

class MapContainer extends Component {
    render() {
        return (
            <div className="map-container" role="application">
                <Map
                    google={this.props.google}
                    zoom={15}
                    initialCenter={{
                        lat: 55.7546967,
                        lng: 37.6215215
                    }}
                >
                    {this.props.places.map((place, index) => {
                        console.log(index);
                        console.log(place);
                        return (
                            <Marker
                                key={index}
                                id={index}
                                title={'1' + index}
                                name={'1' + index}
                                position={{
                                    lat: place.lat,
                                    lng: place.lng
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