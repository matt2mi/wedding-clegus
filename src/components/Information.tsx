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
                            <CardTitle>Samedi 22 septembre 2018</CardTitle>
                            <CardText>
                                10h30 – Mairie de Pouancé
                                12h30 – RDV à Saint-Saturnin-du-Limet pour une journée festive et une soirée endiablée.
                                > Adresse : Salle la Salsa, 1 la Rivière, 53800 Saint-Saturnin-du-Limet
                                Au programme :
                                - Apéro d'honneur
                                - Banquet convivial : Méchoui ou Plat Végétarien
                                - Pétanque, palets, mölky, papotte...
                                - Galettes party et dancefloor !
                            </CardText>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <Card body={true}>
                            <CardTitle>Dimanche 23 septembre</CardTitle>
                            <CardText>
                                - Pour les lève-tôt : petit-dej autonome (tout sera sur place !)
                                - 13h : Buffet participatif ! Plus d'infos dans la rubrique « Buffet participatif du
                                dimanche »
                            </CardText>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <Card body={true}>
                            <CardText>
                                - Possibilité de camper sur place (espace camping) sinon rendezvous dans la rubrique «
                                gîtes »
                                - N’oubliez pas vos jeux : palets, mölky, pétanque, jeu de tarot…
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}