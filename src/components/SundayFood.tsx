import * as React from 'react';
import CardText from 'reactstrap/lib/CardText';
import CardTitle from 'reactstrap/lib/CardTitle';
import Card from 'reactstrap/lib/Card';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

export default class SundayFood extends React.Component {
    render() {
        return (
            <div className="base-div-content">
                <Row>
                    <Col sm="12">
                        <Card body={true}>
                            <CardTitle>Buffet participatif</CardTitle>
                            <CardText>Comment ça se passe le dimanche.</CardText>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}