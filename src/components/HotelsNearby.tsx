import * as React from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle, Col, Row, } from 'reactstrap';

interface Props {
}

interface State {
}

const photo1 = require('../img/hostel1.jpg');
const photo2 = require('../img/hostel2.jpg');
const photo3 = require('../img/hostel3.jpg');
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
    }
];

export default class HotelsNearby extends React.Component<Props, State> {
    render() {
        return (
            <div>
                <Row>
                    <Col sm="12">
                        <Card body={true}>
                            <CardTitle>Gîtes</CardTitle>
                            <CardText>Les gîtes à proximité du lieu.</CardText>
                            <Row>
                                {
                                    items.map((item, id) => {
                                        return (<Col sm="3" key={id}>
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
                                        </Col>);
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