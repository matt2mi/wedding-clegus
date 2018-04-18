import * as React from 'react';
import CardText from 'reactstrap/lib/CardText';
import CardTitle from 'reactstrap/lib/CardTitle';
import Card from 'reactstrap/lib/Card';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

export default class Main extends React.Component {
    render() {
        return (
            <div className="base-div-content">
                <Row>
                    <Col sm="12">
                        <Card body={true}>
                            <CardTitle className="form-title">
                                Bienvenu.e.s sur le site internet de notre mariage !
                            </CardTitle>
                            <CardText>
                                C’est ici que vous trouverez, on l’espère, toutes les informations que vous cherchez.
                                Fouinez dans les différentes rubriques, téléchargez notre faire-part si ça vous dit, et
                                surtout : dites-nous si vous serez présent.e.s (youpi) > rubrique « Présence » !
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}