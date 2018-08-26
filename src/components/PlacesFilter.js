import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlacesFilter extends Component {
    static propTypes = {
        places: PropTypes.array.isRequired,
        query: PropTypes.string.isRequired,
        onFilterChange: PropTypes.func.isRequired,
        onListClick: PropTypes.func.isRequired,
        slideMenuClasses: PropTypes.array.isRequired
    }

    render() {
        return (
            <div className={this.props.slideMenuClasses.join(' ')}>
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
                                data-id={place.id}
                                onClick = {this.props.onListClick}
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
