import * as React from 'react';
import { SyntheticEvent } from 'react';
import { Journey } from '../helpers/models';
import { Card, Col, Row, Tooltip } from 'reactstrap';
import { Redirect } from 'react-router';

interface Props {
    journeys: Journey[];
    editJourney: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    deleteJourney: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
}

interface State {
    readonly tooltipEditOpen: boolean;
    readonly tooltipDeleteOpen: boolean;
    readonly goToDetail: string;
    readonly journeys: Journey[];
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
            journeys: props.journeys.map((journey: Journey) => ({...journey, displayDetails: false}))
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
        return this.state.goToDetail.length > 0 ?
            (
                <Redirect to={'/covoiturages/detail/' + this.state.goToDetail}/>
            ) :
            (
                this.state.journeys.map((journey: Journey) => {
                    return (
                        <Row key={journey.id}>
                            <Card className="p-2 mb-2 col-12">
                                <Row className="justify-content-center">
                                    <Col sm="4">
                                        <Row className="text-sm-left">
                                            <div className="col-12">
                                                {journey.driverFirstName + ' ' + journey.driverName}
                                            </div>
                                            <div className="col-12">
                                                {journey.driverPhoneNumber}
                                            </div>
                                            <div className="col-12">
                                                {journey.driverEmail}
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col sm="4">
                                        <Row>
                                            <Col>
                                                {journey.freeSeats +
                                                (journey.freeSeats > 1 ? ' places de ' : ' place de ') +
                                                journey.fromCity + ' à ' +
                                                journey.toCity}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>{journey.comment}</Col>
                                        </Row>
                                    </Col>
                                    <Col sm="4">
                                        <Row className="justify-content-center">
                                            <div className="col-3 col-sm-12 mb-2">
                                                <button
                                                    id="BtnEdit"
                                                    type="button"
                                                    className="btn btn-info"
                                                    onClick={(e) => {
                                                        this.props.editJourney(e, journey.id);
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
                                                    className="btn btn-info"
                                                    onClick={(e) => {
                                                        this.props.deleteJourney(e, journey.id);
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
                })
            );
    }
}