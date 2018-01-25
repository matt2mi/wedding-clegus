import * as React from 'react';
import CardTitle from 'reactstrap/lib/CardTitle';
import Card from 'reactstrap/lib/Card';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';
import FormGroup from 'reactstrap/lib/FormGroup';
import Form from 'reactstrap/lib/Form';
import { Journey } from '../helpers/interfaces';
import Button from 'reactstrap/lib/Button';

interface Props {
  match: { params: { id: string } };
}

interface State {
  readonly journey: Journey;
}

export default class JourneyDetails extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      journey: {
        id: 0,
        name: '',
        fromCity: '',
        toCity: '',
        freeSeats: 0,
        totalSeats: 0,
        price: 0,
        driverPhoneNumber: ''
      }
    };

    fetch('/api/journey/' + this.props.match.params.id)
      .then(result => result.json())
      .then((journey: Journey) => {
        this.setState({
          journey: {
            id: journey.id,
            name: journey.name,
            fromCity: journey.fromCity,
            toCity: journey.toCity,
            freeSeats: journey.freeSeats,
            totalSeats: journey.totalSeats,
            price: journey.price,
            driverPhoneNumber: journey.driverPhoneNumber
          }
        });
      })
      .catch(e => console.warn(e));
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm="12">
            <Card body={true}>
              <CardTitle>JourneyDetails Page</CardTitle>

              <Form>
                <FormGroup>
                  <Label for="name">Départ</Label>
                  <Input type="text" name="from" id="from" value={this.state.journey.fromCity}/>
                </FormGroup>
                <FormGroup>
                  <Label for="name">Arrivée</Label>
                  <Input type="text" name="to" id="to" value={this.state.journey.toCity}/>
                </FormGroup>
                <FormGroup>
                  <Label for="name">Sièges libres</Label>
                  <Input type="text" name="freeSeats" id="freeSeats" value={this.state.journey.freeSeats + ''}/>
                </FormGroup>
                <FormGroup>
                  <Label for="name">Sièges totaux</Label>
                  <Input
                    type="text"
                    name="totalSeats"
                    id="totalSeats"
                    value={this.state.journey.totalSeats + ''}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="name">Prix</Label>
                  <Input type="text" name="price" id="price" value={this.state.journey.price + ''}/>
                </FormGroup>
                <FormGroup>
                  <Label for="name">Numéro</Label>
                  <Input
                    type="text"
                    name="driverPhoneNumber"
                    id="driverPhoneNumber"
                    value={this.state.journey.driverPhoneNumber}
                  />
                </FormGroup>

                <Button>Envoyer</Button>
              </Form>

              <a href="/covoiturages">Go back</a>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}