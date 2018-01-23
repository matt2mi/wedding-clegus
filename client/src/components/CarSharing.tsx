import * as React from 'react';
import Card from 'reactstrap/lib/Card';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { Journey } from '../helpers/interfaces';
import Button from 'reactstrap/lib/Button';
import { default as RouterButton } from './RouterButton';
import { SyntheticEvent } from 'react';
import { History } from 'history';

interface Props {
  match: {
    params: Object
  };
}

interface State {
  readonly journeys: Journey[];
  currentJourneyId: number;
}

export default class CarSharing extends React.Component <Props, State> {
  constructor(props: Props) {
    super(props);

    this.goEditJourney = this.goEditJourney.bind(this);
    console.warn(props.match.params[`id`]);
    this.state = {
      journeys: [],
      currentJourneyId: props.match.params[`id`]
    };
  }

  componentWillMount() {
    fetch('/api/journeys')
      .then(result => {
        return result.json();
      })
      .then((journeys: Journey[]) => {
        console.warn(journeys);
        this.setState({journeys});
      })
      .catch();
  }

  goEditJourney(event: SyntheticEvent<HTMLButtonElement>, history: History) {
    history.push('/covoiturages/details/');
  }

  render() {
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
                        <RouterButton cb={this.goEditJourney} type={''}>Modifier</RouterButton>
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