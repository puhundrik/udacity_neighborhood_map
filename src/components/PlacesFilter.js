import React, { Component } from 'react';
import PropTypes from 'prop-types';

/** Component for slider menu and places filter */
class PlacesFilter extends Component {
    // PropTypes implementation
    static propTypes = {
        places: PropTypes.array.isRequired,
        query: PropTypes.string.isRequired,
        onFilterChange: PropTypes.func.isRequired,
        onListClick: PropTypes.func.isRequired,
        slideMenuClasses: PropTypes.array.isRequired,
        tabAble: PropTypes.bool.isRequired
    }

    /**
     * Renders the component
     */
    render() {
        return (
            <div className = {this.props.slideMenuClasses.join(' ')}>
                <div className = 'filter'>
                    <input
                        role = 'searchbox'
                        className = 'filter-places'
                        type = 'text'
                        placeholder = 'Filter places'
                        onChange = {event => this.props.onFilterChange(event.target.value)}
                        tabIndex = {(this.props.tabAble) ? 0 : -1} // A11y tabindex handling
                        value = {this.props.query}
                    />
                </div>
                <div className = 'places-list-container'>
                    <ul className = 'places-list'>
                    {this.props.places.map((place) => (
                        <li
                            key = {place.id}
                            data-id = {place.id}
                            onClick = {this.props.onListClick}
                            onKeyDown = {this.props.onListClick}
                            tabIndex = {(this.props.tabAble) ? 0 : -1}
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
