import React, { Component } from 'react';
import Venues from './Venues/List';
import { Jumbotron, Container } from 'react-bootstrap';

class App extends Component {
    render() {
        return (
            <div id="app">
                <Jumbotron fluid>
                    <Container>
                        <h1>Out in Amsterdam</h1>
                        <p>
                            Let's find you the perfect venue.
                        </p>
                    </Container>
                </Jumbotron>
                <Venues />
            </div>
        );
    }
}

export default App;