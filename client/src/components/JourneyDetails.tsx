import * as React from 'react';
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
              <CardTitle>JourneyDetails Page</CardTitle>
              <CardText>JourneyDetails page text.</CardText>
              <a href="/covoiturages">Go back</a>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}