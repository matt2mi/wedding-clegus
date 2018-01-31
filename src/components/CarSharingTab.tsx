import * as React from 'react';
import { SyntheticEvent } from 'react';
import { Journey } from '../helpers/models';
import CarSharingTabLine from './CarSharingTabLine';

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
                        <CarSharingTabLine
                            key={journey.id}
                            journey={journey}
                            editJourney={this.props.editJourney}
                            deleteJourney={this.props.deleteJourney}
                        />
                    );
                })}
                </tbody>
            </table>
        );
    }
}