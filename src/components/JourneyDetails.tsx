import * as React from 'react';
import { withRouter } from 'react-router';
import Button from 'reactstrap/lib/Button';
import Card from 'reactstrap/lib/Card';
import CardTitle from 'reactstrap/lib/CardTitle';
import { Journey } from '../helpers/models';
import { CardText, Col, Row } from 'reactstrap';

interface Props {
    match: { params: { id?: number } };
}

interface State {
    readonly journey: Journey;
}

export default class JourneyDetails extends React.Component<Props, State> {
    GoBackButton: React.ComponentClass;

    constructor(props: Props) {
        super(props);

        this.GoBackButton = withRouter(({history}) => (
            <Button
                color="info"
                onClick={(e) => {
                    e.preventDefault();
                    history.push('/covoiturages');
                }}
                className="col-sm-12 col-md-4"
            >
                Retour
            </Button>
        ));

        this.state = {
            journey: new Journey()
        };

        if (this.props.match.params.id) {
            fetch('/api/journey/' + this.props.match.params.id)
                .then(result => result.json())
                .then((journey: Journey) => {
                    this.setState({
                        journey: {
                            id: journey.id,
                            driverFirstName: journey.driverFirstName,
                            driverName: journey.driverName,
                            driverPhoneNumber: journey.driverPhoneNumber,
                            driverEmail: journey.driverEmail,
                            fromCity: journey.fromCity,
                            toCity: journey.toCity,
                            freeSeats: journey.freeSeats,
                            comment: journey.comment
                        }
                    });
                })
                .catch(e => console.warn(e));
        }
    }

    render() {
        return (
            <div className="base-div-content">
                <Card body={true}>
                    <CardTitle className="form-title">Détails du trajet</CardTitle>
                    <Row>
                        <Col xs="12" sm="12" md="5" className="pt-3">
                            <Row className="justify-content-md-end justify-content-center">
                                De {this.state.journey.fromCity}
                            </Row>
                        </Col>
                        <Col className="hidden-sm-down" md="2">
                            <i className="fa fa-car fa-3x" aria-hidden="true"/>
                        </Col>
                        <Col xs="12" sm="12" md="5" className="pt-3">
                            <Row className="justify-content-md-start justify-content-center">
                                à {this.state.journey.toCity}
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            avec {this.state.journey.freeSeats} place(s) disponible(s)
                        </Col>
                    </Row>

                    <hr/>

                    <CardTitle className="form-title">Conducteur</CardTitle>
                    <CardText>{this.state.journey.driverFirstName + ' ' + this.state.journey.driverName}</CardText>
                    <CardText>
                        {this.state.journey.driverPhoneNumber}
                    </CardText>
                    <CardText>
                        {this.state.journey.driverEmail}
                    </CardText>

                    <hr/>

                    <CardTitle className="form-title">Commentaire</CardTitle>
                    <CardText>{this.state.journey.comment}</CardText>

                    <hr/>

                    <Row className="justify-content-center">
                        <Col>
                            <this.GoBackButton/>
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
}