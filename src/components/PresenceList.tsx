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
    readonly nbSaturdayMorningParticipants: number;
    readonly nbSaturdayLunchParticipants: number;
    readonly nbSundayLunchParticipants: number;
}

export default class PresenceList extends React.Component <Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            presences: [],
            nbParticipants: 0,
            nbVeganParticipants: 0,
            nbSaturdayMorningParticipants: 0,
            nbSaturdayLunchParticipants: 0,
            nbSundayLunchParticipants: 0
        };
    }

    componentDidMount() {
        this.setState({
            presences: [
                {
                    id: '-L78llRujn1-lYsjDY_W',
                    who: 'Matt2mi',
                    phoneNumber: '06060606',
                    email: 'matt@demi.fr',
                    nbPersons: '3',
                    nbVeganPersons: '1',
                    whenSaturdayMorning: false,
                    whenSaturdayLunch: true,
                    whenSundayLunch: true,
                    comment: 'comcomcocmcomment'
                },
                {
                    id: '-L7C3tHiw_WabVUkIzFP',
                    who: 'matt2mi',
                    phoneNumber: '0601010101',
                    email: 'matt@demi.fr',
                    nbPersons: '3',
                    nbVeganPersons: '1',
                    whenSaturdayMorning: true,
                    whenSaturdayLunch: true,
                    whenSundayLunch: false,
                    comment: 'comcomcommmmmm'
                }
            ],
            nbParticipants: 250,
            nbVeganParticipants: 45,
            nbSaturdayMorningParticipants: 100,
            nbSaturdayLunchParticipants: 235,
            nbSundayLunchParticipants: 250
        });
        this.getPresences();
    }

    getPresences(): void {
        fetch('/api/presences')
            .then(result => result.json())
            .then((presences: PresenceResponse[]): void => {
                if (presences instanceof Array) {
                    let nbParticipants = 0,
                        nbVeganParticipants = 0,
                        nbSaturdayMorningParticipants = 0,
                        nbSaturdayLunchParticipants = 0,
                        nbSundayLunchParticipants = 0;
                    const truePresences: PresenceResponse[] = presences.map((presence: PresenceResponse) => {
                        nbParticipants = isNaN(Number.parseInt(presence.nbPersons)) ?
                            nbParticipants : nbParticipants + Number.parseInt(presence.nbPersons);
                        nbVeganParticipants = isNaN(Number.parseInt(presence.nbVeganPersons)) ?
                            nbVeganParticipants : nbVeganParticipants + Number.parseInt(presence.nbVeganPersons);

                        nbSaturdayMorningParticipants += presence.whenSaturdayMorning ? 1 : 0;
                        nbSaturdayLunchParticipants += presence.whenSaturdayLunch ? 1 : 0;
                        nbSundayLunchParticipants += presence.whenSundayLunch ? 1 : 0;

                        return {
                            id: presence.id,
                            who: presence.who,
                            phoneNumber: presence.phoneNumber,
                            email: presence.email,
                            nbPersons: presence.nbPersons,
                            nbVeganPersons: presence.nbVeganPersons,
                            whenSaturdayMorning: presence.whenSaturdayMorning,
                            whenSaturdayLunch: presence.whenSaturdayLunch,
                            whenSundayLunch: presence.whenSundayLunch,
                            comment: presence.comment
                        };
                    });
                    this.setState({
                        presences: truePresences,
                        nbParticipants,
                        nbVeganParticipants,
                        nbSaturdayMorningParticipants,
                        nbSaturdayLunchParticipants,
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
                            dont {this.state.nbVeganParticipants} sont végétariens.</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>
                            Présents le :<br/>
                            samedi matin : {this.state.nbSaturdayMorningParticipants} personnes<br/>
                            samedi midi : {this.state.nbSaturdayLunchParticipants} personnes<br/>
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
                                <th>Nombre</th>
                                <th>Véggies</th>
                                <th>Samedi matin</th>
                                <th>Samedi midi</th>
                                <th>Dimanche midi</th>
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
                                                presence.whenSundayLunch ?
                                                    <i className="fas fa-check"/> :
                                                    <i className="fas fa-times"/>
                                            }
                                        </td>
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