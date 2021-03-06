import * as React from 'react';
import Card from 'reactstrap/lib/Card';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

export default class SundayFood extends React.Component {

    componentWillMount() {
        fetch('/api/sundayFoodView');
    }

    render() {
        return (
            <div className="base-div-content">
                <Row>
                    <Col sm="12">
                        <Card body={true} className="mt-3">
                            <Row className="text-cnter">
                                <div className="col-12 title">Buffet du dimanche midi</div>
                                <div className="col-12 subtitle">
                                    A partir de 13h00 le dimanche, nous vous proposons un buffet participatif !
                                </div>
                            </Row>
                            <Row className="justify-content-around mt-3">
                                <div className="col-10 col-sm-8 col-md-4 order-1 order-md-2">
                                    <img width="100%" className="img-fluid mb-3" src={require('../img/picnic.jpg')}/>
                                </div>
                                <div className="col-12 col-md-8 text-left order-2 order-md-1">
                                    <span className="subtitle">Vous amenez</span> de la nourriture à partager, salée ou
                                    sucrée (une tarte, un cake, une
                                    salade, un fromage, des cookies…).<br/>
                                    En arrivant à la salle le samedi midi, vous déposez vos
                                    mets <span className="subtitle">dans la remorque frigo</span> prévue pour ça.<br/>
                                    On met tout en commun sur <span className="subtitle">une grande table</span> le
                                    dimanche et chacun.e se sert, <span className="subtitle">à la bonne franquette</span>
                                    {' '}et <span className="subtitle">on s'occuppe</span> de la boisson, du pain et du
                                    café !
                                </div>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
