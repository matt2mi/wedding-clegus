import * as React from 'react';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

export default class Main extends React.Component {
    seMarient = require('../img/se-marient.png');
    welcome = require('../img/bienvenu.e.s.png');

    render() {
        return (
            <div className="base-div-content mb-4">
                <Row className="justify-content-center">
                    <Col sm="6" className="mt-3">
                        <img
                            className="img-fluid"
                            src={this.welcome}
                            alt="welcome"
                        />
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col sm="12" lg="6" className="mt-3">
                        <img
                            className="img-fluid"
                            src={this.seMarient}
                            alt="seMarient"
                        />
                    </Col>

                    <Col sm="12" lg="6" className="mt-3">
                        <Row className="justify-content-center">
                            <Col sm="12">
                                <div className="mt-lg-5">
                                    <br/>
                                    Vous avez ici toutes les informations dont vous aurez besoin pour le weekend.
                                    <br/>
                                    <br/>
                                    Vous pourrez <a href="#/covoiturages">chercher des covoitureurs</a>, savoir où se
                                    trouve la salle, découvrir <a href="#/infos">le déroulement</a> du weekend, ainsi
                                    que bien sûr, <a href="#/contacts">nos coordonnées</a> et celles de nos témoins
                                    si nécessaire !
                                    <br/>
                                    <br/>
                                    Vous pourrez même <a href="#/faire-part">téléchargez notre faire-part</a> si ça vous
                                    dit !
                                    <br/>
                                    <br/>
                                    <span className="title">
                                        =>  Et n'oubliez pas de confirmer <a href="#/presence">votre présence ici !</a>
                                        {' <='}
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}