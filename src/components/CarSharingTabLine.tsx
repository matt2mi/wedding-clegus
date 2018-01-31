import * as React from 'react';
import { SyntheticEvent } from 'react';
import { Redirect } from 'react-router';
import Button from 'reactstrap/lib/Button';
import { Journey } from '../helpers/models';

interface Props {
    journey: Journey;
    editJourney: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    deleteJourney: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
}

interface State {
    readonly goToDetail: boolean;
}

export default class CarSharingTabLine extends React.Component <Props, State> {
    constructor(props: Props) {
        super(props);

        this.showLineDetail = this.showLineDetail.bind(this);

        this.state = { goToDetail: false };
    }

    showLineDetail() {
        this.setState({ goToDetail: !this.state.goToDetail });
    }

    render() {
        return this.state.goToDetail ?
            (
                <Redirect to={'/covoiturages/detail/' + this.props.journey.id}/>
            ) :
            (
            <tr key={this.props.journey.id}>
                <td
                    className="pointer"
                    onClick={this.showLineDetail}
                >
                    {this.props.journey.driverFirstName}
                </td>
                <td
                    className="pointer"
                    onClick={this.showLineDetail}
                >
                    {this.props.journey.fromCity}
                </td>
                <td
                    className="pointer"
                    onClick={this.showLineDetail}
                >
                    {this.props.journey.toCity}
                </td>
                <td
                    className="pointer"
                    onClick={this.showLineDetail}
                >
                    {this.props.journey.freeSeats}
                </td>
                <td>
                    <Button
                        color="primary"
                        onClick={(e) => {
                            this.props.editJourney(e, this.props.journey.id);
                        }}
                    >
                        <i className="fa fa-2 fa-pencil" aria-hidden="true"/>
                    </Button>
                </td>
                <td>
                    <Button
                        color="danger"
                        onClick={(e) => {
                            this.props.deleteJourney(e, this.props.journey.id);
                        }}
                    >
                        <i className="fa fa-2 fa-trash-o" aria-hidden="true"/>
                    </Button>
                </td>
            </tr>
        );
    }
}