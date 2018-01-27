import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <HashRouter basename="/">
    <App/>
  </HashRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
