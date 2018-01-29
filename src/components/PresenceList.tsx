import * as React from 'react';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { PresenceResponse } from '../helpers/interfaces';

interface Props {
}

interface State {
    readonly presences: PresenceResponse[];
}

export default class PresenceList extends React.Component <Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {presences: []};

        this.getPresences();
    }

    getPresences(): void {
        fetch('/api/presences')
            .then(result => result.json())
            .then((presences: PresenceResponse[]): void => {
                const truePresences: PresenceResponse[] = presences.map((presence: PresenceResponse) => ({
                    id: presence.id,
                    name: presence.name,
                    firstname: presence.firstname,
                    nbPersons: presence.nbPersons,
                    phoneNumber: presence.phoneNumber
                }));
                this.setState({presences: truePresences});
            })
            .catch(e => console.warn(e));
    }

    render() {
        return (
            <div>
                <Row>
                    <Col sm="12">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Prénom</th>
                                <th>Nom</th>
                                <th>Nombre</th>
                                <th>Numéro</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.presences.map(presence => {
                                return (
                                    <tr key={presence.id}>
                                        <td>{presence.firstname}</td>
                                        <td>{presence.name}</td>
                                        <td>{presence.nbPersons}</td>
                                        <td>{presence.phoneNumber}</td>
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