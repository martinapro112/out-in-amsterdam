import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import Detail from './Detail';
import CityFilter from '../Filters/CityFilter';

class List extends Component {
    state = {
        venues: [],
        cities: [],
        filterCity: []
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        const response = await fetch('/data/establishment-data.json');
        const venues = await response.json();

        let cities = [];
        venues.forEach(v => {
            if (cities.filter(function(e) { return e.value === v.location.city; }).length === 0) {
                cities.push({ value: v.location.city });
            }
        });

        this.setState({ venues: venues, cities: cities });
    }

    handleFilterCity = (city) => {
        this.setState({ filterCity: city });
    }

    render() {
        let filtered = this.state.venues;
        if (this.state.filterCity && this.state.filterCity.length > 0) {
            filtered = [];
            this.state.filterCity.forEach(city => {
                filtered.push(...this.state.venues.filter(d => d.location.city === city.value));
            });
        }
        const items = filtered.map((venue, i) =>
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
                        <th>City <CityFilter setFilter={this.handleFilterCity} cities={this.state.cities} /></th>
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