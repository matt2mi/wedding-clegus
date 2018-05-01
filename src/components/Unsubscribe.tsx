import * as React from 'react';
import { Alert, Card, Col, Row } from 'reactstrap';

interface Props {
    match: { params: { key?: string } };
}

interface State {
    readonly loading: boolean;
    readonly notificationMessage: string;
    readonly notificationColor: string;
}

export default class Unsubscribe extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            loading: true,
            notificationMessage: '',
            notificationColor: ''
        };

        this.startLoading = this.startLoading.bind(this);
    }

    componentDidMount() {
        this.startLoading();
        if (this.props.match.params.key) {
            fetch('/api/carSharingUnsubscribe/' + this.props.match.params.key)
                .then(result => result.json())
                .then((result) => {
                    this.setState({
                        loading: false,
                        notificationMessage: result.message,
                        notificationColor: result.saved ? 'success' : 'danger'
                    });
                })
                .catch(e => {
                    this.setState({
                        loading: false,
                        notificationMessage: 'La désinscription n\'a pas fonctionnée, vous pouvez réessayer plus tard.',
                        notificationColor: 'danger'
                    });
                    console.error(e);
                });
        }
    }

    startLoading() {
        this.setState({loading: true});
    }

    render() {
        return (
            <div className="base-div-content">
                <Row>
                    <Col sm="12">
                        <Card body={true} className="mt-3">
                            <div className="title">S'abonner</div>

                            <hr/>

                            <Alert color={this.state.notificationColor}>{this.state.notificationMessage}</Alert>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}