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
}

export default class PresenceList extends React.Component <Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            presences: [],
            nbParticipants: 0,
            nbVeganParticipants: 0,
            nbPorkParticipants: 0,
            nbSaturdayMorningParticipants: 0,
            nbSaturdayLunchParticipants: 0,
            nbSaturdayDinerParticipants: 0,
            nbSundayLunchParticipants: 0
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

    render() {
        return (
            <div className="base-div-content">
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