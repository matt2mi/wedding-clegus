import * as React from 'react';
import CardText from 'reactstrap/lib/CardText';
import CardTitle from 'reactstrap/lib/CardTitle';
import Card from 'reactstrap/lib/Card';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

export default class Contacts extends React.Component {
    render() {
        return (
            <div className="base-div-content">
                <Row>
                    <Col sm="12">
                        <Card body={true}>
                            <CardTitle>Contacts</CardTitle>
                            <Row className="justify-content-around">
                                <Col sm="12" className="mb-3">
                                    <br/>
                                    <CardTitle>Clémence et Augustin</CardTitle>
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
                                <Col sm="12" className="mb-3">
                                    <br/>
                                    <CardTitle>Témoin: Mylène Robert</CardTitle>
                                        <CardText>
                                            135 Rue de montreuil
                                            <br/>
                                            75011 Paris
                                        </CardText>
                                        <CardText>
                                            07 86 76 20 19 - robertmylene@hotmail.fr
                                        </CardText>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}