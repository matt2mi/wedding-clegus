import * as H from 'history';
import * as React from 'react';
import { withRouter } from 'react-router';
import Button from 'reactstrap/lib/Button';
import Card from 'reactstrap/lib/Card';
import CardTitle from 'reactstrap/lib/CardTitle';
import Col from 'reactstrap/lib/Col';
import Form from 'reactstrap/lib/Form';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';
import Row from 'reactstrap/lib/Row';
import { Journey } from '../helpers/models';

interface Props {
    match: { params: { id?: number } };
}

interface State {
    readonly createMode: boolean;
    readonly id: string | null;
    readonly driverFirstName: string;
    readonly driverName: string;
    readonly driverPhoneNumber: string;
    readonly driverEmail: string;
    readonly fromCity: string;
    readonly toCity: string;
    readonly freeSeats: number;
    readonly comment: string;
}

export default class JourneyDetails extends React.Component<Props, State> {

    CreateButton: React.ComponentClass;
    UpdateButton: React.ComponentClass;
    GoBackButton: React.ComponentClass;

    constructor(props: Props) {
        super(props);

        this.handleChangeForm = this.handleChangeForm.bind(this);
        this.createJourney = this.createJourney.bind(this);
        this.updateJourney = this.updateJourney.bind(this);

        this.CreateButton = withRouter(({history}) => (
            <Button color="info" onClick={(e) => this.createJourney(e, history)}>
                Créer
            </Button>
        ));
        this.UpdateButton = withRouter(({history}) => (
            <Button color="info" onClick={(e) => this.updateJourney(e, history)}>
                MAJ
            </Button>
        ));
        this.GoBackButton = withRouter(({history}) => (
            <Button
                color="info"
                onClick={(e) => {
                    e.preventDefault();
                    history.push('/covoiturages');
                }}
            >
                cancel
            </Button>
        ));

        this.state = {
            createMode: true,
            id: null,
            driverFirstName: '',
            driverName: '',
            driverPhoneNumber: '',
            driverEmail: '',
            fromCity: '',
            toCity: '',
            freeSeats: 0,
            comment: ''
        };

        if (this.props.match.params.id) {
            fetch('/api/journey/' + this.props.match.params.id)
                .then(result => result.json())
                .then((journey: Journey) => {
                    this.setState({
                        createMode: false,
                        id: journey.id,
                        driverFirstName: journey.driverFirstName,
                        driverName: journey.driverName,
                        driverPhoneNumber: journey.driverPhoneNumber,
                        driverEmail: journey.driverEmail,
                        fromCity: journey.fromCity,
                        toCity: journey.toCity,
                        freeSeats: journey.freeSeats,
                        comment: journey.comment
                    });
                })
                .catch(e => console.warn(e));
        }
    }

    /* tslint:disable */
    handleChangeForm(event: any, fieldName: string) {
        event.preventDefault();
        const change = {};
        change[fieldName] = event.target.value;
        this.setState(change);
    }

    /* tslint:enable */

    createJourney(event: React.SyntheticEvent<HTMLButtonElement>, history: H.History) {
        event.preventDefault();
        this.createOrUpdateJourney('post', () => history.push('/covoiturages'));
    }

    updateJourney(event: React.SyntheticEvent<HTMLButtonElement>, history: H.History) {
        event.preventDefault();
        this.createOrUpdateJourney('put', () => history.push('/covoiturages'));
    }

