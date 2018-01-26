import * as React from 'react';
import CardTitle from 'reactstrap/lib/CardTitle';
import Card from 'reactstrap/lib/Card';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';
import Form from 'reactstrap/lib/Form';
import { Journey } from '../helpers/interfaces';
import Button from 'reactstrap/lib/Button';

interface Props {
    match: { params: { id?: number } };
}

interface State {
    readonly createMode: boolean;
    readonly id: number | null;
    readonly name: string;
    readonly fromCity: string;
    readonly toCity: string;
    readonly freeSeats: number;
    readonly totalSeats: number;
    readonly price: number;
    readonly driverPhoneNumber: string;
}

export default class JourneyDetails extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.handleChangeForm = this.handleChangeForm.bind(this);
        this.createJourney = this.createJourney.bind(this);
        this.updateJourney = this.updateJourney.bind(this);

        this.state = {
            createMode: true,
            id: null,
            name: '',
            fromCity: '',
            toCity: '',
            freeSeats: 0,
            totalSeats: 0,
            price: 0,
            driverPhoneNumber: ''
        };

        if (this.props.match.params.id) {
            fetch('/api/journey/' + this.props.match.params.id)
                .then(result => result.json())
                .then((journey: Journey) => {
                    this.setState({
                        id: journey.id,
                        name: journey.name,
                        fromCity: journey.fromCity,
                        toCity: journey.toCity,
                        freeSeats: journey.freeSeats,
                        totalSeats: journey.totalSeats,
                        price: journey.price,
                        driverPhoneNumber: journey.driverPhoneNumber
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

    createJourney(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault();
        this.createOrUpdateJourney('post', (result: Object) => console.warn(result));
    }

    updateJourney(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault();
        this.createOrUpdateJourney('put', (result: Object) => console.warn(result));
    }

    render() {
        return (
            <div>
                <Card body={true}>
                    <CardTitle>JourneyDetails Page</CardTitle>

                    <Form>
                        <Row className="justify-content-center">
                            <Col sm="3">
                                <Row className="justify-content-end mt-2">
                                    <Label className="mt-2" for="name">Départ</Label>
                                </Row>
                                <Row className="justify-content-end mt-2">
                                    <Label className="mt-2" for="name">Arrivée</Label>
                                </Row>
                                <Row className="justify-content-end mt-2">
                                    <Label className="mt-2" for="name">Sièges libres</Label>
                                </Row>
                                <Row className="justify-content-end mt-2">
                                    <Label className="mt-2" for="name">Sièges totaux</Label>
                                </Row>
                                <Row className="justify-content-end mt-2">
                                    <Label className="mt-2" for="name">Prix</Label>
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
                                        name="fromCity"
                                        id="fromCity"
                                        value={this.state.fromCity}
                                        onChange={(e) => this.handleChangeForm(e, 'fromCity')}
                                    />
                                </Row>
                                <Row className="justify-content-start mt-2">
                                    <Input
                                        type="text"
                                        name="toCity"
                                        id="toCity"
                                        value={this.state.toCity}
                                        onChange={(e) => this.handleChangeForm(e, 'toCity')}
                                    />
                                </Row>
                                <Row className="justify-content-start mt-2">
                                    <Input
                                        type="number"
                                        className="col-sm-3"
                                        name="freeSeats"
                                        id="freeSeats"
                                        value={this.state.freeSeats + ''}
                                        onChange={(e) => this.handleChangeForm(e, 'freeSeats')}
                                    />
                                </Row>
                                <Row className="justify-content-start mt-2">
                                    <Input
                                        type="number"
                                        className="col-sm-3"
                                        name="totalSeats"
                                        id="totalSeats"
                                        value={this.state.totalSeats + ''}
                                        onChange={(e) => this.handleChangeForm(e, 'totalSeats')}
                                    />
                                </Row>
                                <Row className="justify-content-start mt-2">
                                    <Input
                                        type="number"
                                        className="col-sm-4"
                                        name="price"
                                        id="price"
                                        value={this.state.price + ''}
                                        onChange={(e) => this.handleChangeForm(e, 'price')}
                                    />
                                    €
                                </Row>
                                <Row className="justify-content-start mt-2">
                                    <Input
                                        type="text"
                                        className="col-sm-8"
                                        name="driverPhoneNumber"
                                        id="driverPhoneNumber"
                                        value={this.state.driverPhoneNumber + ''}
                                        onChange={(e) => this.handleChangeForm(e, 'driverPhoneNumber')}
                                    />
                                </Row>
                            </Col>
                        </Row>
                        <Row className="justify-content-end mt-2">
                            <Col sm="2"><a href="#/covoiturages">Cancel</a></Col>
                            <Col sm="2">
                                {
                                    this.state.createMode ?
                                        <Button color="primary" onClick={(e) => this.createJourney(e)}>Créer</Button> :
                                        <Button color="primary" onClick={(e) => this.updateJourney(e)}>MAJ</Button>
                                }
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
        );
    }

    private createOrUpdateJourney(method: string, cb: (result: Object) => void) {
        fetch('/api/journey', {
            method: method,
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.fromCity + ' - ' + this.state.toCity,
                fromCity: this.state.fromCity,
                toCity: this.state.toCity,
                freeSeats: this.state.freeSeats,
                totalSeats: this.state.totalSeats,
                price: this.state.price,
                driverPhoneNumber: this.state.driverPhoneNumber
            })
        })
            .then(result => result.json())
            .then((result: Object) => cb(result))
            .catch(e => console.warn(e));
    }
}