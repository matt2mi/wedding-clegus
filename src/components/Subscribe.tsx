import * as React from 'react';
import { withRouter } from 'react-router';
import Card from 'reactstrap/lib/Card';
import { Alert, Col, Form, Input, Row } from 'reactstrap';

interface Props {
}

interface State {
    readonly email: string;
    readonly loading: boolean;
    readonly displayFormAndValidateBtn: boolean;
    readonly notificationVisible: boolean;
    readonly notificationMessage: string;
    readonly notificationColor: string;
}

export default class Subscribe extends React.Component<Props, State> {
    goBackButton: React.ComponentClass;

    constructor(props: Props) {
        super(props);

        this.startLoading = this.startLoading.bind(this);
        this.stopLoading = this.stopLoading.bind(this);
        this.toggleNotification = this.toggleNotification.bind(this);
        this.handleChangeMail = this.handleChangeMail.bind(this);
        this.subscribe = this.subscribe.bind(this);

        this.goBackButton = withRouter(({history}) => (
            <button
                className="btn cancel-button"
                onClick={(e) => {
                    e.preventDefault();
                    history.push('/covoiturages');
                }}
            >
                Retour
            </button>
        ));

        this.state = {
            email: '',
            loading: false,
            displayFormAndValidateBtn: true,
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

    toggleNotification({saved, message}: { saved: boolean, message: string }, color: string): void {
        this.setState({
            displayFormAndValidateBtn: !saved,
            notificationVisible: true,
            notificationMessage: message,
            notificationColor: color
        });
    }

    /* tslint:disable */
    handleChangeMail(event: any) {
        this.setState({email: event.target.value});
        event.preventDefault();
    }

    /* tslint:enable */

    subscribe(event: React.SyntheticEvent<HTMLButtonElement>) {
        this.startLoading();
        event.preventDefault();
        fetch('/api/carSharingSubscribe', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: this.state.email})
        })
            .then(result => result.json())
            .then((result: { saved: boolean, message: string }) => {
                this.toggleNotification(result, result.saved ? 'success' : 'danger');
                this.stopLoading();
            })
            .catch(e => {
                this.toggleNotification(
                    {saved: false, message: 'Problème de sauvegarde, réessayez plus tard.'},
                    'danger'
                );
                console.warn(e);
                this.stopLoading();
            });
    }

    render() {
        return (
            <div className="base-div-content">
                <Row>
                    <Col sm="12">
                        <Card body={true} className="mt-3">
                            <div className="title">S'abonner</div>

                            {
                                this.state.displayFormAndValidateBtn ?
                                    <Form>
                                        <Row className="justify-content-center mt-2">
                                            Pour être au courant des nouvelles propositions de covoiturage,
                                            écris ton adresse mail ici et clique sur valider.
                                        </Row>
                                        <Row className="justify-content-center mt-2">
                                            <Col sm="10" lg="8">
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    placeholder="Email"
                                                    onChange={this.handleChangeMail}
                                                />
                                            </Col>
                                        </Row>
                                    </Form> :
                                    null
                            }

                            <hr/>

                            <Alert color={this.state.notificationColor} isOpen={this.state.notificationVisible}>
                                {this.state.notificationMessage}
                            </Alert>

                            <Row className="justify-content-center">
                                <Col sm="10" lg="8" className="text-center text-sm-right">
                                    <this.goBackButton/>
                                    {
                                        this.state.displayFormAndValidateBtn ?
                                            <button
                                                type="button"
                                                className="btn btn-info ml-3"
                                                onClick={this.subscribe}
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
                                                        'Valider'
                                                }
                                            </button> :
                                            null
                                    }
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}