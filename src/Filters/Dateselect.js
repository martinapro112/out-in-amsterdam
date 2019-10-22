import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Pikaday from 'pikaday';
import moment from 'moment';

class Dateselect extends Component {
    state = {
        showFilter: false,
        from: '',
        to: ''
    }

    refFrom = React.createRef();
    refTo = React.createRef();

    pickadayFrom = null;
    pickadayTo = null;

    componentDidMount() {
        this.pickadayFrom = new Pikaday({
            field: this.refFrom.current,
            format: 'DD-MM-YYYY',
            onSelect: this.handleSelectFrom,
            value: this.state.from
        });

        this.pickadayTo = new Pikaday({
            field: this.refTo.current,
            format: 'DD-MM-YYYY',
            onSelect: this.handleSelectTo,
            value: this.state.from
        });
    }

    handleShow = () => {
        this.setState({ showFilter: !this.state.showFilter });
    }

    handleSelectFrom = (from) => {
        this.setState({ from: moment(from).format("DD-MM-YYYY") }, () => {
            this.props.setFilterFrom(this.state.from);
        });
    }

    handleSelectTo = (to) => {
        this.setState({ to: moment(to).format("DD-MM-YYYY") }, () => {
            this.props.setFilterTo(this.state.to);
        });
    }

    handleClearFrom = () => {
        this.pickadayFrom.setDate(null);
        this.setState({ from: '' }, () => {
            this.props.setFilterFrom(this.state.from);
        });
    }

    handleClearTo = () => {
        this.pickadayTo.setDate(null);
        this.setState({ to: '' }, () => {
            this.props.setFilterFrom(this.state.to);
        });
    }

    render() {
        return (
            <div className="filter">
                <FontAwesomeIcon icon={faFilter} onClick={this.handleShow}
                    color={(this.state.from.length > 0 || this.state.to.length > 0) ? 'black' : 'lightgrey'} 
                />
 
                    <div className={this.state.showFilter ? 'show' : 'hide'}>
                        <div className="filter-date">
                            <div className="label">From:</div>
                            <input type="text" ref={this.refFrom} />
                            {this.state.from.length > 0 ? <div className="close" onClick={this.handleClearFrom} /> : null}
                        </div>
                        <div className="filter-date">
                            <div className="label">To:</div>
                            <input type="text" ref={this.refTo} />
                            {this.state.to.length > 0 ? <div className="close" onClick={this.handleClearTo} /> : null}
                        </div>
                    </div> 
            </div>
        );
    }
}

export default Dateselect;