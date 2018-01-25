import * as React from 'react';
import { SyntheticEvent } from 'react';
import Card from 'reactstrap/lib/Card';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { Journey } from '../helpers/interfaces';
import Button from 'reactstrap/lib/Button';
import { Redirect } from 'react-router';

interface Props {
}

interface State {
  readonly journeys: Journey[];
  readonly goJourneyDetails: boolean;
  readonly journeyId: number;
}

export default class CarSharing extends React.Component <Props, State> {
  constructor(props: Props) {
    super(props);

    this.goEditJourney = this.goEditJourney.bind(this);
    // console.warn(props.match.params[`id`]);
    this.state = {
      journeys: [],
      goJourneyDetails: false,
      journeyId: 0
    };
  }

  componentWillMount() {
    fetch('/api/journeys')
      .then(result => {
        return result.json();
      })
      .then((journeys: Journey[]) => {
        const trueJourneys: Journey[] = journeys.map((journey, id) => ({
          id: id,
          name: journey.name,
          fromCity: journey.fromCity,
          toCity: journey.toCity,
          freeSeats: journey.freeSeats,
          totalSeats: journey.totalSeats,
          price: journey.price,
          driverPhoneNumber: journey.driverPhoneNumber
        }));
        console.warn(trueJourneys);
        this.setState({journeys: trueJourneys});
      })
      .catch();
  }

  goEditJourney(event: SyntheticEvent<HTMLButtonElement>, journeyId: number) {
    event.preventDefault();
    this.setState({journeyId, goJourneyDetails: true});
  }

  render() {
    if (this.state.goJourneyDetails) {
      return (<Redirect to={'/covoiturages/details/' + this.state.journeyId}/>);
    }
    return (
      <div>
        <Row>
          <Col sm="12">
            <Card body={true}>
              <table className="table">
                <thead>
                <tr>
                  <th>Trajet</th>
                  <th>Ville de départ</th>
                  <th>Ville d'arrivée</th>
                  <th>Sièges libres</th>
                  <th>Prix</th>
                  <th>Numéro</th>
                </tr>
                </thead>
                <tbody>
                {this.state.journeys.map(journey => {
                  return (
                    <tr key={journey.id}>
                      <td>{journey.name}</td>
                      <td>{journey.fromCity}</td>
                      <td>{journey.toCity}</td>
                      <td>{journey.freeSeats + '/' + journey.totalSeats}</td>
                      <td>{journey.price}</td>
                      <td>{journey.driverPhoneNumber}</td>
                      <td>
                        <Button
                          color="primary"
                          onClick={(e) => {
                            this.goEditJourney(e, journey.id);
                          }}
                        >
                          Modifier
                        </Button>
                      </td>
                      <td>
                        <Button color="danger">Supprimer</Button>
                      </td>
                    </tr>
                  );
                })}
                </tbody>
              </table>

              <button type="button" className="btn btn-primary">
                Ajouter
              </button>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}