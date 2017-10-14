import React, {Component} from 'react';
//import errors from 'feathers-errors'; // An object with all of the custom error types.
import io from 'socket.io-client/dist/socket.io';

import {Switch, Route, withRouter, Redirect} from 'react-router-dom';

//Component
import Container from './container';
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
      isLoading: false,
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
            <Route exact path='/app' render={(props) => (<Container {...props} client={this.state.client} offline={this.state.offline}/>)}/>
            <Redirect to="/app"/>
          </Switch>
        </GrommetApp>
      )
    }
    return content;
  }
}
export default withRouter(App);