import React, { Component } from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

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
                />
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyA54v4LEs4BRA3h15A-HGCR3tIkjN8axRuI",
    language: "en"
})(MapContainer)