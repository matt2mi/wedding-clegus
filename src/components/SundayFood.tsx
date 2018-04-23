import * as React from 'react';
import CardText from 'reactstrap/lib/CardText';
import CardTitle from 'reactstrap/lib/CardTitle';
import Card from 'reactstrap/lib/Card';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { CardSubtitle } from 'reactstrap';

export default class SundayFood extends React.Component {
    render() {
        return (
            <div className="base-div-content">
                <Row>
                    <Col sm="12">
                        <Card body={true} className="mt-3">
                            <CardTitle className="form-title">Buffet participatif du dimanche</CardTitle>
                            <CardSubtitle className="form-subtitle">
                                A partir de 13h00 le dimanche, nous vous proposons un buffet participatif !
                            </CardSubtitle>
                            <CardText>
                                <br/>
                                Comment ça se passe ?<br/>
                                > Vous amenez de la nourriture à partager, salée ou sucrée (une tarte, un cake, une
                                salade, un fromage, des cookies…)<br/>
                                > En arrivant à la salle le samedi midi, vous déposez vos mets dans la remorque frigo
                                prévue pour ça<br/>
                                > On met tout en commun sur une grande table le dimanche<br/>
                                > Chacun.e se sert, à la bonne franquette !<br/>
                                > On prévoit la boisson, le pain et le café<br/>
                                > Bon appétit !
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
