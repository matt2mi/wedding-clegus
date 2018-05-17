import * as React from 'react';
import CardText from 'reactstrap/lib/CardText';
import Card from 'reactstrap/lib/Card';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

export default class Invitation extends React.Component {
    invitation1 = require('../img/faire-part-1.png');
    invitation2 = require('../img/faire-part-2.png');

    render() {
        return (
            <div className="base-div-content">
                <Row>
                    <Col sm="12">
                        <Card body={true} className="mt-3">
                            <div className="title">Faire Part</div>
                            <CardText>
                                <Row className="justify-content-center">
                                    <Col sm="12" className="mt-3">
                                        Et un très grand merci aux Mat(t)hieu pour le design ! Le beau-frère pour le
                                        faire-part,
                                        le pote pour ce site <i className="far fa-smile" aria-hidden="true"/> !
                                    </Col>
                                    <Col sm="12" className="mt-3">
                                        <img
                                            className="img-fluid"
                                            src={this.invitation1}
                                            alt="welcome"
                                        />
                                    </Col>
                                    <Col sm="12" className="mt-3">
                                        <img
                                            className="img-fluid"
                                            src={this.invitation2}
                                            alt="welcome"
                                        />
                                    </Col>
                                </Row>
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}