import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import GoogleMapReact from 'google-map-react';
import Detail from './Detail';

class Map extends Component {
    state = {
        center: {
            lat: 52.370216,
            lng: 4.895168
        },
        zoom: 15,
        loaded: false
    }

    handleLoaded = () => {
        this.setState({ loaded: true });
    }

    render() {
        const items = this.props.venues.map((venue, i) =>
            <div className="marker" key={i}
                lat={venue.location.latitude.replace(',', '.')}
                lng={venue.location.longitude.replace(',', '.')}
            >
                {this.props.showName ? <div className="marker-text">{venue.title}</div> : null}
                <FontAwesomeIcon
                    icon={faMapMarker}
                    size="2x"
                    color="#28a745" 
                />
                <Detail
                    title={venue.title}
                    urls={venue.urls}
                    location={venue.location}
                    media={venue.media}
                    map={true}
                />
            </div>
        );

        return (
            <div className={'content ' + (this.state.loaded ? 'show' : 'hide')}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyA4E6nhEcx84do3Lr7VhpimcRFc793lG4A' }}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                    onGoogleApiLoaded={this.handleLoaded}
                >
                    {items}
                </GoogleMapReact>
            </div>
        );
    }
}

export default Map;