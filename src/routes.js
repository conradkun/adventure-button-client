import React from 'react';

import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import hooks from 'feathers-hooks';
//import errors from 'feathers-errors'; // An object with all of the custom error types.
import auth from 'feathers-authentication-client';
import io from 'socket.io-client/dist/socket.io';

import {
    Switch,
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

//Component
import Container from './container';
import LoginPage from './screen/login_page';
import GrommetApp from 'grommet/components/App';

const socket = io('http://localhost:3030', {
  transports: ['websocket']
});

const options = {
  storage: window.localStorage
};

const app = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  .configure(auth(options))

let Routes =  (
    <GrommetApp centered={false}>
        <Router>
            <Switch>
              <Route exact path='/' render={(props) => (
                <LoginPage {...props} client={app} />
              )}/>
              <Route path='/app' render={(props) => (
                <Container {...props} client={app} />
              )}/>
            </Switch>
        </Router>
    </GrommetApp>
);
export default Routes;
