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

    const client = feathers().configure(hooks()).configure(auth(options))

    if (window.navigator.onLine) {
      this.connectToBackend(client);
    }

    this.state = {
      isLoading: true,
      client: client,
      offline: false
    }
  }
  connectToBackend(client){
    let socket;
    if(process.env.REACT_APP_API_URL){
      socket = io(process.env.REACT_APP_API_URL, {transports: ['websocket']});
    }
    else {
      socket = io('http://localhost:3030', {transports: ['websocket']});
    }
    client.configure(socketio(socket));
  }
  componentDidMount() {
    if (window.navigator.onLine) {
      const client = this.state.client;
      client.authenticate().then(() => {
        return client.passport.getJWT()
      }).then(token => {
        return client.passport.verifyJWT(token);
      }).then(payload => {
        return client.service('users').get(payload.userId);
      }).then(user => {
        client.set('user', user);
        let preferredRegion = window.localStorage.getItem('preferredRegion');
        if(!preferredRegion){
          //DEFAULT PREFERRED REGION
          preferredRegion = "wallonie";
        }
        client.set('preferredRegion',preferredRegion);
        //Save user to localStorage
        let userParsed = JSON.stringify(user);
        window.localStorage.setItem("user", userParsed);
        if (user.role !== 'admin') {
          const organisation = client.service('organisation');
          organisation.get(user.organisation).then((o) => {
            client.set('organisation', o);
            //Save organisation to localStorage
            let organisationParsed = JSON.stringify(o);
            window.localStorage.setItem("organisation", organisationParsed);
            if(this.props.location.pathname == "/"){
              this.props.history.push('/app');
            }
            this.setState({isLoading: false})
          })
        } else {
          this.props.history.push('/app/admin');
          this.setState({isLoading: false})
        }
      }).catch(error => {
        console.log('error in the connection :' + error);
        if (error.code === 401 || error.code === 404) {
          client.logout();
          this.props.history.push('/');
          this.setState({isLoading: false});
        }
      });
    } else {
      //The user is offline, switching to the Offline mode
      this.setState({offline: true})
      const client = this.state.client;
      //Get user from localStorage
      let userUnparsed = window.localStorage.getItem("user");
      if (!userUnparsed) {
        //The user has never been logged in, redirecting to the Login page
        this.props.history.push('/');
        this.setState({isLoading: false});
      } else {
        let user = JSON.parse(userUnparsed);
        let organisationUnparsed = window.localStorage.getItem("organisation");
        let organisation = JSON.parse(organisationUnparsed);

        client.set('user', user);
        let preferredRegion = window.localStorage.getItem('preferredRegion');
        if(!preferredRegion){
          //DEFAULT PREFERRED REGION
          preferredRegion = "wallonie";
        }
        client.set('preferredRegion',preferredRegion);
        if (user.role !== 'admin') {
          client.set('organisation', organisation);
        }
        //TODO: OFFLINE FEATURES
        this.setState({isLoading: false});
        if(this.props.location.pathname == "/"){
          this.props.history.push('/app');
        }
      }
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
            <Route path='/app' render={(props) => (<Container {...props} client={this.state.client} offline={this.state.offline}/>)}/>
            <Route render={(props) => {
                console.log("not found"); return (<Container {...props} client={this.state.client} offline={this.state.offline}/>)
              }}/>
          </Switch>
        </GrommetApp>
      )
    }
    return content;
  }
}
export default withRouter(App);
