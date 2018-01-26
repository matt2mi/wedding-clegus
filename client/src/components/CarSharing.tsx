import * as React from 'react';
import { SyntheticEvent } from 'react';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { Journey } from '../helpers/interfaces';
import Button from 'reactstrap/lib/Button';
import { Redirect } from 'react-router';

interface Props {
}

interface State {
    readonly journeys: Journey[];
    readonly journeyId: number;
    readonly goEditJourney: boolean;
    readonly goNewJourney: boolean;
}

export default class CarSharing extends React.Component <Props, State> {
    constructor(props: Props) {
        super(props);

        this.editJourney = this.editJourney.bind(this);
        this.newJourney = this.newJourney.bind(this);
        this.state = {
            journeys: [],
            goEditJourney: false,
            goNewJourney: false,
            journeyId: 0
        };
    }

    componentWillMount() {
        fetch('/api/journeys')
            .then(result => {
                return result.json();
            })
            .then((journeys: Journey[]) => {
                const trueJourneys: Journey[] = journeys.map((journey: Journey) => ({
                    id: journey.id,
                    name: journey.name,
                    fromCity: journey.fromCity,
                    toCity: journey.toCity,
                    freeSeats: journey.freeSeats,
                    totalSeats: journey.totalSeats,
                    price: journey.price,
                    driverPhoneNumber: journey.driverPhoneNumber
                }));
                console.warn(trueJourneys);
                this.setState({journeys: trueJourneys});
            })
            .catch();
    }

    editJourney(event: SyntheticEvent<HTMLButtonElement>, journeyId: number) {
        event.preventDefault();
        this.setState({journeyId, goEditJourney: true, goNewJourney: false});
    }

    newJourney(event: SyntheticEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.setState({goEditJourney: false, goNewJourney: true});
    }

    render() {
        if (this.state.goEditJourney) {
            return (<Redirect to={'/covoiturages/edit/' + this.state.journeyId}/>);
        }
        if (this.state.goNewJourney) {
            return (<Redirect to={'/covoiturages/new'}/>);
        }
        return (
            <div>
                <Row>
                    <Col sm="12">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Ville de départ</th>
                                <th>Ville d'arrivée</th>
                                <th>Sièges libres</th>
                                <th>Prix</th>
                                <th>Numéro</th>
                                <th/>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.journeys.map(journey => {
                                return (
                                    <tr key={journey.id}>
                                        <td>{journey.fromCity}</td>
                                        <td>{journey.toCity}</td>
                                        <td>{journey.freeSeats + '/' + journey.totalSeats}</td>
                                        <td>{journey.price}</td>
                                        <td>{journey.driverPhoneNumber}</td>
                                        <td>
                                            <Button
                                                color="primary"
                                                onClick={(e) => {
                                                    this.editJourney(e, journey.id);
                                                }}
                                            >
                                                Modifier
                                            </Button>
                                        </td>
                                        <td>
                                            <Button color="danger">X</Button>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>

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