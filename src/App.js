import React, { Component } from 'react';
import Venues from './Venues/List';

class App extends Component {
    render() {
        return (
            <div id="app">
                <Venues />
            </div>
        );
    }
}

export default App;