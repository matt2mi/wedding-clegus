import * as React from 'react';
import { Alert, Button, Form, Input, Label } from 'reactstrap';
import Card from 'reactstrap/lib/Card';
import CardTitle from 'reactstrap/lib/CardTitle';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

interface Props {
}

interface State {
    readonly loading: boolean;
    readonly who: string;
    readonly phoneNumber: string;
    readonly email: string;
    readonly nbPersons: number;
    readonly nbVeganPersons: number;
    readonly whenSaturdayMorning: boolean;
    readonly whenSaturdayLunch: boolean;
    readonly whenSundayLunch: boolean;
    readonly comment: string;
    readonly displayForm: boolean;
    readonly notificationVisible: boolean;
    readonly notificationMessage: string;
}

export default class InvitationResponse extends React.Component<Props, State> {
    loaderStyle = {
        marginTop: window.innerHeight / 2 + 'px'
    };

    constructor(props: Props) {
        super(props);

        this.handleChangeForm = this.handleChangeForm.bind(this);
        this.createAnswer = this.createAnswer.bind(this);
        this.toggleNotification = this.toggleNotification.bind(this);
        this.startLoading = this.startLoading.bind(this);
        this.stopLoading = this.stopLoading.bind(this);

        this.state = {
            loading: false,
            who: '',
            phoneNumber: '',
            email: '',
            nbPersons: 0,
            nbVeganPersons: 0,
            whenSaturdayMorning: false,
            whenSaturdayLunch: false,
            whenSundayLunch: false,
            comment: '',
            displayForm: true,
            notificationVisible: false,
            notificationMessage: ''
        };
    }

    startLoading() {
        this.setState({loading: true});
    }

    stopLoading() {
        this.setState({loading: false});
    }

    /* tslint:disable */
    handleChangeForm(event: any) {
        const change = {};
        change[event.target.name] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState(change);
    }

    /* tslint:enable */

