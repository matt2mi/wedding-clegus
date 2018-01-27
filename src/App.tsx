import * as React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
import NavHeader from './components/NavHeader';
import Main from './components/Main';
import CarSharing from './components/CarSharing';
import Invitation from './components/Invitation';
import JourneyDetails from './components/JourneyDetails';

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
            </div>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
