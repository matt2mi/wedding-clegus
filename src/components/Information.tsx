import * as React from 'react';
import CardText from 'reactstrap/lib/CardText';
import CardTitle from 'reactstrap/lib/CardTitle';
import Card from 'reactstrap/lib/Card';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

export default class Information extends React.Component {
    render() {
        return (
            <div className="base-div-content">
                <Row>
                    <Col sm="12">
                        <Card body={true}>
                            <CardTitle className="form-title">Samedi 22 septembre 2018</CardTitle>
                            <CardText>
                                10h30 – Mairie de Pouancé<br/>
                                12h30 – RDV à Saint-Saturnin-du-Limet pour une journée festive et une soirée endiablée.
                                <br/>
                                <i className="fa fa-2 fa-home" aria-hidden="true"/>
                                {' '}Salle la Salsa, 1 la Rivière, 53800 Saint-Saturnin-du-Limet<br/>
                                Au programme :<br/>
                                - Apéro d'honneur<br/>
                                - Banquet convivial : Méchoui ou Plat Végétarien<br/>
                                - Pétanque, palets, mölky, papotte...<br/>
                                - Galettes party et dancefloor !<br/>

                                <hr/>

                                - Pour les lève-tôt : petit-dej autonome (tout sera sur place !)<br/>
                                - 13h : Buffet participatif ! Plus d'infos dans la rubrique « Buffet participatif du
                                dimanche »

                                <hr/>

                                - Possibilité de camper sur place (espace camping) sinon rendez-vous dans la rubrique «
                                gîtes »<br/>
                                - N’oubliez pas vos jeux : palets, mölky, pétanque, jeu de tarot…
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}