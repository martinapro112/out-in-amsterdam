import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';

import Detail from './Detail';
import Multiselect from '../Filters/Multiselect';
import Text from '../Filters/Text';
import Dateselect from '../Filters/Dateselect';
import Map from './Map';

class List extends Component {
    state = {
        venues: [],
        cities: [],
        filterCity: [],
        postcodes: [],
        filterPostcode: [],
        filterName: '',
        filterDateFrom: '',
        filterDateTo: ''
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

        let sortedCities = cities.sort((a, b) => a.value.localeCompare(b.value));
        let sortedPostcodes = postcodes.sort((a, b) => a.value.localeCompare(b.value));

        this.setState({ venues: venues, cities: sortedCities, postcodes: sortedPostcodes });
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

    handleFilterFrom = (from) => {
        this.setState({ filterDateFrom: from });
    }

    handleFilterTo = (to) => {
        this.setState({ filterDateTo: to });
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

            //names
            if (this.state.filterName && this.state.filterName.length > 0) {
                if (!venue.title.toUpperCase().includes(this.state.filterName.toUpperCase())) {
                    addVenue = false;
                }
            }

            //dates
            if (this.state.filterDateFrom && this.state.filterDateFrom.length > 0) {
                if (moment(venue.dates.startdate, "DD-MM-YYYY").isBefore(moment(this.state.filterDateFrom, "DD-MM-YYYY"))) {
                    addVenue = false;
                }
                if (!venue.dates.startdate) {
                    addVenue = false;
                }
            }
            if (this.state.filterDateTo && this.state.filterDateTo.length > 0) {
                if (moment(venue.dates.startdate, "DD-MM-YYYY").isAfter(moment(this.state.filterDateTo, "DD-MM-YYYY"))) {
                    addVenue = false;
                }
                if (!venue.dates.startdate) {
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
                        map={this.props.map}
                    />
                </td>
            </tr>
        );

        if (this.props.map) {
            return (
                <div>
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
                                <th>
                                    Start Date
                                    <Dateselect setFilterFrom={this.handleFilterFrom} setFilterTo={this.handleFilterTo} />
                                </th>
                            </tr>
                        </thead>
                    </Table>
                    <Map venues={filtered} showName={this.state.filterName} />
                </div>
            );
        } else {
            return (
                <div className="content">
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
                                <th>
                                    Start Date
                                    <Dateselect setFilterFrom={this.handleFilterFrom} setFilterTo={this.handleFilterTo} />
                                </th>
                                <th>Tools</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}

export default List;