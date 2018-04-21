import * as React from 'react';
import CardText from 'reactstrap/lib/CardText';
import CardTitle from 'reactstrap/lib/CardTitle';
import Card from 'reactstrap/lib/Card';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

export default class Contacts extends React.Component {
    private clegusSrc = require('../img/clegus_cartoon_melois.png');
    private mimiSrc = require('../img/mimi_cartoon.png');
    private toyoSrc = require('../img/toyo_cartoon.png');
    private popoSrc = require('../img/popo_cartoon.png');
    private quentinSrc = require('../img/quentin_cartoon.png');

    render() {
        return (
            <div className="base-div-content">
                <Row>
                    <Col sm="12">
                        <Card body={true}>
                            <CardTitle className="form-title">Contacts</CardTitle>
                            <hr/>
                            <Row>
                                <Col size={12} sm={2} md={3} xl={1}/>
                                <Col size={12} sm={8} md={6} xl={4} className="mb-3">
                                    <img
                                        className="img-fluid"
                                        src={this.clegusSrc}
                                        alt="mimi"
                                    />
                                </Col>
                                <Col size={0} xl={1}/>
                                <Col size={12} xl={6} className="mb-3">
                                    <br/>
                                    <CardTitle className="form-title">Clémence et Augustin</CardTitle>
                                    <CardText>
                                        17 boulevard de la Prairie au Duc
                                        <br/>
                                        44200 NANTES
                                    </CardText>
                                    <CardText>
                                        Clé : 06 65 29 83 19 - clemenceesnault@laposte.net
                                    </CardText>
                                    <CardText>
                                        Gus : 06 58 98 27 59 - augustin.bannier@hotmail.fr
                                    </CardText>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col sm="12" className="mb-3">
                                    <Row>
                                        <Col xs={12}>
                                            <CardTitle className="form-title">Contact témoin</CardTitle>
                                            <CardText>
                                                Mylène Robert : 07 86 76 20 19 - robertmylene@hotmail.fr
                                            </CardText>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                        <Col xs={4} sm={2}>
                                            <img
                                                className="img-fluid"
                                                src={this.mimiSrc}
                                                alt="mimi"
                                            />
                                        </Col>
                                        <Col xs={4} sm={2}>
                                            <img
                                                className="img-fluid"
                                                src={this.toyoSrc}
                                                alt="mimi"
                                            />
                                        </Col>
                                        <Col xs={4} sm={2}>
                                            <img
                                                className="img-fluid"
                                                src={this.popoSrc}
                                                alt="mimi"
                                            />
                                        </Col>
                                        <Col xs={4} sm={2}>
                                            <img
                                                className="img-fluid"
                                                src={this.quentinSrc}
                                                alt="mimi"
                                            />
                                        </Col>
                                        <Col xs={4} sm={2}>
                                            <img
                                                className="img-fluid"
                                                src={this.quentinSrc}
                                                alt="mimi"
                                            />
                                        </Col>
                                        <Col xs={4} sm={2}>
                                            <img
                                                className="img-fluid"
                                                src={this.quentinSrc}
                                                alt="mimi"
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}