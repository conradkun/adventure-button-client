import React, {Component} from 'react';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import hooks from 'feathers-hooks';
//import errors from 'feathers-errors'; // An object with all of the custom error types.
import auth from 'feathers-authentication-client';
import io from 'socket.io-client/dist/socket.io';

import {
    Switch,
    Route,
    withRouter
} from 'react-router-dom';

//Component
import Container from './container';
import LoginPage from './screen/login_page';
import GrommetApp from 'grommet/components/App';
import Box from 'grommet/components/Box';
import Spinner from 'react-spinkit';


class App extends Component{
  constructor(){
    super();
    const socket = io('http://localhost:3030', {
      transports: ['websocket']
    });

    const options = {
      storage: window.localStorage
    };

    const client = feathers()
      .configure(socketio(socket))
      .configure(hooks())
      .configure(auth(options))

    this.state = {
      isLoading: true,
      client: client
    }
  }

  componentDidMount(){
      const client = this.state.client;
      client.authenticate().then(() => {
        return client.passport.getJWT()
      })
      .then(token => {
        return client.passport.verifyJWT(token);
      })
      .then(payload => {
        return client.service('users').get(payload.userId);
      })
      .then(user => {
        client.set('user', user);
        this.setState({
          isLoading: false,
        })
      })
      .catch(error => {
        console.log(error)
        if (error.code === 401 || error.code === 404) {
          client.logout();
          this.props.history.push('/');
          this.setState({
            isLoading: false,
          });
        }
        console.error(error);
      });
    }


  render(){
    let content;
    if(this.state.isLoading){
      content = (
        <Box full={true} direction='column' align='center' justify='center' alignContent='center'>
          <Spinner spinnerName="" noFadeIn={true} />
        </Box>
      );
    }
    else {
    content =  (
    <GrommetApp centered={false}>
            <Switch>
              <Route exact path='/' render={(props) => (
                <LoginPage {...props} client={this.state.client} />
              )}/>
              <Route path='/app' render={(props) => (
                <Container {...props} client={this.state.client} />
              )}/>
            </Switch>
    </GrommetApp>
    )
  }
  return content;
  }
}
export default withRouter(App);
