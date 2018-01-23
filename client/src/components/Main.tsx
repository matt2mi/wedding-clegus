import * as React from 'react';
import CardText from 'reactstrap/lib/CardText';
import CardTitle from 'reactstrap/lib/CardTitle';
import Card from 'reactstrap/lib/Card';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col sm="12">
            <Card body={true}>
              <CardTitle>Main Page</CardTitle>
              <CardText>Main page text.</CardText>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}