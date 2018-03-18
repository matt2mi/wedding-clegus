import * as React from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle, Col, Row, } from 'reactstrap';

interface Props {
}

interface State {
}

const photo1 = require('../img/hostel1.jpg');
const photo2 = require('../img/hostel2.jpg');
const photo3 = require('../img/hostel3.jpg');
const rouardiere = require('../img/gite-rouardiere.jpg');
const items = [
    {
        src: photo1,
        captionText: '53800 St Saturnin du Limet',
        captionHeader: 'Appartements Le Hardas',
        href: 'https://www.gites.fr/gites_le-hardas-mercure_saint-saturnin-du-limet_h668613.htm'
    },
    {
        src: photo2,
        captionText: '53800 Renazé',
        captionHeader: 'Maison de vacances La Petite Coquais',
        href: 'https://www.gites.fr/gites_holiday-home-la-petite-coquais-05_renaze_h821078.htm'
    },
    {
        src: photo3,
        captionText: '53390 La Rouaudière',
        captionHeader: 'Maison de vacances La Rouaudière',
        href: 'https://www.gites.fr/gites_holiday-home-la-rouaudiere-with-fireplace-i_la-rouaudiere_h1093959.htm'
    },
    {
        src: rouardiere,
        captionText: '53800 Congrier',
        captionHeader: 'Maison de vacances La Rouardière',
        href: 'https://www.grandsgites.com/gite-53-rouardiere-2756.htm'
    }
];

export default class HotelsNearby extends React.Component<Props, State> {
    render() {
        return (
            <div className="base-div-content">
                <Row>
                    <Col sm="12">
                        <Card body={true}>
                            <CardTitle>Gîtes</CardTitle>
                            <CardText>Les gîtes à proximité du lieu.</CardText>
                            <Row>
                                {
                                    items.map((item, id) => {
                                        return (
                                            <Col xs="12" sm="6" md="6" lg="4" className="mb-3" key={id}>
                                                <Card>
                                                    <CardImg
                                                        top={true}
                                                        width="100%"
                                                        src={item.src}
                                                        alt={item.captionHeader}
                                                    />
                                                    <CardBody>
                                                        <CardTitle>{item.captionHeader}</CardTitle>
                                                        <CardText>{item.captionText}</CardText>
                                                        <CardText>
                                                            <a target="_blank" href={item.href}>lien annonce</a>
                                                        </CardText>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        );
                                    })
                                }
                            </Row>
                            <CardText>
                                La porte angevine 49 Pouancé : 19 couchages<br/>
                                <i className="fas fa-phone"/> 02 41 92 68 52 ou 02 41 92 68 52
                                <hr/>
                                M. Gandon à Bouchamps-les-craon, 10 couchages<br/>
                                <i className="fas fa-phone"/> 02 43 06 21 36
                                <hr/>
                                Mme Gendry à Niafles, 9 couchages<br/>
                                <i className="fas fa-phone"/> 02 43 06 11 86
                                <hr/>
                                M. Ballé à la Selle-craonnaise, 9 couchages<br/>
                                <i className="fas fa-phone"/> 02 43 07 55 21
                                <hr/>
                                M. Laurent à St Martin du limet, l’Orrière, 12 couchages
                                <hr/>
                                M. Laurent, la Renazaie, 25 couchages<br/>
                                <i className="fas fa-phone"/> 02 43 06 04 47
                                <hr/>
                                M. Ferré à la Selle-craonnaise, 5 couchages<br/>
                                <i className="fas fa-phone"/> 02 43 06 15 99
                                <hr/>
                                La Forterie à la Selle-craonnaise 17 à 24 couchages<br/>
                                <i className="fas fa-phone"/> 02 43 06 10 40 ou 02 61 28 82 59
                                <hr/>
                                Langley Brian à Craon<br/>
                                <i className="fas fa-phone"/> 02 43 06 35 36 ou 09 61 28 82 59
                                <hr/>
                                Gîte du chéran à Renazé<br/>
                                <i className="fas fa-phone"/> 02 41 34 18 33 ou 06 26 12 95 14
                                <hr/>
                                Yannick et Marie-jo Brousse pouancé<br/>
                                <i className="fas fa-phone"/> 02 41 92 62 66
                                <hr/>
                                Tribondeau Chantal à Craon<br/>
                                <i className="fas fa-phone"/> 02 43 06 37 07 ou 06 74 64 72 72
                                <hr/>
                                La Rêtiverie 53400<br/>
                                <i className="fas fa-phone"/> 02 43 07 46 89
                                <hr/>
                                M. Paillard 53400<br/>
                                <i className="fas fa-phone"/> 02 43 06 41 65
                                <hr/>
                                Maison Familiale de Craon<br/>
                                <i className="fas fa-phone"/> 02 43 06 14 98
                                <hr/>
                                La Rincerie La Selle-craonnaise<br/>
                                <i className="fas fa-phone"/> 02 43 07 50 20
                                <hr/>
                                La Viotterie La Boissière mobilhomes bungalows chalets<br/>
                                <i className="fas fa-phone"/> 02 43 06 80 10
                                <hr/>

                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}