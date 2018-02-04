import * as React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import '../node_modules/loaders.css/loaders.css';
import CarSharing from './components/CarSharing';
import Contacts from './components/Contacts';
import HotelsNearby from './components/HotelsNearby';
import Invitation from './components/Invitation';
import PresenceForm from './components/PresenceForm';
import JourneyDetails from './components/JourneyDetails';
import Main from './components/Main';
import NavHeader from './components/NavHeader';
import PresenceList from './components/PresenceList';
import SundayFood from './components/SundayFood';
import JourneyEdit from './components/JourneyEdit';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <NavHeader/>
                <div className="container mt-2">
                    <Switch>
                        <div>
                            <Route path="/" exact={true} component={Main}/>
                            <Route path="/covoiturages" exact={true} component={CarSharing}/>
                            <Route path="/covoiturages/edit/:id" component={JourneyEdit}/>
                            <Route path="/covoiturages/new" component={JourneyEdit}/>
                            <Route path="/covoiturages/detail/:id" component={JourneyDetails}/>
                            <Route path="/faire-part" component={Invitation}/>
                            <Route path="/gites" component={HotelsNearby}/>
                            <Route path="/buffet" component={SundayFood}/>
                            <Route path="/presence" component={PresenceForm}/>
                            <Route path="/contacts" component={Contacts}/>
                            <Route path="/liste-presences" component={PresenceList}/>
                        </div>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
