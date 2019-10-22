import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import SearchInput from 'react-search-input';

class Text extends Component {
    state = {
        showFilter: false,
        text: ''
    }

    handleShow = () => {
        this.setState({ showFilter: !this.state.showFilter });
    }

    handleSelect = (text) => {
        this.setState({ text: text }, () => {
            this.props.setFilter(this.state.text);
        });
    }

    render() {
        return (
            <div className="filter">
                <FontAwesomeIcon icon={faFilter} onClick={this.handleShow} color={this.state.text.length > 0 ? 'black' : 'lightgrey'} />
    
                {this.state.showFilter ? <SearchInput className="search-input" onChange={this.handleSelect} /> : null}
            </div>
        );
    }
}

export default Text;