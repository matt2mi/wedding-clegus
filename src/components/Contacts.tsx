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
                                <Col sm="12" md="6" className="mb-3">
                                    <Card body={true}>
                                        <CardTitle>Clémence Esnault</CardTitle>
                                        <CardText>
                                            <i className="fa fa-2 fa-mobile" aria-hidden="true"/> : 0606060606
                                        </CardText>
                                        <CardText>
                                            <i className="fa fa-2 fa-envelope-o" aria-hidden="true"/> :
                                            clemence.tcho@aol.fr
                                        </CardText>
                                        <CardText>
                                            <i className="fa fa-2 fa-home" aria-hidden="true"/> :
                                            43 boulevard des Ducs de nantes - 44100 Nantes
                                        </CardText>
                                    </Card>
                                </Col>
                                <Col sm="12" md="6" className="mb-3">
                                    <Card body={true}>
                                        <CardTitle>Augustin Bannier</CardTitle>
                                        <CardText>
                                            <i className="fa fa-2 fa-mobile" aria-hidden="true"/> : 0707070707
                                        </CardText>
                                        <CardText>
                                            <i className="fa fa-2 fa-envelope-o" aria-hidden="true"/> :
                                            gugus.gobelin@vieuxgeek.fr
                                        </CardText>
                                        <CardText>
                                            <i className="fa fa-2 fa-home" aria-hidden="true"/> :
                                            43 boulevard des Ducs de nantes - 44100 Nantes
                                        </CardText>
                                    </Card>
                                </Col>
                                <Col sm="12" md="6" className="mb-3">
                                    <Card body={true}>
                                        <CardTitle>Mimi Rombière</CardTitle>
                                        <CardText>
                                            <i className="fa fa-2 fa-mobile" aria-hidden="true"/> : 0909090909
                                        </CardText>
                                        <CardText>
                                            <i className="fa fa-2 fa-envelope-o" aria-hidden="true"/> :
                                            vive_la_vie_13@hippieland.fr
                                        </CardText>
                                        <CardText>
                                            <i className="fa fa-2 fa-home" aria-hidden="true"/> :
                                            43 boulevard des Ducs de nantes - 44100 Nantes
                                        </CardText>
                                    </Card>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}