import * as React from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle, Col, Row, } from 'reactstrap';

interface Props {
}

interface State {
}

const defaultSrcHouse = require('../img/default-house-orange.png');
const items = [
    {
        src: require('../img/hostel1.jpg'),
        location: 'St Saturnin du Limet 53800',
        description: 'Appartements Le Hardas',
        phone: '',
        beds: '',
        distance: 0,
        href: 'https://www.gites.fr/gites_le-hardas-mercure_saint-saturnin-du-limet_h668613.htm'
    },
    {
        src: require('../img/hostel2.jpg'),
        location: 'Renazé 53800',
        description: 'Maison de vacances La Petite Coquais',
        phone: '',
        beds: '',
        distance: 3.1,
        href: 'https://www.gites.fr/gites_holiday-home-la-petite-coquais-05_renaze_h821078.htm'
    },
    {
        src: require('../img/hostel3.jpg'),
        location: 'La Rouaudière 53390',
        description: 'Maison de vacances La Rouaudière',
        phone: '',
        beds: '',
        distance: 11,
        href: 'https://www.gites.fr/gites_holiday-home-la-rouaudiere-with-fireplace-i_la-rouaudiere_h1093959.htm'
    },
    {
        src: require('../img/gite-rouardiere.jpg'),
        location: 'Congrier 53800',
        description: 'Maison de vacances La Rouardière',
        phone: '',
        beds: '',
        distance: 6,
        href: 'https://www.grandsgites.com/gite-53-rouardiere-2756.htm'
    },
    {
        src: defaultSrcHouse,
        location: '49420 Pouancé 49420',
        description: 'La porte angevine',
        phone: '02 41 92 68 52 ou 02 41 92 68 52',
        beds: '19',
        distance: 12.5,
        href: 'http://www.laporteangevine.com/soiree-etape-maineetloire.aspx'
    },
    {
        src: defaultSrcHouse,
        location: 'Bouchamps-les-Craon 53400',
        description: 'M. Gandon',
        phone: '02 43 06 21 36',
        beds: '10',
        distance: 8.4,
        href: ''
    },
    {
        src: defaultSrcHouse,
        location: 'Niafles 53400',
        description: 'Mme Gendry',
        phone: '02 43 06 11 86',
        beds: '9',
        distance: 9.6,
        href: ''
    },
    {
        src: defaultSrcHouse,
        location: 'La Selle-craonnaise 53800',
        description: 'M. Ballé',
        phone: '02 43 07 55 21',
        beds: '9',
        distance: 6.4,
        href: ''
    },
    {
        src: defaultSrcHouse,
        location: 'St Martin du limet 53800',
        description: 'M. Laurent, la Renazaie',
        phone: '02 43 06 04 47',
        beds: '12 ou 25',
        distance: 2.0,
        href: 'http://www.consommer-responsable.fr/annuaire/acteur/le-verger-de-la-renazaie'
    },
    {
        src: defaultSrcHouse,
        location: 'La Selle-craonnaise 53800',
        description: 'M. Ferré',
        phone: '02 43 06 15 99',
        beds: '5',
        distance: 6.4,
        href: ''
    },
    {
        src: defaultSrcHouse,
        location: 'La Selle-craonnaise 53800',
        description: 'La Forterie',
        phone: '02 43 06 10 40 ou 02 61 28 82 59',
        beds: '17 à 24',
        distance: 6.4,
        href: 'https://www.la-forterie.com/'
    },
    {
        src: defaultSrcHouse,
        location: 'Craon 53400',
        description: 'Langley Brian',
        phone: '02 43 06 35 36 ou 09 61 28 82 59',
        beds: '',
        distance: 14,
        href: ''
    },
    {
        src: defaultSrcHouse,
        location: 'Renazé 53800',
        description: 'Gîte du chéran',
        phone: '02 41 34 18 33 ou 06 26 12 95 14',
        beds: '',
        distance: 3.1,
        href: 'https://www.gites-de-france.com/location-vacances-Renaze-Gite-Gite-Du-Cheran-53G0230.html'
    },
    {
        src: defaultSrcHouse,
        location: 'Pouancé 49420',
        description: 'Yannick et Marie-jo Brousse',
        phone: '02 41 92 62 66',
        beds: '',
        distance: 13.9,
        href: 'http://www.lasaulnerie.com/'
    },
    {
        src: defaultSrcHouse,
        location: 'Craon 53400',
        description: 'Tribondeau Chantal',
        phone: '02 43 06 37 07 ou 06 74 64 72 72',
        beds: '',
        distance: 14,
        href: ''
    },
    {
        src: defaultSrcHouse,
        location: 'Craon 53400',
        description: 'La Rêtiverie',
        phone: '02 43 07 46 89',
        beds: '2 à 14',
        distance: 14,
        href: 'http://lasymphonieduverger.pagesperso-orange.fr/presentation.htm'
    },
    {
        src: defaultSrcHouse,
        location: 'Craon 53400',
        description: 'M. Paillard',
        phone: '02 43 06 41 65',
        beds: '',
        distance: 14,
        href: ''
    },
    {
        src: defaultSrcHouse,
        location: 'Craon 53400',
        description: 'Maison Familiale de Craon',
        phone: '02 43 06 14 98',
        beds: '',
        distance: 11.9,
        href: ''
    },
    {
        src: defaultSrcHouse,
        location: 'La Selle-craonnaise 53800',
        description: 'La Rincerie',
        phone: '02 43 07 50 20',
        beds: '',
        distance: 9.4,
        href: 'http://www.la-rincerie.com/le-sejour'
    },
    {
        src: defaultSrcHouse,
        location: 'La Boissière 53800',
        description: 'Camping La Viotterie',
        phone: '02 43 06 80 10',
        beds: '',
        distance: 11.4,
        href: 'http://campinglaviotterie.fr/'
    }
];

export default class HotelsNearby extends React.Component<Props, State> {
    render() {
        return (
            <div className="base-div-content">
                <Row>
                    <Col sm="12">
                        <Card body={true} className="mt-3">
                            <div className="title">Gîtes</div>
                            <CardText>Les gîtes à proximité de Saint-Saturnin du Limet.</CardText>
                            <Row>
                                {
                                    items.map((item, id) => {
                                        return (
                                            <Col xs="12" sm="6" md="6" lg="3" className="mb-3" key={id}>
                                                <Card>
                                                    <CardImg
                                                        top={true}
                                                        width="100%"
                                                        src={item.src}
                                                        alt={item.description}
                                                    />
                                                    <CardBody>
                                                        <CardTitle className="">
                                                            {item.description}
                                                        </CardTitle>
                                                        <CardText>
                                                            <i className="fa fa-2 fa-home" aria-hidden="true"/>
                                                            {' ' + item.location}
                                                        </CardText>
                                                        {
                                                            item.beds !== '' &&
                                                            <CardText>
                                                                <i className="fas fa-bed"/>{' ' + item.beds + ' couchages'}
                                                            </CardText>
                                                        }
                                                        {
                                                            item.phone !== '' &&
                                                            <CardText>
                                                                <i className="fas fa-phone"/>{' ' + item.phone}
                                                            </CardText>
                                                        }
                                                        <CardText>
                                                            <i className="fas fa-car"/>{' ' + item.distance + ' kms'}
                                                        </CardText>
                                                        {
                                                            item.href !== '' &&
                                                            <CardText>
                                                                <a target="_blank" href={item.href}>
                                                                    <i className="fas fa-external-link-alt"/>{' '}lien
                                                                    annonce
                                                                </a>
                                                            </CardText>
                                                        }
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        );
                                    })
                                }
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}