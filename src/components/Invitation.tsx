import * as React from 'react';
import Button from 'reactstrap/lib/Button';
import CardText from 'reactstrap/lib/CardText';
import CardTitle from 'reactstrap/lib/CardTitle';
import Card from 'reactstrap/lib/Card';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

export default class Invitation extends React.Component {
    render() {
        return (
            <div className="base-div-content">
                <Row>
                    <Col sm="12">
                        <Card body={true}>
                            <CardTitle className="form-title">Faire Part</CardTitle>
                            <CardText>
                                <Button color="info">Télécharger</Button>
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}