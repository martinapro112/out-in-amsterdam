import React, { Component } from 'react';
import { Button, Modal, Card, ListGroup, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Detail extends Component {
    state = {
        show: false,
        center: {
            lat: 52.370216,
            lng: 4.895168
        },
        zoom: 9
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    handleHide = () => {
        this.setState({ show: false });
    }

    render () {
        const links = this.props.urls.map((url, i) =>
            <ListGroup.Item key={url + i}><a target="_blank" href={url}>{url}</a></ListGroup.Item>
        );

        const images = this.props.media.map((image, i) =>
            <Carousel.Item key={image.url + i}>
                <img
                    className="d-block w-100"
                    src={image.url}
                    alt="venue"
                />
            </Carousel.Item>
        );

        return (
            <div className="tools">
                <FontAwesomeIcon icon={faInfoCircle} onClick={this.handleShow} />
        
                <Modal show={this.state.show} onHide={this.handleHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="container">
                        {
                            this.props.media.length > 0 ?
                            <Card>
                                <Card.Body>
                                    <Carousel>
                                        {images}
                                    </Carousel>
                                </Card.Body>
                            </Card>
                            :
                            null
                        }
                        <Card>
                            <Card.Body>
                                <Card.Title>Full Address</Card.Title>
                                <Card.Text>
                                    {this.props.location.name ? <div>{this.props.location.name}</div> : null}
                                    {this.props.location.adress ? <div>{this.props.location.adress}</div> : null}
                                    {this.props.location.city ? <div>{this.props.location.city}</div> : null}
                                    {this.props.location.zipcode ? <div>{this.props.location.zipcode}</div> : null}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        {
                            this.props.location.latitude && this.props.location.longitude ?
                            <Card>
                                <Card.Body>
                                    <Card.Title>Coordinates</Card.Title>
                                    <Card.Text>
                                        <div>Latitude: {this.props.location.latitude}, Longitude: {this.props.location.longitude}</div>
                                        <div style={{ height: '20rem', width: '100%' }}>
                                            <GoogleMapReact
                                                bootstrapURLKeys={{ key: 'AIzaSyA4E6nhEcx84do3Lr7VhpimcRFc793lG4A' }}
                                                defaultCenter={this.state.center}
                                                defaultZoom={this.state.zoom}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faMapMarker}
                                                    size="3x"
                                                    color="#17a2b8"
                                                    lat={this.props.location.latitude.replace(',', '.')}
                                                    lng={this.props.location.longitude.replace(',', '.')}
                                                    text={this.props.title}
                                                />
                                            </GoogleMapReact>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            :
                            null
                        }
                        {
                            this.props.urls.length > 0 ?
                            <Card>
                                <Card.Body>
                                    <Card.Title>Links</Card.Title>
                                    <Card.Text>
                                        <ListGroup>{links}</ListGroup>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            :
                            null
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleHide}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Detail;