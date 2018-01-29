import * as React from 'react';
import { Alert, Button, Form, Input, Label } from 'reactstrap';
import Card from 'reactstrap/lib/Card';
import CardTitle from 'reactstrap/lib/CardTitle';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

interface Props {
}

interface State {
    readonly name: string;
    readonly firstname: string;
    readonly nbPersons: number;
    readonly nbVeganPersons: number;
    readonly phoneNumber: string;
    readonly email: string;
    readonly comment: string;
    readonly displayForm: boolean;
    readonly notificationVisible: boolean;
    readonly notificationMessage: string;
}

export default class InvitationResponse extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.createAnswer = this.createAnswer.bind(this);
        this.toggleNotification = this.toggleNotification.bind(this);

        this.state = {
            name: '',
            firstname: '',
            nbPersons: 0,
            nbVeganPersons: 0,
            phoneNumber: '',
            email: '',
            comment: '',
            displayForm: true,
            notificationVisible: false,
            notificationMessage: ''
        };
    }

    /* tslint:disable */
    handleChangeForm(event: any, fieldName: string) {
        event.preventDefault();
        const change = {};
        change[fieldName] = event.target.value;
        this.setState(change);
    }

    /* tslint:enable */

    createAnswer(event: React.SyntheticEvent<HTMLButtonElement>) {
        event.preventDefault();
        fetch('/api/presence', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                firstname: this.state.firstname,
                nbPersons: this.state.nbPersons,
                nbVeganPersons: this.state.nbVeganPersons,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                comment: this.state.comment
            })
        })
            .then(result => result.json())
            .then((result: { saved: boolean, message: string }) => {
                console.warn(result);
                this.toggleNotification(result);
            })
            .catch(e => console.warn(e));
    }

    toggleNotification(result: { saved: boolean, message: string }): void {
        this.setState({
            displayForm: !result.saved,
            notificationVisible: true,
            notificationMessage: result.message
        });
    }

    render() {
        return (
            <div>
                <Card body={true}>
                    <CardTitle>Formulaire de présence</CardTitle>
                    {
                        this.state.displayForm ?
                            <Form>
                                <Row className="justify-content-start mt-2">
                                    <Col sm="4" xs="12">
                                        <Row className="justify-content-sm-end">
                                            <Label className="mt-2 pr-3" for="firstname">Prénom</Label>
                                        </Row>
                                    </Col>
                                    <Col sm="4" xs="12">
                                        <Row className="justify-content-sm-start">
                                            <Input
                                                type="text"
                                                name="firstname"
                                                id="firstname"
                                                value={this.state.firstname}
                                                onChange={(e) => this.handleChangeForm(e, 'firstname')}
                                            />
                                        </Row>
                                    </Col>
                                </Row>

                                <Row className="justify-content-start mt-2">
                                    <Col sm="4" xs="12">
                                        <Row className="justify-content-sm-end">
                                            <Label className="mt-2 pr-3" for="name">Nom</Label>
                                        </Row>
                                    </Col>
                                    <Col sm="4" xs="12">
                                        <Row className="justify-content-sm-start">
                                            <Input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={this.state.name}
                                                onChange={(e) => this.handleChangeForm(e, 'name')}
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
                                                name="phoneNumber"
                                                id="phoneNumber"
                                                value={this.state.phoneNumber}
                                                onChange={(e) => this.handleChangeForm(e, 'phoneNumber')}
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
                                                onChange={(e) => this.handleChangeForm(e, 'email')}
                                            />
                                        </Row>
                                    </Col>
                                </Row>

                                <Row className="justify-content-start mt-2">
                                    <Col sm="4" xs="12">
                                        <Row className="justify-content-sm-end">
                                            <Label className="mt-2 pr-3" for="nbPersons">Nous serons</Label>
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
                                                onChange={(e) => this.handleChangeForm(e, 'nbPersons')}
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
                                                onChange={(e) => this.handleChangeForm(e, 'nbVeganPersons')}
                                            />
                                        </Row>
                                    </Col>
                                    <Col sm="2" xs="12">
                                        <Row className="justify-content-sm-start">
                                            <Label className="mt-2 pl-3" for="nbVeganPersons2">végétariennes</Label>
                                        </Row>
                                    </Col>
                                </Row>

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
                                                onChange={(e) => this.handleChangeForm(e, 'comment')}
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