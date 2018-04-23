import * as React from 'react';
import CardText from 'reactstrap/lib/CardText';
import CardTitle from 'reactstrap/lib/CardTitle';
import Card from 'reactstrap/lib/Card';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

export default class Contacts extends React.Component {
    private witnesses = [
        {src: require('../img/mimi-cartoon-small.png'), name: 'Mylène'},
        {src: require('../img/popo-small.png'), name: 'Pauline'},
        {src: require('../img/toyo-cartoon-small.png'), name: 'Antoine'},
        {src: require('../img/toyo-small.png'), name: 'Antoine'},
        {src: require('../img/guillaume-small.png'), name: 'Guillaume'},
        {src: require('../img/maxime-small.png'), name: 'Maxime'},
        {src: require('../img/quentin-small.png'), name: 'Quentin'},
    ];
    private cleSrc = require('../img/cle-evjf-cartoon.png');
    private gusSrc = require('../img/gus-evg-small.png');

    render() {
        return (
            <div className="base-div-content">
                <Row>
                    <Col sm="12">
                        <Card body={true} className="mt-3">
                            <CardTitle className="form-title">Contacts</CardTitle>
                            <hr/>
                            <Row className="justify-content-around">
                                <Col sm={3}>
                                    <img
                                        className="img-fluid"
                                        src={this.cleSrc}
                                        alt="mimi"
                                    />
                                </Col>

                                <Col sm={3}>
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

                                <Col sm={3}>
                                    <img
                                        className="img-fluid"
                                        src={this.gusSrc}
                                        alt="mimi"
                                    />
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
                                    <Row className="justify-content-around">
                                        {
                                            this.witnesses.map(witness => (
                                                <Col xs={4} sm={2} className="mb-2 mb-sm-0">
                                                    <img
                                                        className="img-fluid"
                                                        src={witness.src}
                                                        alt={witness.name}
                                                    />
                                                    {witness.name}
                                                </Col>
                                            ))
                                        }
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