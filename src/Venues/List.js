import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import Detail from './Detail';

class List extends Component {
    state = {
        venues: []
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        const response = await fetch('/data/establishment-data.json');
        const data = await response.json();
        this.setState({ venues: data });
    }

    render() {
        const items = this.state.venues.map((venue, i) =>
            <tr key={i}>
                <td>{venue.title}</td>
                <td>{venue.location.city}</td>
                <td>{venue.location.zipcode}</td>
                <td>{venue.location.adress}</td>
                <td>{venue.dates.startdate ? venue.dates.startdate : null}</td>
                <td>
                    <Detail
                        title={venue.title}
                        urls={venue.urls}
                        location={venue.location}
                        media={venue.media}
                    />
                </td>
            </tr>
        );

        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>Postcode</th>
                        <th>Address</th>
                        <th>Start Year</th>
                        <th>Tools</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </Table>
        );
    }
}

export default List;