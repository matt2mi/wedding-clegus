import * as React from 'react';
import Card from 'reactstrap/lib/Card';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

export default class Contacts extends React.Component {
    private witnesses = [
        {src: require('../img/mimi-cartoon-small.png'), name: 'Mylène'},
        {src: require('../img/popo-small.png'), name: 'Pauline'},
        {src: require('../img/toyo-small.png'), name: 'Antoine'},
        {src: require('../img/guillaume-small.png'), name: 'Guillaume'},
        {src: require('../img/maxime-small.png'), name: 'Maxime'},
        {src: require('../img/quentin-small.png'), name: 'Quentin'},
    ];
    private cleGusSrc = require('../img/new-cle-gus-contact.png');

    render() {
        return (
            <div className="base-div-content">
                <Row>
                    <Col sm="12">
                        <Card body={true} className="mt-3">
                            <div className="title">Contacts</div>
                            <hr/>
                            <Row className="justify-content-center">
                                <Col sm={12} md={9} lg={6} className="mb-3">
                                    <img
                                        className="img-fluid"
                                        src={this.cleGusSrc}
                                        alt="cleGusSrc"
                                    />
                                </Col>

                                <Col sm={12} lg={4}>
                                    <div className="subtitle">Clémence et Augustin</div>
                                    <div>
                                        17 boulevard de la Prairie au Duc
                                        <br/>
                                        44200 NANTES
                                    </div>
                                    <br/>
                                    <div>
                                        Clé : 06 65 29 83 19 - clemenceesnault@laposte.net
                                    </div>
                                    <br/>
                                    <div>
                                        Gus : 06 58 98 27 59 - augustin.bannier@hotmail.fr
                                    </div>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col sm="12" className="mb-3">
                                    <Row>
                                        <Col xs={12}>
                                            <div className="subtitle">Contact témoin</div>
                                            <div>
                                                Mylène Robert : 07 86 76 20 19 - robertmylene@hotmail.fr
                                            </div>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row className="justify-content-around">
                                        {
                                            this.witnesses.map((witness, id) => (
                                                <Col xs={4} sm={2} className="mb-2 mb-sm-0" key={id}>
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