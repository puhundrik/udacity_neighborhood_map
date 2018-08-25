import React, { Component } from 'react';

class PlacesFilter extends Component {
    render() {
        return (
            <div className='slide-menu'>
                <div className='filter'>
                    <input
                        role = 'searchbox'
                        className = 'filter-places'
                        type = 'text'
                        placeholder = 'Filter places'
                        onChange = {event => this.props.onFilterChange(event.target.value)}
                    />
                </div>
                <div className='places-list-container'>
                    <ul className='places-list'>
                    {this.props.places.map((place) => (
                            <li
                                key={place.id}
                            >
                                {place.name}
                            </li>
                    ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default PlacesFilter;
