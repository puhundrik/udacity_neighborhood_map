import React, { Component } from 'react';
import MapContainer from './components/MapContainer';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: []
        };
    }
    
    componentDidMount() {
        fetch('https://api.foursquare.com/v2/venues/search?limit=50&near=Moscow&query=theatre&radius=10000&locale=en&client_id=3SLN3KVWQ4IV0B1HFKHEM2NOPRFOEVRAPCVHWIZONBZR5R2F&client_secret=JQOW54G1RO0AQV30MZGASVT2JF3GOH4ZB40J3O01RVP2JSGP&v=20180825', {
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
    
    render() {
        return (
            <div className="App">
                <div className="header">
                    <a href="#" className="menu-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"></path>
                        </svg>
                    </a>

                    <h1 className="header-title">Moscow Theaters Map</h1>
                </div>
                <div className="slide-menu">
                    
                </div>
                <MapContainer
                    places={this.state.places}
                />
            </div>
        );
    }
}

export default App;
