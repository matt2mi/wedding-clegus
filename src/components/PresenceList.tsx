import * as React from 'react';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { PresenceResponse } from '../helpers/models';

interface Props {
}

interface State {
    readonly presences: PresenceResponse[];
    readonly nbParticipants: number;
    readonly nbVeganParticipants: number;
    readonly nbPorkParticipants: number;
    readonly nbSaturdayMorningParticipants: number;
    readonly nbSaturdayLunchParticipants: number;
    readonly nbSaturdayDinerParticipants: number;
    readonly nbSundayLunchParticipants: number;
    readonly loading: boolean;
    readonly notificationVisible: boolean;
    readonly notificationMessage: string;
    readonly notificationColor: string;
}

export default class PresenceList extends React.Component <Props, State> {
    constructor(props: Props) {
        super(props);

        this.getPresences = this.getPresences.bind(this);
        this.startLoading = this.startLoading.bind(this);
        this.stopLoading = this.stopLoading.bind(this);
        this.toggleNotification = this.toggleNotification.bind(this);
        this.sendRemind = this.sendRemind.bind(this);

        this.state = {
            presences: [],
            nbParticipants: 0,
            nbVeganParticipants: 0,
            nbPorkParticipants: 0,
            nbSaturdayMorningParticipants: 0,
            nbSaturdayLunchParticipants: 0,
            nbSaturdayDinerParticipants: 0,
            nbSundayLunchParticipants: 0,
            loading: false,
            notificationVisible: false,
            notificationMessage: '',
            notificationColor: ''
        };
    }

    componentWillMount() {
        fetch('/api/presenceListView');
    }

    componentDidMount() {
        this.getPresences();
    }

    getPresences(): void {
        fetch('/api/presences')
            .then(result => result.json())
            .then((presences: PresenceResponse[]): void => {
                if (presences instanceof Array) {
                    let nbParticipants = 0,
                        nbVeganParticipants = 0,
                        nbPorkParticipants = 0,
                        nbSaturdayMorningParticipants = 0,
                        nbSaturdayLunchParticipants = 0,
                        nbSaturdayDinerParticipants = 0,
                        nbSundayLunchParticipants = 0;
                    const truePresences: PresenceResponse[] = presences.map((presence: PresenceResponse) => {
                        nbParticipants = isNaN(Number.parseInt(presence.nbPersons)) ?
                            nbParticipants : nbParticipants + Number.parseInt(presence.nbPersons);
                        nbVeganParticipants = isNaN(Number.parseInt(presence.nbVeganPersons)) ?
                            nbVeganParticipants : nbVeganParticipants + Number.parseInt(presence.nbVeganPersons);
                        nbPorkParticipants = isNaN(Number.parseInt(presence.nbPorkPersons)) ?
                            nbPorkParticipants : nbPorkParticipants + Number.parseInt(presence.nbPorkPersons);

                        if (presence.whenSaturdayMorning) {
                            nbSaturdayMorningParticipants += Number.parseInt(presence.nbPersons);
                        }
                        if (presence.whenSaturdayLunch) {
                            nbSaturdayLunchParticipants += Number.parseInt(presence.nbPersons);
                        }
                        if (presence.whenSaturdayDiner) {
                            nbSaturdayDinerParticipants += Number.parseInt(presence.nbPersons);
                        }
                        if (presence.whenSundayLunch) {
                            nbSundayLunchParticipants += Number.parseInt(presence.nbPersons);
                        }

                        return {
                            id: presence.id,
                            who: presence.who,
                            phoneNumber: presence.phoneNumber,
                            email: presence.email,
                            nbPersons: presence.nbPersons,
                            nbPorkPersons: presence.nbPorkPersons,
                            nbVeganPersons: presence.nbVeganPersons,
                            whenSaturdayMorning: presence.whenSaturdayMorning,
                            whenSaturdayLunch: presence.whenSaturdayLunch,
                            whenSaturdayDiner: presence.whenSaturdayDiner,
                            whenSundayLunch: presence.whenSundayLunch,
                            commentSundayLunchInfo: presence.commentSundayLunchInfo,
                            comment: presence.comment
                        };
                    });
                    this.setState({
                        presences: truePresences,
                        nbParticipants,
                        nbVeganParticipants,
                        nbPorkParticipants,
                        nbSaturdayMorningParticipants,
                        nbSaturdayLunchParticipants,
                        nbSaturdayDinerParticipants,
                        nbSundayLunchParticipants
                    });
                } else {
                    this.setState({presences: []});
                }
            })
            .catch(e => console.warn(e));
    }

