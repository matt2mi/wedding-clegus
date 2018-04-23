import * as React from 'react';
import Card from 'reactstrap/lib/Card';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

export default class Information extends React.Component {
    iframeSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10497.842142785452!2d-1.0908203200475128!3d47.80846151587039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4808c132686195fb%3A0x90d7806142b72cc6!2sLa+Salsa!5e0!3m2!1sfr!2sfr!4v1524419529381';
    campingGif = require('../img/camping.gif');

    render() {
        return (
            <div className="base-div-content">
                <Row>
                    <Col sm="12">
                        <Card body={true} className="m-3">
                            <Row className="text-left">
                                <Col sm="6">
                                    <div className="title">Samedi 22 septembre 2018</div>
                                    <div>
                                        <span className="subtitle">10h30 :</span> Mairie de Pouancé
                                        <br/>
                                        <span className="subtitle">12h30 :</span> RDV à la salle Salsa (voir dessous)
                                        pour l'apéro d'honneur
                                        <br/>
                                        <span className="subtitle">13h :</span> Banquet convivial : Méchoui ou Plat
                                        Végétarien
                                        <br/>
                                        <span className="subtitle">Après-midi :</span> Pétanque, palets, mölky,
                                        papotte...
                                        <br/>
                                        <span className="subtitle">19h :</span> Galettes party et dancefloor !
                                    </div>
                                    <div className="d-sm-none">
                                        <hr/>
                                    </div>
                                </Col>

                                <Col sm="6">
                                    <div className="title">Dimanche 23 septembre 2018</div>
                                    <div>
                                        <span className="subtitle">Pour les lève-tôt :</span> petit-dej autonome (tout
                                        sera sur place !)
                                        <br/>
                                        <span className="subtitle">13h :</span> Buffet participatif ! Plus d'infos dans
                                        la rubrique « <a href="#/buffet">Buffet participatif du dimanche</a> »
                                    </div>
                                </Col>
                            </Row>

                            <hr/>

                            <Row className="justify-content-center">
                                <div className="col-6 col-sm-3">
                                    <img width="100%" src={this.campingGif}/>
                                </div>
                                <div className="col-12 col-sm-8">
                                    <div>
                                        Possibilité de camper sur place (espace camping)
                                        <br/>
                                        Ou de louer un gîte, dans la rubrique « <a href="#/gites">Gîtes</a> »
                                        <br/>
                                        <span className="title">
                                            N’oubliez pas vos jeux : palets, mölky, pétanque, jeu de tarot…
                                        </span>
                                    </div>
                                </div>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <Card body={true} className="m-3">
                            <Col className="m-2" sm={12}>
                                <Row className="justify-content-center">
                                    Salle la Salsa, 1 la Rivière, 53800 Saint-Saturnin-du-Limet
                                </Row>
                                <Row className="justify-content-center">
                                    <iframe
                                        src={this.iframeSrc}
                                        width="600"
                                        height="450"
                                        frameBorder="0"
                                        style={{border: 0}}
                                        allowFullScreen={true}
                                    />
                                </Row>
                            </Col>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}