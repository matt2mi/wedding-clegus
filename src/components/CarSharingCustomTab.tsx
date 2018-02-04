import * as React from 'react';
import { SyntheticEvent } from 'react';
import { Journey } from '../helpers/models';
import { Button, Card, CardBody, Col, Collapse, Row } from 'reactstrap';
import { Redirect } from 'react-router';

interface Props {
    journeys: Journey[];
    editJourney: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    deleteJourney: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
}

interface State {
    readonly goToDetail: string;
    readonly journeys: Journey[];
}

export default class CarSharingCustomTab extends React.Component <Props, State> {
    constructor(props: Props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            goToDetail: '',
            journeys: props.journeys.map((journey: Journey) => ({...journey, displayDetails: false}))
        };
    }

    toggle(journeyId: string) {
        const newJourneys: Journey[] = this.state.journeys.map((journey: Journey) => {
            return journey.id === journeyId ? {...journey, displayDetails: !journey.displayDetails} : {...journey};
        });
        this.setState({journeys: newJourneys});
    }

    render() {

        return this.state.goToDetail.length > 0 ?
            (
                <Redirect to={'/covoiturages/detail/' + this.state.goToDetail}/>
            ) :
            (
                <div>
                    <Row>
                        <Col lg="2">Conducteur</Col>
                        <Col lg="2">Ville de départ</Col>
                        <Col lg="2">Ville d'arrivée</Col>
                        <Col lg="2">Sièges libres</Col>
                        <Col lg="1"/>
                        <Col lg="1"/>
                    </Row>
                    {this.state.journeys.map((journey: Journey) => {
                        return (
                            <Card key={journey.id} className="mt-2 p-1">
                                <Row>
                                    <Col
                                        lg="2"
                                        className="pt-2"
                                        onClick={() => this.toggle(journey.id)}
                                    >
                                        {journey.driverFirstName}
                                    </Col>
                                    <Col
                                        lg="2"
                                        className="pt-2"
                                        onClick={() => this.toggle(journey.id)}
                                    >
                                        {journey.fromCity}
                                    </Col>
                                    <Col
                                        lg="2"
                                        className="pt-2"
                                        onClick={() => this.toggle(journey.id)}
                                    >
                                        {journey.toCity}
                                    </Col>
                                    <Col
                                        lg="2"
                                        className="pt-2"
                                        onClick={() => this.toggle(journey.id)}
                                    >
                                        {journey.freeSeats}
                                    </Col>
                                    <Col lg="1">
                                        <Button
                                            color="info"
                                            onClick={(e) => {
                                                this.props.editJourney(e, journey.id);
                                            }}
                                        >
                                            <i className="fa fa-2 fa-pencil" aria-hidden="true"/>
                                        </Button>
                                    </Col>
                                    <Col lg="1">
                                        <Button
                                            color="danger"
                                            onClick={(e) => {
                                                this.props.deleteJourney(e, journey.id);
                                            }}
                                        >
                                            <i className="fa fa-2 fa-trash-o" aria-hidden="true"/>
                                        </Button>
                                    </Col>
                                </Row>
                                <Collapse isOpen={journey.displayDetails}>
                                    <Card>
                                        <CardBody>
                                            <Row>
                                                <Col sm="4">{journey.driverFirstName + ' ' + journey.driverName}</Col>
                                                <Col sm="4">
                                                    {journey.driverPhoneNumber + ' - ' + journey.driverEmail}
                                                </Col>
                                                <Col sm="4">{journey.comment}</Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Collapse>
                            </Card>
                        );
                    })}
                </div>
            );
    }
}