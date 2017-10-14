import React, {Component} from 'react';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import hooks from 'feathers-hooks';
//import errors from 'feathers-errors'; // An object with all of the custom error types.
import auth from 'feathers-authentication-client';
import io from 'socket.io-client/dist/socket.io';

import {Switch, Route, withRouter} from 'react-router-dom';

//Component
import Container from './container';
import LoginPage from './screen/login_page';
import GrommetApp from 'grommet/components/App';
import Box from 'grommet/components/Box';
import Spinner from 'react-spinkit';

class App extends Component {
  constructor() {
    super();
    const options = {
      storage: window.localStorage
    };

   
    this.state = {
      isLoading: true,
      client: client,
      offline: false
    }
  }

  render() {
    let content;
    if (this.state.isLoading) {
      content = (
        <Box full={true} direction='column' align='center' justify='center' alignContent='center'>
          <Spinner spinnerName="" noFadeIn={true}/>
        </Box>
      );
    } else {
      content = (
        <GrommetApp inline={true} centered={false}>
          <Switch>
            <Route exact path='/' render={(props) => (<LoginPage {...props} client={this.state.client} offline={this.state.offline}/>)}/>
            </Switch>
        </GrommetApp>
      )
    }
    return content;
  }
}
export default withRouter(App);