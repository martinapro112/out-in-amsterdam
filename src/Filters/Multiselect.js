import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import FilteredMultiSelect from 'react-filtered-multiselect';

class Multiselect extends Component {
    state = {
        showFilter: false,
        selected: []
    }

    handleShow = () => {
        this.setState({ showFilter: true });
    }

    handleHide = () => {
        this.setState({ showFilter: false });
    }

    handleAccept = () => {
        this.setState({ showFilter: false }, () => {
            this.props.setFilter(this.state.selected);
        }); 
    }

    handleRemove = () => {
        this.setState({ showFilter: false, selected: [] }, () => {
            this.props.setFilter([]);
        }); 
    }

    handleSelect = (newValues) => {
        var selected = this.state.selected;
        newValues.forEach(v => {
            if (selected.filter(function(e) { return e.value === v.value; }).length === 0) {
                selected.push(v);
            } 
        });
        this.setState({ selected: selected })
    }

    handleDeselect(index) {
        var selected = this.state.selected.slice();
        selected.splice(index, 1);
        this.setState({ selected: selected });
    }

    render() {
        return (
            <div className="filter">
                <FontAwesomeIcon icon={faFilter} onClick={this.handleShow} color={this.state.selected.length > 0 ? 'black' : 'lightgrey'} />
    
                <Modal show={this.state.showFilter} onHide={this.handleHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="container filter">
                        <FilteredMultiSelect
                            onChange={this.handleSelect}
                            options={this.props.values}
                            textProp="value"
                            valueProp="value"
                        />
                        <br />
                        {
                            this.state.selected.length > 0 ?
                            this.state.selected.map((item, i) => 
                                <div className="selected" key={item}>
                                    <Button variant="secondary" onClick={() => this.handleDeselect(i)}>
                                        {item.value} &times;
                                    </Button>
                                </div>
                            )
                            :
                            null
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleHide}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={this.handleRemove}>
                            Remove all
                        </Button>
                        <Button variant="primary" onClick={this.handleAccept}>
                            Accept
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Multiselect;