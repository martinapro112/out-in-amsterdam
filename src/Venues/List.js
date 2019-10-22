import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import Detail from './Detail';
import Multiselect from '../Filters/Multiselect';
import Text from '../Filters/Text';

class List extends Component {
    state = {
        venues: [],
        cities: [],
        filterCity: [],
        postcodes: [],
        filterPostcode: [],
        filterName: ''
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        const response = await fetch('/data/establishment-data.json');
        const venues = await response.json();

        let cities = [];
        let postcodes = [];
        venues.forEach(v => {
            if (cities.filter((e) => { return e.value === v.location.city; }).length === 0) {
                cities.push({ value: v.location.city });
            }
            if (postcodes.filter((e) => { return e.value === v.location.zipcode; }).length === 0) {
                postcodes.push({ value: v.location.zipcode });
            }
        });

        this.setState({ venues: venues, cities: cities, postcodes: postcodes });
    }

    handleFilterCity = (city) => {
        this.setState({ filterCity: city });
    }

    handleFilterPostcode = (postcode) => {
        this.setState({ filterPostcode: postcode });
    }

    handleFilterName = (name) => {
        this.setState({ filterName: name });
    }

    render() {
        let filtered = [];

        /*
        if (this.state.filterCity && this.state.filterCity.length > 0) {
            filtered = [];
            this.state.filterCity.forEach(city => {
                filtered.push(...this.state.venues.filter(d => d.location.city === city.value));
            });
        }
        */

        this.state.venues.forEach(venue => {
            let addVenue = true;

            //cities
            if (this.state.filterCity && this.state.filterCity.length > 0) {
                let filteredCity = false;
                this.state.filterCity.forEach(city => {
                    if (venue.location.city === city.value) {
                        filteredCity = true;
                    }
                });
                if (!filteredCity) {
                    addVenue = false;
                }
            }

            //postcodes
            if (this.state.filterPostcode && this.state.filterPostcode.length > 0) {
                let filterPostcode = false;
                this.state.filterPostcode.forEach(postcode => {
                    if (venue.location.zipcode === postcode.value) {
                        filterPostcode = true;
                    }
                });
                if (!filterPostcode) {
                    addVenue = false;
                }
            }

            if (this.state.filterName && this.state.filterName.length !== '') {
                if (!venue.title.toUpperCase().includes(this.state.filterName.toUpperCase())) {
                    addVenue = false;
                }
            }

            if (addVenue) {
                filtered.push(venue);
            }
        });

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
                        <th>
                            Name
                            <Text setFilter={this.handleFilterName} />
                        </th>
                        <th>
                            City
                            <Multiselect
                                setFilter={this.handleFilterCity}
                                values={this.state.cities}
                                title="Filter by City"
                            />
                        </th>
                        <th>
                            Postcode
                            <Multiselect
                                setFilter={this.handleFilterPostcode}
                                values={this.state.postcodes}
                                title="Filter by Postcode"
                            />
                        </th>
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