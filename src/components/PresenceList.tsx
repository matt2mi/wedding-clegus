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
}

export default class PresenceList extends React.Component <Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            presences: [],
            nbParticipants: 0,
            nbVeganParticipants: 0
        };

        this.getPresences();
    }

    getPresences(): void {
        fetch('/api/presences')
            .then(result => result.json())
            .then((presences: PresenceResponse[]): void => {
                if (presences instanceof Array) {
                    const truePresences: PresenceResponse[] = presences.map((presence: PresenceResponse) => {
                        const nbParticipants = isNaN(Number.parseInt(presence.nbPersons)) ?
                            0 : Number.parseInt(presence.nbPersons);
                        const nbVeggies = isNaN(Number.parseInt(presence.nbVeganPersons)) ?
                            0 : Number.parseInt(presence.nbVeganPersons);
                        this.setState({
                            nbParticipants: this.state.nbParticipants + nbParticipants,
                            nbVeganParticipants: this.state.nbVeganParticipants + nbVeggies
                        });
                        return {
                            id: presence.id,
                            name: presence.name,
                            firstname: presence.firstname,
                            phoneNumber: presence.phoneNumber,
                            email: presence.email,
                            nbPersons: presence.nbPersons,
                            nbVeganPersons: presence.nbVeganPersons,
                            comment: presence.comment
                        };
                    });
                    this.setState({presences: truePresences});
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
                    <Col sm="12">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Prénom</th>
                                <th>Nom</th>
                                <th>Téléphone</th>
                                <th>Email</th>
                                <th>Nombre</th>
                                <th>Véggies</th>
                                <th>Commentaire</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.presences.map(presence => {
                                return (
                                    <tr key={presence.id}>
                                        <td>{presence.firstname}</td>
                                        <td>{presence.name}</td>
                                        <td>{presence.phoneNumber}</td>
                                        <td>{presence.email}</td>
                                        <td>{presence.nbPersons}</td>
                                        <td>{presence.nbVeganPersons}</td>
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