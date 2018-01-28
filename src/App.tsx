import * as React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
import NavHeader from './components/NavHeader';
import Main from './components/Main';
import CarSharing from './components/CarSharing';
import Invitation from './components/Invitation';
import JourneyDetails from './components/JourneyDetails';
import HotelsNearby from './components/HotelsNearby';
import SundayFood from './components/SundayFood';
import InvitationResponse from './components/InvitationResponse';
import Contacts from './components/Contacts';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavHeader/>
        <div className="container mt-2">
          <Switch>
            <div className="container">
              <Route path="/" exact={true} component={Main}/>
              <Route path="/covoiturages" exact={true} component={CarSharing}/>
              <Route path="/covoiturages/edit/:id" component={JourneyDetails}/>
              <Route path="/covoiturages/new" component={JourneyDetails}/>
              <Route path="/faire-part" component={Invitation}/>
                <Route path="/gites" component={HotelsNearby}/>
                <Route path="/buffet" component={SundayFood}/>
                <Route path="/presence" component={InvitationResponse}/>
                <Route path="/contacts" component={Contacts}/>
            </div>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
