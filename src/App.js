import React, { Component } from 'react';
import Venues from './Venues/List';
import { Jumbotron, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faList } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
    state = {
        map: false
    }

    handleSwitch = () => {
        this.setState({ map: !this.state.map });
    }

    render() {
        return (
            <div id="app">
                <Jumbotron fluid>
                    <Container>
                        <h1>Out in Amsterdam</h1>
                        <p>
                            Let's find you the perfect venue.
                        </p>
                        {
                            this.state.map ?
                            <FontAwesomeIcon
                                icon={faList}
                                key="map"
                                size="3x"
                                color="#e9ecef"
                                onClick={this.handleSwitch}
                                class="switch"
                            />
                            :
                            <FontAwesomeIcon
                                icon={faMap}
                                key="list"
                                size="3x"
                                color="#e9ecef"
                                onClick={this.handleSwitch}
                                class="switch"
                            />
                        }
                    </Container>
                </Jumbotron>
                
                <Venues map={this.state.map} />
            </div>
        );
    }
}

export default App;