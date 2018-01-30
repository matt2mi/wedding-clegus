import * as React from 'react';
import { SyntheticEvent } from 'react';
import Button from 'reactstrap/lib/Button';
import { Journey } from '../helpers/interfaces';

interface Props {
    journeys: Journey[];
    editJourney: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    deleteJourney: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
}

interface State {
}

export default class CarSharingTab extends React.Component <Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th>Conducteur</th>
                    <th>Ville de départ</th>
                    <th>Ville d'arrivée</th>
                    <th>Sièges libres</th>
                    <th/>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {this.props.journeys.map((journey: Journey) => {
                    return (
                        <tr key={journey.id}>
                            <td
                                className="pointer"
                                onClick={() => alert('go ' + journey.toCity)}
                            >
                                {journey.driverFirstName}
                            </td>
                            <td
                                className="pointer"
                                onClick={() => alert('go ' + journey.toCity)}
                            >
                                {journey.fromCity}
                            </td>
                            <td
                                className="pointer"
                                onClick={() => alert('go ' + journey.toCity)}
                            >
                                {journey.toCity}
                            </td>
                            <td
                                className="pointer"
                                onClick={() => alert('go ' + journey.toCity)}
                            >
                                {journey.freeSeats}
                            </td>
                            <td>
                                <Button
                                    color="primary"
                                    onClick={(e) => {
                                        this.props.editJourney(e, journey.id);
                                    }}
                                >
                                    <i className="fa fa-2 fa-pencil" aria-hidden="true"/>
                                </Button>
                            </td>
                            <td>
                                <Button
                                    color="danger"
                                    onClick={(e) => {
                                        this.props.deleteJourney(e, journey.id);
                                    }}
                                >
                                    <i className="fa fa-2 fa-trash-o" aria-hidden="true"/>
                                </Button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        );
    }
}