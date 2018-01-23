import * as React from 'react';
import Button from 'reactstrap/lib/Button';
import CardText from 'reactstrap/lib/CardText';
import CardTitle from 'reactstrap/lib/CardTitle';
import Card from 'reactstrap/lib/Card';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

/*id: string;
  name: string;
  fromCity: string;
  toCity: string;
  freeSeats: number;
  totalSeats: number;
  price: number;
  driverPhoneNumber: string;*/

export default class JourneyDetails extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col sm="12">
            <Card body={true}>
              <CardTitle>Invitation Page</CardTitle>
              <CardText>Invitation page text.</CardText>
              <Button color="info">Go somewhere</Button>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}