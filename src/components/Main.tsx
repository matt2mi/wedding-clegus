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
                                <div className="borden">
                                    <br/>
                                    Vous avez ici toutes les informations dont vous aurez besoin pour le weekend.
                                    <br/>
                                    <br/>
                                    Vous pourrez y trouver un chauffeur, de quoi vous guider jusqu'à la salle, tout
                                    savoir niveau timing, ainsi que bien sûr, nos coordonnées et celles de nos témoins
                                    si nécessaire !
                                    <br/>
                                    <br/>
                                    Si vous fouinez dans les différentes rubriques, vous pourrez même téléchargez notre
                                    faire-part si ça vous dit !
                                </div>
                            </Col>
                        </Row>

                        <br/>

                        <Row className="justify-content-center">
                            <div className="col-2 col-sm-2">
                                <div className="borden">
                                    <img
                                        className="img-fluid"
                                        src={require('../img/warning.gif')}
                                        alt="warning"
                                    />
                                </div>
                            </div>

                            <div className="col-8 borden">
                                <a href="#/presence">N'oubliez pas de confirmer votre présence ici !</a>
                            </div>

                            <div className="col-2 col-sm-2">
                                <div className="borden">
                                    <img
                                        className="img-fluid"
                                        src={require('../img/warning.gif')}
                                        alt="warning"
                                    />
                                </div>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}