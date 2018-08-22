import React, { Component } from 'react';
import MapContainer from './components/MapContainer';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: [
                {lat: 55.7577676, lng: 37.6231232},
                {lat: 55.7568998, lng: 37.6142558},
                {lat: 55.7596859, lng: 37.6205456},
                {lat: 55.7592407, lng: 37.6175308},
                {lat: 55.7601326, lng: 37.6186493},
                {lat: 55.7601175, lng: 37.6160261},
                {lat: 55.7602186, lng: 37.6129684}
            ]
        };
    }
    
    render() {
        return (
            <div className="App">
                <div class="header">
                    <a href="#" class="menu-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"></path>
                        </svg>
                    </a>

                    <h1 class="header-title">Neighborhood Map</h1>
                </div>
                <div class="slide-menu">
                    
                </div>
                <MapContainer
                    places={this.state.places}
                />
            </div>
        );
    }
}

export default App;
