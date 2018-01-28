import * as React from 'react';
import CardTitle from 'reactstrap/lib/CardTitle';
import Card from 'reactstrap/lib/Card';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { Button, Form, Input, Label } from 'reactstrap';

interface Props {
}

interface State {
    readonly name: string;
    readonly firstname: string;
    readonly nbPersons: number;
    readonly phoneNumber: string;
}

export default class InvitationResponse extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.createAnswer = this.createAnswer.bind(this);

        this.state = {
            name: '',
            firstname: '',
            nbPersons: 0,
            phoneNumber: ''
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
        fetch('/api/answer', {
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
            .then(result => console.warn(result))
            .catch(e => console.warn(e));
    }

    render() {
        return (
            <div>
                <Card body={true}>
                    <CardTitle>Formulaire de présence</CardTitle>

                    <Form>
                        <Row className="justify-content-center">
                            <Col sm="3">
                                <Row className="justify-content-end mt-2">
                                    <Label className="mt-2" for="name">Nom</Label>
                                </Row>
                                <Row className="justify-content-end mt-2">
                                    <Label className="mt-2" for="name">Prénom</Label>
                                </Row>
                                <Row className="justify-content-end mt-2">
                                    <Label className="mt-2" for="name">Nous serons</Label>
                                </Row>
                                <Row className="justify-content-end mt-2">
                                    <Label className="mt-2" for="name">Numéro</Label>
                                </Row>
                            </Col>
                            <Col sm="1"/>
                            <Col sm="4">
                                <Row className="justify-content-start mt-2">
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={this.state.name}
                                        onChange={(e) => this.handleChangeForm(e, 'name')}
                                    />
                                </Row>
                                <Row className="justify-content-start mt-2">
                                    <Input
                                        type="text"
                                        name="firstname"
                                        id="firstname"
                                        value={this.state.firstname}
                                        onChange={(e) => this.handleChangeForm(e, 'firstname')}
                                    />
                                </Row>
                                <Row className="justify-content-start mt-2">
                                    <Input
                                        type="number"
                                        className="col-sm-2"
                                        name="nbPersons"
                                        id="nbPersons"
                                        value={this.state.nbPersons + ''}
                                        onChange={(e) => this.handleChangeForm(e, 'nbPersons')}
                                    />
                                    personne(s)
                                </Row>
                                <Row className="justify-content-start mt-2">
                                    <Input
                                        type="text"
                                        className="col-sm-8"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        value={this.state.phoneNumber + ''}
                                        onChange={(e) => this.handleChangeForm(e, 'phoneNumber')}
                                    />
                                </Row>
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
                    </Form>
                </Card>
            </div>
        );
    }
}