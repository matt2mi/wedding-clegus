import * as React from 'react';
import { SyntheticEvent } from 'react';
import { Redirect } from 'react-router';
import { Button, Col, Row } from 'reactstrap';
import { Journey } from '../helpers/models';
import CarSharingCustomTab from './CarSharingCustomTab';

interface Props {
}

interface State {
    readonly journeys: Journey[];
    readonly journeyId: string;
    readonly goEditJourney: boolean;
    readonly goNewJourney: boolean;
    readonly loading: boolean;
}

export default class CarSharing extends React.Component <Props, State> {
    loaderStyle = {
        marginTop: window.innerHeight / 2 + 'px'
    };

    constructor(props: Props) {
        super(props);

        this.editJourney = this.editJourney.bind(this);
        this.newJourney = this.newJourney.bind(this);
        this.deleteJourney = this.deleteJourney.bind(this);
        this.getJourneys = this.getJourneys.bind(this);
        this.startLoading = this.startLoading.bind(this);
        this.stopLoading = this.stopLoading.bind(this);

        this.state = {
            journeys: [],
            goEditJourney: false,
            goNewJourney: false,
            loading: true,
            journeyId: ''
        };

        this.getJourneys();
    }

    componentDidMount() {
        this.startLoading();
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
        this.startLoading();
        event.preventDefault();
        fetch('/api/journey', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: journeyId})
        })
            .then(() => {
                this.getJourneys();
            })
            .catch(e => {
                console.warn(e);
                this.stopLoading();
            });
    }

    getJourneys(): void {
        this.startLoading();
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
                this.stopLoading();
            })
            .catch(e => {
                console.warn(e);
                this.stopLoading();
            });
    }

    startLoading() {
        this.setState({loading: true});
    }

    stopLoading() {
        this.setState({loading: false});
    }

    render() {
        if (this.state.goEditJourney) {
            return (<Redirect to={'/covoiturages/edit/' + this.state.journeyId}/>);
        }
        if (this.state.goNewJourney) {
            return (<Redirect to={'/covoiturages/new'}/>);
        }
        if (this.state.loading) {
            return (
                <div className="loader" style={this.loaderStyle}>
                    <div className="line-scale">
                        <div/>
                        <div/>
                        <div/>
                        <div/>
                        <div/>
                    </div>
                </div>
            );
        }
        return (
            <div className="base-div-content">
                <Row>
                    <Col sm="12">
                        {
                            this.state.journeys.length < 1 ?
                                <div>Pas de trajet proposé...</div> :
                                <CarSharingCustomTab
                                    journeys={this.state.journeys}
                                    editJourney={this.editJourney}
                                    deleteJourney={this.deleteJourney}
                                />
                        }
                        <hr/>
                        <Button
                            color="info"
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