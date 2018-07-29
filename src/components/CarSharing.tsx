import * as React from 'react';
import { SyntheticEvent } from 'react';
import { Redirect } from 'react-router';
import { Col, Row } from 'reactstrap';
import { Journey } from '../helpers/models';
import CarSharingCustomTab from './CarSharingCustomTab';
import Card from 'reactstrap/lib/Card';

interface Props {
}

interface State {
    readonly journeys: Journey[];
    readonly journeyId: string;
    readonly goSubscribe: boolean;
    readonly goEditJourney: boolean;
    readonly goNewJourney: boolean;
    readonly loading: boolean;
    readonly errorGettingJourneys: boolean;
}

export default class CarSharing extends React.Component <Props, State> {
    loaderStyle = {
        marginTop: window.innerHeight / 2 + 'px'
    };

    constructor(props: Props) {
        super(props);

        this.subscribe = this.subscribe.bind(this);
        this.newJourney = this.newJourney.bind(this);
        this.editJourney = this.editJourney.bind(this);
        this.deleteJourney = this.deleteJourney.bind(this);
        this.getJourneys = this.getJourneys.bind(this);
        this.startLoading = this.startLoading.bind(this);
        this.stopLoading = this.stopLoading.bind(this);

        this.state = {
            journeys: [
                // new Journey(),
                // new Journey()
            ],
            goSubscribe: false,
            goEditJourney: false,
            goNewJourney: false,
            loading: true,
            journeyId: '',
            errorGettingJourneys: false
        };
    }

    componentWillMount() {
        fetch('/api/carSharingView');
    }

    componentDidMount() {
        this.startLoading();
        this.getJourneys();
    }

    subscribe(event: SyntheticEvent<HTMLButtonElement>): void {
        event.preventDefault();
        this.setState({goSubscribe: true, goEditJourney: false, goNewJourney: false});
    }

    newJourney(event: SyntheticEvent<HTMLButtonElement>): void {
        event.preventDefault();
        this.setState({goSubscribe: false, goEditJourney: false, goNewJourney: true});
    }

    editJourney(event: SyntheticEvent<HTMLButtonElement>, journeyId: string): void {
        event.preventDefault();
        this.setState({journeyId, goSubscribe: false, goEditJourney: true, goNewJourney: false});
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
                if (journeys instanceof Array) {
                    const trueJourneys: Journey[] = journeys.map((journey: Journey) => ({
                        id: journey.id,
                        driverFirstName: journey.driverFirstName,
                        driverName: journey.driverName,
                        driverPhoneNumber: journey.driverPhoneNumber,
                        driverEmail: journey.driverEmail,
                        date: journey.date,
                        fromCity: journey.fromCity,
                        toCity: journey.toCity,
                        freeSeats: journey.freeSeats,
                        comment: journey.comment
                    }));
                    this.setState({journeys: trueJourneys, errorGettingJourneys: false});
                } else {
                    this.setState({journeys: [], errorGettingJourneys: false});
                }
                this.stopLoading();
            })
            .catch(e => {
                this.setState({errorGettingJourneys: true});
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
        if (this.state.goSubscribe) {
            return (<Redirect to={'/covoiturages/inscription'}/>);
        }
        if (this.state.goEditJourney) {
            return (<Redirect to={'/covoiturages/edit/' + this.state.journeyId}/>);
        }
        if (this.state.goNewJourney) {
            return (<Redirect to={'/covoiturages/new'}/>);
        }
        if (this.state.loading) {
            return (
                <div className="loader" style={this.loaderStyle}>
                    <div className="line-scale line-scale-orange">
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
                        <Card body={true} className="mt-3">
                            <Row className="justify-content-center justify-content-sm-end">
                                <button
                                    type="button"
                                    className="btn btn-info mr-2"
                                    onClick={(e) => {
                                        this.newJourney(e);
                                    }}
                                >
                                    Proposer un trajet
                                </button>
                                {/*<button*/}
                                {/*type="button"*/}
                                {/*className="btn btn-info"*/}
                                {/*onClick={(e) => {*/}
                                {/*this.subscribe(e);*/}
                                {/*}}*/}
                                {/*>*/}
                                {/*Créer une alerte*/}
                                {/*</button>*/}
                            </Row>
                            <hr/>
                            <Row>
                                <Col sm="12">
                                    {
                                        this.state.errorGettingJourneys ?
                                            <div>Erreur lors de l'affichage des covoiturages. Réessayez plus tard.</div> :
                                            this.state.journeys.length < 1 ?
                                                <div>Pas encore de trajet proposé...</div> :
                                                this.state.journeys.map((journey: Journey) => (
                                                    <CarSharingCustomTab
                                                        key={journey.id}
                                                        journey={journey}
                                                        editJourney={this.editJourney}
                                                        deleteJourney={this.deleteJourney}
                                                    />))
                                    }
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}