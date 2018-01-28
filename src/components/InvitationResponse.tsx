import * as React from 'react';
import CardTitle from 'reactstrap/lib/CardTitle';
import Card from 'reactstrap/lib/Card';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { Alert, Button, Form, Input, Label } from 'reactstrap';

interface Props {
}

interface State {
    readonly name: string;
    readonly firstname: string;
    readonly nbPersons: number;
    readonly phoneNumber: string;
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
            phoneNumber: '',
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
                phoneNumber: this.state.phoneNumber
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
                        this.state.displayForm ? <Form>
                                <Row className="justify-content-center">
                                    <Col sm="2" className="text-right">
                                        <Label for="name">Nom</Label>
                                    </Col>
                                    <Col sm="4">
                                        <Input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={this.state.name}
                                            onChange={(e) => this.handleChangeForm(e, 'name')}
                                        />
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col sm="2" className="text-right">
                                        <Label for="firstname">Prénom</Label>
                                    </Col>
                                    <Col sm="4">
                                        <Input
                                            type="text"
                                            name="firstname"
                                            id="firstname"
                                            value={this.state.firstname}
                                            onChange={(e) => this.handleChangeForm(e, 'firstname')}
                                        />
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col sm="2" className="text-right">
                                        <Label for="nbPersons">Nous serons</Label>
                                    </Col>
                                    <Col sm="2">
                                        <Input
                                            type="number"
                                            name="nbPersons"
                                            id="nbPersons"
                                            value={this.state.nbPersons}
                                            onChange={(e) => this.handleChangeForm(e, 'nbPersons')}
                                        />
                                    </Col>
                                    <Col sm="2">personnes</Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col sm="2" className="text-right">
                                        <Label for="phoneNumber">Numéro</Label>
                                    </Col>
                                    <Col sm="4">
                                        <Input
                                            type="text"
                                            className="col-sm-8"
                                            name="phoneNumber"
                                            id="phoneNumber"
                                            value={this.state.phoneNumber + ''}
                                            onChange={(e) => this.handleChangeForm(e, 'phoneNumber')}
                                        />
                                    </Col>
                                </Row>
                                <Row className="justify-content-end mt-2">
                                    <Col sm="2">
                                        <Button color="primary" onClick={this.createAnswer}>
                                            Envoyer la réponse
                                        </Button>
                                    </Col>
                                    <Col sm="1"/>
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