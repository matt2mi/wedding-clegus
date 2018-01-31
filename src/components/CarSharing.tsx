import * as React from 'react';
import { SyntheticEvent } from 'react';
import { Redirect } from 'react-router';
import Button from 'reactstrap/lib/Button';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { Journey } from '../helpers/models';
import CarSharingTab from './CarSharingTab';

interface Props {
}

interface State {
    readonly journeys: Journey[];
    readonly journeyId: string;
    readonly goEditJourney: boolean;
    readonly goNewJourney: boolean;
}

export default class CarSharing extends React.Component <Props, State> {
    constructor(props: Props) {
        super(props);

        this.editJourney = this.editJourney.bind(this);
        this.newJourney = this.newJourney.bind(this);
        this.deleteJourney = this.deleteJourney.bind(this);
        this.getJourneys = this.getJourneys.bind(this);

        this.state = {
            journeys: [],
            goEditJourney: false,
            goNewJourney: false,
            journeyId: ''
        };

        this.getJourneys();
    }

    editJourney(event: SyntheticEvent<HTMLButtonElement>, journeyId: string): void {
        event.preventDefault();
        this.setState({journeyId, goEditJourney: true, goNewJourney: false});
    }

    newJourney(event: SyntheticEvent<HTMLButtonElement>): void {
        event.preventDefault();
        this.setState({goEditJourney: false, goNewJourney: true});
    }

    deleteJourney(event: SyntheticEvent<HTMLButtonElement>, journeyId: string): void {
        event.preventDefault();
        fetch('/api/journey', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: journeyId})
        })
            .then(() => this.getJourneys())
            .catch(e => console.warn(e));
    }

    getJourneys(): void {
        fetch('/api/journeys')
            .then(result => result.json())
            .then((journeys: Journey[]): void => {
                const trueJourneys: Journey[] = journeys.map((journey: Journey) => ({
                    id: journey.id,
                    driverFirstName: journey.driverFirstName,
                    driverName: journey.driverName,
                    driverPhoneNumber: journey.driverPhoneNumber,
                    driverEmail: journey.driverEmail,
                    fromCity: journey.fromCity,
                    toCity: journey.toCity,
                    freeSeats: journey.freeSeats,
                    comment: journey.comment
                }));
                this.setState({journeys: trueJourneys});
            })
            .catch(e => console.warn(e));
    }

    render() {
        if (this.state.goEditJourney) {
            return (<Redirect to={'/covoiturages/edit/' + this.state.journeyId}/>);
        }
        if (this.state.goNewJourney) {
            return (<Redirect to={'/covoiturages/new'}/>);
        }
        // <div style="overflow-x:auto;">
        return (
            <div className="base-div-content">
                <Row>
                    <Col sm="12">
                        <CarSharingTab
                            journeys={this.state.journeys}
                            editJourney={this.editJourney}
                            deleteJourney={this.deleteJourney}
                        />
                        <Button
                            color="primary"
                            onClick={(e) => {
                                this.newJourney(e);
                            }}
                        >
                            Ajouter
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}