    render() {
        return (
            <div className="base-div-content">
                <Card body={true}>
                    <CardTitle>Détails du trajet</CardTitle>

                    <Form>
                        <Row className="justify-content-start mt-2">
                            <Col sm="3" xs="12">
                                <Row className="justify-content-sm-end">
                                    <Label className="mt-2 pr-3" for="driverFirstName">Prénom</Label>
                                </Row>
                            </Col>
                            <Col sm="6" xs="12">
                                <Row className="justify-content-sm-start">
                                    <Input
                                        type="text"
                                        name="driverFirstName"
                                        id="driverFirstName"
                                        value={this.state.driverFirstName}
                                        onChange={(e) => this.handleChangeForm(e, 'driverFirstName')}
                                    />
                                </Row>
                            </Col>
                        </Row>

                        <Row className="justify-content-start mt-2">
                            <Col sm="3" xs="12">
                                <Row className="justify-content-sm-end">
                                    <Label className="mt-2 pr-3" for="driverName">Nom</Label>
                                </Row>
                            </Col>
                            <Col sm="6" xs="12">
                                <Row className="justify-content-sm-start">
                                    <Input
                                        type="text"
                                        name="driverName"
                                        id="driverName"
                                        value={this.state.driverName}
                                        onChange={(e) => this.handleChangeForm(e, 'driverName')}
                                    />
                                </Row>
                            </Col>
                        </Row>

                        <Row className="justify-content-start mt-2">
                            <Col sm="3" xs="12">
                                <Row className="justify-content-sm-end">
                                    <Label className="mt-2 pr-3" for="driverPhoneNumber">Téléphone</Label>
                                </Row>
                            </Col>
                            <Col sm="6" xs="12">
                                <Row className="justify-content-sm-start">
                                    <Input
                                        type="text"
                                        placeholder="0601020304"
                                        className="col-sm-8"
                                        name="driverPhoneNumber"
                                        id="driverPhoneNumber"
                                        value={this.state.driverPhoneNumber}
                                        onChange={(e) => this.handleChangeForm(e, 'driverPhoneNumber')}
                                    />
                                </Row>
                            </Col>
                        </Row>

                        <Row className="justify-content-start mt-2">
                            <Col sm="3" xs="12">
                                <Row className="justify-content-sm-end">
                                    <Label className="mt-2 pr-3" for="driverEmail">Email</Label>
                                </Row>
                            </Col>
                            <Col sm="6" xs="12">
                                <Row className="justify-content-sm-start">
                                    <Input
                                        type="email"
                                        className="col-sm-8"
                                        name="driverEmail"
                                        id="driverEmail"
                                        value={this.state.driverEmail}
                                        onChange={(e) => this.handleChangeForm(e, 'driverEmail')}
                                    />
                                </Row>
                            </Col>
                        </Row>

                        <Row className="justify-content-start mt-2">
                            <Col sm="3" xs="12">
                                <Row className="justify-content-sm-end">
                                    <Label className="mt-2 pr-3" for="fromCity">Départ</Label>
                                </Row>
                            </Col>
                            <Col sm="6" xs="12">
                                <Row className="justify-content-sm-start">
                                    <Input
                                        type="text"
                                        name="fromCity"
                                        id="fromCity"
                                        value={this.state.fromCity}
                                        onChange={(e) => this.handleChangeForm(e, 'fromCity')}
                                    />
                                </Row>
                            </Col>
                        </Row>

                        <Row className="justify-content-start mt-2">
                            <Col sm="3" xs="12">
                                <Row className="justify-content-sm-end">
                                    <Label className="mt-2 pr-3" for="toCity">Arrivée</Label>
                                </Row>
                            </Col>
                            <Col sm="6" xs="12">
                                <Row className="justify-content-sm-start">
                                    <Input
                                        type="text"
                                        name="toCity"
                                        id="toCity"
                                        value={this.state.toCity}
                                        onChange={(e) => this.handleChangeForm(e, 'toCity')}
                                    />
                                </Row>
                            </Col>
                        </Row>

                        <Row className="justify-content-start mt-2">
                            <Col sm="3" xs="12">
                                <Row className="justify-content-sm-end">
                                    <Label className="mt-2 pr-3" for="freeSeats">Sièges libres</Label>
                                </Row>
                            </Col>
                            <Col sm="6" xs="12">
                                <Row className="justify-content-sm-start">
                                    <Input
                                        type="number"
                                        className="col-sm-3"
                                        name="freeSeats"
                                        id="freeSeats"
                                        value={this.state.freeSeats + ''}
                                        onChange={(e) => this.handleChangeForm(e, 'freeSeats')}
                                    />
                                </Row>
                            </Col>
                        </Row>

                        <Row className="justify-content-start mt-2">
                            <Col sm="3" xs="12">
                                <Row className="justify-content-sm-end">
                                    <Label className="mt-2 pr-3" for="comment">Commentaire</Label>
                                </Row>
                            </Col>
                            <Col sm="6" xs="12">
                                <Row className="justify-content-sm-start">
                                    <Input
                                        type="textarea"
                                        className="col-sm-12"
                                        name="comment"
                                        id="comment"
                                        value={this.state.comment}
                                        onChange={(e) => this.handleChangeForm(e, 'comment')}
                                    />
                                </Row>
                            </Col>
                        </Row>

                        <Row className="mt-2">
                            <Col lg="4"/>
                            <Col lg="2">
                                <this.GoBackButton/>
                            </Col>
                            <Col lg="2">
                                {this.state.createMode ? <this.CreateButton/> : <this.UpdateButton/>}
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
        );
    }

    private createOrUpdateJourney(method: string, cb: () => void) {
        fetch('/api/journey', {
            method: method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.id,
                driverFirstName: this.state.driverFirstName,
                driverName: this.state.driverName,
                driverPhoneNumber: this.state.driverPhoneNumber,
                driverEmail: this.state.driverEmail,
                fromCity: this.state.fromCity,
                toCity: this.state.toCity,
                freeSeats: this.state.freeSeats,
                comment: this.state.comment
            })
        })
            .then(result => result.json())
            .then(() => cb())
            .catch(e => console.warn(e));
    }
}