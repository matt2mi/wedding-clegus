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
                        <Row key={journey.id} className="justify-content-center">
                            <Card className="p-2 mb-2 col-lg-10 col-sm-12">
                                <Row>
                                    <Col sm="4" className="text-left">
                                        <div>{journey.driverFirstName + ' ' + journey.driverName}</div>
                                        <div>{journey.driverPhoneNumber}</div>
                                        <div>{journey.driverEmail}</div>
                                    </Col>
                                    <Col sm="4">
                                        <Row className="justify-content-center">
                                            <div>
                                                {journey.freeSeats + ' place(s) de ' +
                                                journey.fromCity + ' à ' +
                                                journey.toCity}
                                            </div>
                                        </Row>
                                        <Row className="justify-content-center">
                                            <p>{journey.comment}</p>
                                        </Row>
                                    </Col>
                                    <Col sm="4">
                                        <div>
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
                                        <div>
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
                                    </Col>
                                </Row>
                            </Card>
                        </Row>
                    );
                })
            );
    }
}