import * as React from 'react';
import { Alert, Collapse, Form, Input, Label } from 'reactstrap';
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
    readonly notificationColor: string;
}

export default class PresenceForm extends React.Component<Props, State> {
    sundayFoodMsg = `Ecrivez ici ce que vous comptez amener 
(ex : une tarte, un cake, une salade ou un fromage…)`;

    constructor(props: Props) {
        super(props);

        this.handleChangeForm = this.handleChangeForm.bind(this);
        this.onClickCheckboxLine = this.onClickCheckboxLine.bind(this);
        this.createAnswer = this.createAnswer.bind(this);
        this.toggleNotification = this.toggleNotification.bind(this);
        this.startLoading = this.startLoading.bind(this);
        this.stopLoading = this.stopLoading.bind(this);
        this.cleanForm = this.cleanForm.bind(this);

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
            notificationMessage: '',
            notificationColor: ''
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

    onClickCheckboxLine(event: any) {
        const change = {};
        change[event.target.id] = !this.state[event.target.id];
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
                this.toggleNotification(result, 'success');
                this.stopLoading();
            })
            .catch(e => {
                console.warn(e);
                this.toggleNotification(
                    {saved: false, message: 'Problème de sauvegarde, réessayez plus tard.'},
                    'danger'
                );
                this.stopLoading();
            });
    }

    toggleNotification({saved, message}: { saved: boolean, message: string }, color: string): void {
        this.setState({
            displayForm: !saved,
            notificationVisible: true,
            notificationMessage: message,
            notificationColor: color,
        });
    }

    cleanForm() {
        this.setState({
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
            notificationMessage: '',
            notificationColor: ''
        });
    }

    render() {
        return (
            <div className="base-div-content">
                <Row>
                    <Col>
                        <Card body={true} className="mt-3">
                            <CardTitle className="text-left title">Formulaire de présence</CardTitle>

                            {

                                // TODO : vérification champs vides
                                this.state.displayForm ?
                                    <Form>
                                        <Row className="justify-content-center mt-2 subtitle">
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
                                                        placeholder="Adresse email"
                                                        value={this.state.email}
                                                        onChange={this.handleChangeForm}
                                                    />
                                                </Row>
                                            </Col>
                                        </Row>

                                        <hr/>

                                        <Row className="justify-content-center mt-2 subtitle">
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
                                                        min="0"
                                                        placeholder="0"
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
                                                        min="0"
                                                        placeholder="0"
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
                                                        min="0"
                                                        placeholder="0"
                                                        onChange={this.handleChangeForm}
                                                    />
                                                </Row>
                                            </Col>
                                        </Row>

                                        <hr/>

                                        <Row className="justify-content-center mt-2 subtitle">
                                            Quand ?
                                        </Row>
                                        <Row className="mt-2">
                                            <Col sm="12" className="text-left text-sm-center pl-4 pl-sm-2">
                                                <Input
                                                    name="whenSaturdayMorning"
                                                    id="whenSaturdayMorning"
                                                    type="checkbox"
                                                    className="pointer"
                                                    checked={this.state.whenSaturdayMorning}
                                                    onChange={this.handleChangeForm}
                                                />
                                                <span
                                                    id="whenSaturdayMorning"
                                                    className="pointer"
                                                    onClick={this.onClickCheckboxLine}
                                                >
                                                    Samedi 10h30 Mairie
                                                </span>
                                            </Col>
                                        </Row>
                                        <Row className="mt-2">
                                            <Col sm="12" className="text-left text-sm-center pl-4 pl-sm-2">
                                                <Input
                                                    type="checkbox"
                                                    name="whenSaturdayLunch"
                                                    id="whenSaturdayLunch"
                                                    className="pointer"
                                                    checked={this.state.whenSaturdayLunch}
                                                    onChange={this.handleChangeForm}
                                                />
                                                <span
                                                    id="whenSaturdayLunch"
                                                    className="pointer"
                                                    onClick={this.onClickCheckboxLine}
                                                >
                                                    Samedi 12h30 Banquet convivial
                                                </span>
                                            </Col>
                                        </Row>
                                        <Row className="mt-2">
                                            <Col sm="12" className="text-left text-sm-center pl-4 pl-sm-2">
                                                <Input
                                                    type="checkbox"
                                                    name="whenSaturdayDiner"
                                                    id="whenSaturdayDiner"
                                                    className="pointer"
                                                    checked={this.state.whenSaturdayDiner}
                                                    onChange={this.handleChangeForm}
                                                />
                                                <span
                                                    id="whenSaturdayDiner"
                                                    className="pointer"
                                                    onClick={this.onClickCheckboxLine}
                                                >
                                                    Samedi soir Galettes party
                                                </span>
                                            </Col>
                                        </Row>
                                        <Row className="mt-2">
                                            <Col sm="12" className="text-left text-sm-center pl-4 pl-sm-2">
                                                <Input
                                                    type="checkbox"
                                                    name="whenSundayLunch"
                                                    id="whenSundayLunch"
                                                    className="pointer"
                                                    checked={this.state.whenSundayLunch}
                                                    onChange={this.handleChangeForm}
                                                />
                                                <span
                                                    id="whenSundayLunch"
                                                    className="pointer"
                                                    onClick={this.onClickCheckboxLine}
                                                >
                                                    Dimanche 13h Buffet participatif
                                                </span>
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
                                                        placeholder="Autre chose à nous dire ?"
                                                        value={this.state.comment}
                                                        onChange={this.handleChangeForm}
                                                    />
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Form> :
                                    null
                            }

                            <hr/>

                            <Alert color={this.state.notificationColor} isOpen={this.state.notificationVisible}>
                                {this.state.notificationMessage}
                            </Alert>

                            {
                                !this.state.notificationVisible ?
                                    <Row className="justify-content-center mt-2">
                                        <Col sm="12">
                                            <button
                                                type="button"
                                                className="btn cancel-button"
                                                onClick={this.cleanForm}
                                            >
                                                Effacer les réponses
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-info ml-3"
                                                onClick={this.createAnswer}
                                            >
                                                {
                                                    this.state.loading ?
                                                        <div className="loader">
                                                            <div className="line-scale line-scale-white">
                                                                <div/>
                                                                <div/>
                                                                <div/>
                                                                <div/>
                                                                <div/>
                                                            </div>
                                                        </div> :
                                                        'Envoyer la réponse'
                                                }
                                            </button>
                                        </Col>
                                    </Row> :
                                    null
                            }
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}