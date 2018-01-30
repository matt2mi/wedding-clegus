import * as React from 'react';
import { SyntheticEvent } from 'react';
import * as ReactDOM from 'react-dom';
import Button from 'reactstrap/lib/Button';
import { Journey } from '../helpers/interfaces';

interface Props {
    journey: Journey;
    editJourney: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    deleteJourney: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
}

interface State {
}

export default class CarSharingTabLine extends React.Component <Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        console.warn(ReactDOM.findDOMNode(this).getBoundingClientRect());
    }

    render() {
        return (
            <tr key={this.props.journey.id}>
                <td
                    className="pointer"
                    onClick={() => alert('go ' + this.props.journey.toCity)}
                >
                    {this.props.journey.driverFirstName}
                </td>
                <td
                    className="pointer"
                    onClick={() => alert('go ' + this.props.journey.toCity)}
                >
                    {this.props.journey.fromCity}
                </td>
                <td
                    className="pointer"
                    onClick={() => alert('go ' + this.props.journey.toCity)}
                >
                    {this.props.journey.toCity}
                </td>
                <td
                    className="pointer"
                    onClick={() => alert('go ' + this.props.journey.toCity)}
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