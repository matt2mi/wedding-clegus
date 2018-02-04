import * as React from 'react';
import { SyntheticEvent } from 'react';
import { Journey } from '../helpers/models';
import { Button, Card, Col, Row } from 'reactstrap';
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

                this.state.journeys.map((journey: Journey) => {
                    return (
                        <Row key={journey.id} className="justify-content-center">
                            <Card className="p-2 mb-2 col-lg-10 col-sm-12">
                                <Row>
                                    <Col sm="4" className="text-left">
                                        <div>{journey.driverFirstName + ' ' + journey.driverName}</div>
                                        <div>{journey.driverPhoneNumber}</div>
                                        <div>{journey.driverEmail}</div>
                                    </Col>
                                    <Col sm="4">
                                        <Row className="justify-content-center">
                                            <div>
                                                {journey.freeSeats + ' place(s) de ' +
                                                journey.fromCity + ' à ' +
                                                journey.toCity}
                                            </div>
                                        </Row>
                                        <Row className="justify-content-center">
                                            <p>{journey.comment}</p>
                                        </Row>
                                    </Col>
                                    <Col sm="4">
                                        <Button
                                            color="link"
                                            className="col-12"
                                            onClick={(e) => {
                                                this.props.editJourney(e, journey.id);
                                            }}
                                        >
                                            <i className="fa fa-2 fa-pencil" aria-hidden="true"/> Modifier
                                        </Button>
                                        <Button
                                            color="link"
                                            className="col-12"
                                            onClick={(e) => {
                                                this.props.deleteJourney(e, journey.id);
                                            }}
                                        >
                                            <i className="fa fa-2 fa-trash-o" aria-hidden="true"/> Supprimer
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        </Row>
                    );
                })
            );
    }
}