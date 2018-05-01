import * as React from 'react';
import { SyntheticEvent } from 'react';
import { Journey } from '../helpers/models';
import { Card, Col, Row, Tooltip } from 'reactstrap';

interface Props {
    journey: Journey;
    editJourney: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    deleteJourney: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
}

interface State {
    readonly tooltipEditOpen: boolean;
    readonly tooltipDeleteOpen: boolean;
    readonly goToDetail: string;
}

export default class CarSharingCustomTab extends React.Component <Props, State> {
    constructor(props: Props) {
        super(props);

        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleDelete = this.toggleDelete.bind(this);

        this.state = {
            tooltipEditOpen: false,
            tooltipDeleteOpen: false,
            goToDetail: '',
        };
    }

    toggleEdit() {
        this.setState({
            tooltipEditOpen: !this.state.tooltipEditOpen
        });
    }

    toggleDelete() {
        this.setState({
            tooltipDeleteOpen: !this.state.tooltipDeleteOpen
        });
    }

    render() {
        return (
            <Row key={this.props.journey.id}>
                <Card className="p-2 mb-2 col-12">
                    <Row className="justify-content-center">
                        <Col sm="4">
                            <Row className="text-sm-left">
                                <div className="col-12">
                                    {this.props.journey.driverFirstName + ' ' + this.props.journey.driverName}
                                </div>
                                <div className="col-12">
                                    {this.props.journey.driverPhoneNumber}
                                </div>
                                <div className="col-12">
                                    {this.props.journey.driverEmail}
                                </div>
                            </Row>
                        </Col>
                        <Col sm="6">
                            <Row>
                                <Col>
                                    {this.props.journey.freeSeats +
                                    (this.props.journey.freeSeats > 1 ? ' places de ' : ' place de ') +
                                    this.props.journey.fromCity + ' à ' +
                                    this.props.journey.toCity + ' le ' + this.props.journey.date}
                                </Col>
                            </Row>
                            <Row>
                                <Col>{this.props.journey.comment}</Col>
                            </Row>
                        </Col>
                        <Col sm="2">
                            <Row className="justify-content-center text-sm-right">
                                <div className="col-3 col-sm-12 mb-2">
                                    <button
                                        id="BtnEdit"
                                        type="button"
                                        className="btn btn-info icon-button"
                                        onClick={(e) => {
                                            this.props.editJourney(e, this.props.journey.id);
                                        }}
                                    >
                                        <i className="far fa-edit" aria-hidden="true"/>
                                    </button>
                                    <Tooltip
                                        placement="right"
                                        isOpen={this.state.tooltipEditOpen}
                                        target="BtnEdit"
                                        toggle={this.toggleEdit}
                                        delay={{show: 500, hide: 0}}
                                    >
                                        Modifier
                                    </Tooltip>
                                </div>
                                <div className="col-3 col-sm-12">
                                    <button
                                        id="BtnDelete"
                                        type="button"
                                        className="btn btn-info icon-button"
                                        onClick={(e) => {
                                            this.props.deleteJourney(e, this.props.journey.id);
                                        }}
                                    >
                                        <i className="fas fa-trash-alt" aria-hidden="true"/>
                                    </button>
                                    <Tooltip
                                        placement="right"
                                        isOpen={this.state.tooltipDeleteOpen}
                                        target="BtnDelete"
                                        toggle={this.toggleDelete}
                                        delay={{show: 500, hide: 0}}
                                    >
                                        Supprimer
                                    </Tooltip>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Row>
        );
    }
}