    startLoading() {
        this.setState({loading: true});
    }

    stopLoading() {
        this.setState({loading: false});
    }

    toggleNotification({saved, message}: { saved: boolean, message: string }, color: string): void {
        this.setState({
            notificationVisible: true,
            notificationMessage: message,
            notificationColor: color,
        });
    }

    sendRemind(): void {
        this.setState({
            notificationVisible: false,
            notificationMessage: '',
            notificationColor: '',
        });
        this.startLoading();
        fetch('/api/remindMail')
            .then(result => result.json())
            .then((result: { saved: boolean, message: string }) => {
                this.toggleNotification(result, 'success');
                this.stopLoading();
            })
            .catch(e => {
                console.warn(e);
                this.toggleNotification(
                    {saved: false, message: 'a pô marché, déso :/'},
                    'danger'
                );
                this.stopLoading();
            });
    }

    render() {
        return (
            <div className="base-div-content">
                {/*<Row className="justify-content-center">*/}
                {/*<Col>*/}
                {/*<Alert color={this.state.notificationColor} isOpen={this.state.notificationVisible}>*/}
                {/*{this.state.notificationMessage}*/}
                {/*</Alert>*/}

                {/*{*/}
                {/*!this.state.notificationVisible ?*/}
                {/*<button*/}
                {/*type="button"*/}
                {/*className="btn btn-info mr-2"*/}
                {/*onClick={this.sendRemind}*/}
                {/*>*/}
                {/*{*/}
                {/*this.state.loading ?*/}
                {/*<div className="loader">*/}
                {/*<div className="line-scale line-scale-white">*/}
                {/*<div/>*/}
                {/*<div/>*/}
                {/*<div/>*/}
                {/*<div/>*/}
                {/*<div/>*/}
                {/*</div>*/}
                {/*</div> :*/}
                {/*'Spam de rappel'*/}
                {/*}*/}
                {/*</button> :*/}
                {/*null*/}
                {/*}*/}
                {/*</Col>*/}
                {/*</Row>*/}

                <Row>
                    <Col>
                        <p>Total : {this.state.nbParticipants} participants,
                            dont {this.state.nbVeganParticipants} sont végétariens
                            et {this.state.nbPorkParticipants} mangent du porc.</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>
                            Présents le :<br/>
                            samedi matin : {this.state.nbSaturdayMorningParticipants} personnes<br/>
                            samedi midi : {this.state.nbSaturdayLunchParticipants} personnes<br/>
                            samedi soir : {this.state.nbSaturdayDinerParticipants} personnes<br/>
                            dimanche midi : {this.state.nbSundayLunchParticipants} personnes
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Qui</th>
                                <th>Téléphone</th>
                                <th>Email</th>
                                <th>Total</th>
                                <th>Porcs</th>
                                <th>Véggies</th>
                                <th>Samedi matin</th>
                                <th>Samedi midi</th>
                                <th>Samedi soir</th>
                                <th>Dimanche midi</th>
                                <th>Bouffe dim midi</th>
                                <th>Commentaire</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.presences.map(presence => {
                                return (
                                    <tr key={presence.id}>
                                        <td>{presence.who}</td>
                                        <td>{presence.phoneNumber}</td>
                                        <td>{presence.email}</td>
                                        <td>{presence.nbPersons}</td>
                                        <td>{presence.nbPorkPersons}</td>
                                        <td>{presence.nbVeganPersons}</td>
                                        <td>
                                            {
                                                presence.whenSaturdayMorning ?
                                                    <i className="fas fa-check"/> :
                                                    <i className="fas fa-times"/>
                                            }
                                        </td>
                                        <td>
                                            {
                                                presence.whenSaturdayLunch ?
                                                    <i className="fas fa-check"/> :
                                                    <i className="fas fa-times"/>
                                            }
                                        </td>
                                        <td>
                                            {
                                                presence.whenSaturdayDiner ?
                                                    <i className="fas fa-check"/> :
                                                    <i className="fas fa-times"/>
                                            }
                                        </td>
                                        <td>
                                            {
                                                presence.whenSundayLunch ?
                                                    <i className="fas fa-check"/> :
                                                    <i className="fas fa-times"/>
                                            }
                                        </td>
                                        <td>{presence.commentSundayLunchInfo}</td>
                                        <td>{presence.comment}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </div>
        );
    }
}