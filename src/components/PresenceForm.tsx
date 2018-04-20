import * as React from 'react';
import { Alert, Button, Collapse, Form, Input, Label } from 'reactstrap';
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
    readonly nbPorkPersons: number;
    readonly nbVeganPersons: number;
    readonly whenSaturdayMorning: boolean;
    readonly whenSaturdayLunch: boolean;
    readonly whenSaturdayDiner: boolean;
    readonly whenSundayLunch: boolean;
    readonly commentSundayLunchInfo: string;
    readonly comment: string;
    readonly displayForm: boolean;
    readonly notificationVisible: boolean;
    readonly notificationMessage: string;
}

export default class InvitationResponse extends React.Component<Props, State> {
    loaderStyle = {
        marginTop: window.innerHeight / 2 + 'px'
    };
    sundayFoodMsg = `Ecrivez ici ce que vous comptez amener 
(ex : une tarte, un cake, une salade ou un fromage…)`;

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
            nbPorkPersons: 0,
            nbVeganPersons: 0,
            whenSaturdayMorning: false,
            whenSaturdayLunch: false,
            whenSaturdayDiner: false,
            whenSundayLunch: false,
            commentSundayLunchInfo: '',
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
                nbPorkPersons: this.state.nbPorkPersons,
                nbVeganPersons: this.state.nbVeganPersons,
                whenSaturdayMorning: this.state.whenSaturdayMorning,
                whenSaturdayLunch: this.state.whenSaturdayLunch,
                whenSaturdayDiner: this.state.whenSaturdayDiner,
                whenSundayLunch: this.state.whenSundayLunch,
                commentSundayLunchInfo: this.state.commentSundayLunchInfo,
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
                    <CardTitle className="text-left form-title">Formulaire de présence</CardTitle>
                    <hr/>
                    {
                        this.state.displayForm ?
                            <Form className="thin-font">
                                <Row className="justify-content-center mt-2 form-title">
                                    Qui ?
                                </Row>
                                <Row className="justify-content-start mt-2">
                                    <Col sm="3" xs="12"/>
                                    <Col sm="6" xs="12">
                                        <Row className="justify-content-sm-start">
                                            <Input
                                                type="text"
                                                name="who"
                                                id="who"
                                                className="thin-font"
                                                placeholder="Nom"
                                                value={this.state.who}
                                                onChange={this.handleChangeForm}
                                            />
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="justify-content-start mt-2">
                                    <Col sm="3" xs="12"/>
                                    <Col sm="6" xs="12">
                                        <Row className="justify-content-sm-start">
                                            <Input
                                                type="text"
                                                name="phoneNumber"
                                                id="phoneNumber"
                                                className="thin-font"
                                                placeholder="Téléphone"
                                                value={this.state.phoneNumber}
                                                onChange={this.handleChangeForm}
                                            />
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="justify-content-start mt-2">
                                    <Col sm="3" xs="12"/>
                                    <Col sm="6" xs="12">
                                        <Row className="justify-content-sm-start">
                                            <Input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="thin-font"
                                                placeholder="Adresse email"
                                                value={this.state.email}
                                                onChange={this.handleChangeForm}
                                            />
                                        </Row>
                                    </Col>
                                </Row>

                                <hr/>

                                <Row className="justify-content-center mt-2 form-title">
                                    Combien ?
                                </Row>
                                <Row className="justify-content-start mt-2">
                                    <Col sm="6" xs="12">
                                        <Row className="justify-content-sm-end">
                                            <Label className="mt-2 pr-3" for="nbPersons">
                                                Nombre de personnes
                                            </Label>
                                        </Row>
                                    </Col>
                                    <Col sm="2" xs="12">
                                        <Row className="justify-content-start">
                                            <Input
                                                type="number"
                                                name="nbPersons"
                                                id="nbPersons"
                                                className="thin-font"
                                                min="0"
                                                value={this.state.nbPersons}
                                                onChange={this.handleChangeForm}
                                            />
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="justify-content-start mt-2">
                                    <Col sm="6" xs="12">
                                        <Row className="justify-content-sm-end">
                                            <Label className="mt-2 pr-3" for="nbPorkPersons">
                                                Part.s de méchoui (porc)
                                            </Label>
                                        </Row>
                                    </Col>
                                    <Col sm="2" xs="12">
                                        <Row className="justify-content-start">
                                            <Input
                                                type="number"
                                                name="nbPorkPersons"
                                                id="nbPorkPersons"
                                                className="thin-font"
                                                min="0"
                                                value={this.state.nbPorkPersons}
                                                onChange={this.handleChangeForm}
                                            />
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="justify-content-start mt-2">
                                    <Col sm="6" xs="12">
                                        <Row className="justify-content-sm-end">
                                            <Label className="mt-2 pr-3" for="nbVeganPersons">
                                                Part.s végétarien.ne.s
                                            </Label>
                                        </Row>
                                    </Col>
                                    <Col sm="2" xs="12">
                                        <Row className="justify-content-start">
                                            <Input
                                                type="number"
                                                name="nbVeganPersons"
                                                id="nbVeganPersons"
                                                className="thin-font"
                                                min="0"
                                                value={this.state.nbVeganPersons}
                                                onChange={this.handleChangeForm}
                                            />
                                        </Row>
                                    </Col>
                                </Row>

                                <hr/>

                                <Row className="justify-content-center mt-2 form-title">
                                    Quand ?
                                </Row>
                                <Row className="mt-2">
                                    <Col sm="12" className="text-left text-sm-center pl-4 pl-sm-2">
                                        <Input
                                            name="whenSaturdayMorning"
                                            id="whenSaturdayMorning"
                                            type="checkbox"
                                            className="thin-font"
                                            checked={this.state.whenSaturdayMorning}
                                            onChange={this.handleChangeForm}
                                        />
                                        {' '}Samedi 10h30 Mairie
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col sm="12" className="text-left text-sm-center pl-4 pl-sm-2">
                                        <Input
                                            type="checkbox"
                                            name="whenSaturdayLunch"
                                            id="whenSaturdayLunch"
                                            className="thin-font"
                                            checked={this.state.whenSaturdayLunch}
                                            onChange={this.handleChangeForm}
                                        />
                                        {' '}Samedi 12h30 Banquet convivial
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col sm="12" className="text-left text-sm-center pl-4 pl-sm-2">
                                        <Input
                                            type="checkbox"
                                            name="whenSaturdayDiner"
                                            id="whenSaturdayDiner"
                                            className="thin-font"
                                            checked={this.state.whenSaturdayDiner}
                                            onChange={this.handleChangeForm}
                                        />
                                        {' '}Samedi 19h Galettes party
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col sm="12" className="text-left text-sm-center pl-4 pl-sm-2">
                                        <Input
                                            type="checkbox"
                                            name="whenSundayLunch"
                                            id="whenSundayLunch"
                                            className="thin-font"
                                            checked={this.state.whenSundayLunch}
                                            onChange={this.handleChangeForm}
                                        />
                                        {' '}Dimanche 13h Buffet participatif
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col sm="3"/>
                                    <Col sm="6" className="text-left text-sm-center pl-4 pl-sm-2">
                                        <Collapse isOpen={this.state.whenSundayLunch}>
                                            <Input
                                                type="textarea"
                                                name="commentSundayLunchInfo"
                                                id="commentSundayLunchInfo"
                                                className="thin-font"
                                                placeholder={this.sundayFoodMsg}
                                                value={this.state.commentSundayLunchInfo}
                                                onChange={this.handleChangeForm}
                                            />
                                        </Collapse>
                                    </Col>
                                </Row>

                                <hr/>

                                <Row className="justify-content-start mt-2">
                                    <Col sm="3" xs="12"/>
                                    <Col sm="6" xs="12">
                                        <Row className="justify-content-sm-start">
                                            <Input
                                                type="textarea"
                                                name="comment"
                                                id="comment"
                                                className="thin-font"
                                                placeholder="Autre chose à nous dire ?"
                                                value={this.state.comment}
                                                onChange={this.handleChangeForm}
                                            />
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center mt-2">
                                    <Col sm="12">
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