    createAnswer(event: React.SyntheticEvent<HTMLButtonElement>) {
        this.startLoading();
        event.preventDefault();
        fetch('/api/presence', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                who: this.state.who,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                nbPersons: this.state.nbPersons,
                nbVeganPersons: this.state.nbVeganPersons,
                whenSaturdayMorning: this.state.whenSaturdayMorning,
                whenSaturdayLunch: this.state.whenSaturdayLunch,
                whenSundayLunch: this.state.whenSundayLunch,
                comment: this.state.comment
            })
        })
            .then(result => result.json())
            .then((result: { saved: boolean, message: string }) => {
                this.toggleNotification(result);
                this.stopLoading();
            })
            .catch(e => {
                console.warn(e);
                this.stopLoading();
            });
    }

    toggleNotification(result: { saved: boolean, message: string }): void {
        this.setState({
            displayForm: !result.saved,
            notificationVisible: true,
            notificationMessage: result.message
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="loader" style={this.loaderStyle}>
                    <div className="line-scale">
                        <div/>
                        <div/>
                        <div/>
                        <div/>
                        <div/>
                    </div>
                </div>
            );
        }
        return (
            <div className="base-div-content">
                <Card body={true}>
                    <CardTitle>Formulaire de présence</CardTitle>
                    {
                        this.state.displayForm ?
                            <Form>
                                <Row className="justify-content-start mt-2">
                                    <Col sm="4" xs="12">
                                        <Row className="justify-content-sm-end">
                                            <Label className="mt-2 pr-3" for="who">Qui ?</Label>
                                        </Row>
                                    </Col>
                                    <Col sm="4" xs="12">
                                        <Row className="justify-content-sm-start">
                                            <Input
                                                type="text"
                                                name="who"
                                                id="who"
                                                value={this.state.who}
                                                onChange={this.handleChangeForm}
                                            />
                                        </Row>
                                    </Col>
                                </Row>

                                <Row className="justify-content-start mt-2">
                                    <Col sm="4" xs="12">
                                        <Row className="justify-content-sm-end">
                                            <Label className="mt-2 pr-3" for="phoneNumber">Téléphone</Label>
                                        </Row>
                                    </Col>
                                    <Col sm="4" xs="12">
                                        <Row className="justify-content-sm-start">
                                            <Input
                                                type="text"
                                                placeholder="0601020304"
                                                name="phoneNumber"
                                                id="phoneNumber"
                                                value={this.state.phoneNumber}
                                                onChange={this.handleChangeForm}
                                            />
                                        </Row>
                                    </Col>
                                </Row>

                                <Row className="justify-content-start mt-2">
                                    <Col sm="4" xs="12">
                                        <Row className="justify-content-sm-end">
                                            <Label className="mt-2 pr-3" for="email">Email</Label>
                                        </Row>
                                    </Col>
                                    <Col sm="4" xs="12">
                                        <Row className="justify-content-sm-start">
                                            <Input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={this.state.email}
                                                onChange={this.handleChangeForm}
                                            />
                                        </Row>
                                    </Col>
                                </Row>

                                <hr/>

                                <Row className="justify-content-start mt-2">
                                    <Col sm="4" xs="12">
                                        <Row className="justify-content-sm-end">
                                            <Label className="mt-2 pr-3" for="nbPersons">Combien ?</Label>
                                        </Row>
                                    </Col>
                                    <Col sm="2" xs="12">
                                        <Row className="justify-content-sm-start">
                                            <Input
                                                type="number"
                                                name="nbPersons"
                                                id="nbPersons"
                                                min="0"
                                                value={this.state.nbPersons}
                                                onChange={this.handleChangeForm}
                                            />
                                        </Row>
                                    </Col>
                                    <Col sm="2" xs="12">
                                        <Row className="justify-content-sm-start">
                                            <Label className="mt-2 pl-3" for="nbPersons2">personnes</Label>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row className="justify-content-start mt-2">
                                    <Col sm="4" xs="12">
                                        <Row className="justify-content-sm-end">
                                            <Label className="mt-2 pr-3" for="nbVeganPersons">Dont</Label>
                                        </Row>
                                    </Col>
                                    <Col sm="2" xs="12">
                                        <Row className="justify-content-sm-start">
                                            <Input
                                                type="number"
                                                name="nbVeganPersons"
                                                id="nbVeganPersons"
                                                max={this.state.nbPersons}
                                                min="0"
                                                value={this.state.nbVeganPersons}
                                                onChange={this.handleChangeForm}
                                            />
                                        </Row>
                                    </Col>
                                    <Col sm="2" xs="12">
                                        <Row className="justify-content-sm-start">
                                            <Label className="mt-2 pl-3" for="nbVeganPersons2">végétarien.ne.s</Label>
                                        </Row>
                                    </Col>
                                </Row>

                                <hr/>

                                <Row className="justify-content-start mt-2">
                                    <Col sm="4" xs="12">
                                        <Row className="justify-content-sm-end">
                                            <Label className="mt-2 pr-3" for="when">Quand ?</Label>
                                        </Row>
                                    </Col>
                                    <Col sm="6" xs="12" className="input-row">
                                        <Row className="justify-content-sm-start">
                                            <Input
                                                name="whenSaturdayMorning"
                                                id="whenSaturdayMorning"
                                                type="checkbox"
                                                checked={this.state.whenSaturdayMorning}
                                                onChange={this.handleChangeForm}
                                            />
                                            {' '}Samedi 10h30 Mairie
                                        </Row>
                                        <Row className="justify-content-sm-start">
                                            <Input
                                                type="checkbox"
                                                name="whenSaturdayLunch"
                                                id="whenSaturdayLunch"
                                                checked={this.state.whenSaturdayLunch}
                                                onChange={this.handleChangeForm}
                                            />
                                            {' '}Samedi 12h30
                                        </Row>
                                        <Row className="justify-content-sm-start">
                                            <Input
                                                type="checkbox"
                                                name="whenSundayLunch"
                                                id="whenSundayLunch"
                                                checked={this.state.whenSundayLunch}
                                                onChange={this.handleChangeForm}
                                            />
                                            {' '}Dimanche 13h
                                        </Row>
                                    </Col>
                                </Row>

                                <hr/>

                                <Row className="justify-content-start mt-2">
                                    <Col sm="4" xs="12">
                                        <Row className="justify-content-sm-end">
                                            <Label className="mt-2 pr-3" for="comment">Commentaire</Label>
                                        </Row>
                                    </Col>
                                    <Col sm="4" xs="12">
                                        <Row className="justify-content-sm-start">
                                            <Input
                                                type="textarea"
                                                name="comment"
                                                id="comment"
                                                value={this.state.comment}
                                                onChange={this.handleChangeForm}
                                            />
                                        </Row>
                                    </Col>
                                </Row>

                                <Row className="mt-2 justify-content-center">
                                    <Col sm="2" xs="12">
                                        <Button color="primary" onClick={this.createAnswer}>
                                            Envoyer la réponse
                                        </Button>
                                    </Col>
                                </Row>
                            </Form> :
                            null
                    }

                    <Alert color="info" isOpen={this.state.notificationVisible}>
                        {this.state.notificationMessage}
                    </Alert>
                </Card>
            </div>
        );
    }
}