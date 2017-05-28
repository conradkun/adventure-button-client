import React, { Component, PropTypes } from 'react';
import {withRouter} from "react-router-dom";
import LoginForm from '../components/login/login_form'
import Box from 'grommet/components/Box'
import Spinner from 'react-spinkit';
import Logo from '../components/common/logo';
import Fade from 'react-fade';


class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            errors: []
        };
        this._handleSubmit = this._handleSubmit.bind(this);
    }
    
    componentDidMount(){
      const client = this.props.client;
      client.authenticate().then(() => {
        console.log("Authenticated");
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
        this.props.history.push('/app');
      }).catch(error => {
        console.log(error);
      });
    }

    _handleSubmit(info){
        const client = this.props.client;
        client.authenticate({
          strategy: 'local',
          email: info.username,
          password: info.password
        })
        .then(response => {
          return client.passport.verifyJWT(response.accessToken);
        })
        .then(payload => {
          return client.service('users').get(payload.userId);
        })
        .then(user => {
          client.set('user', user);
          this.props.history.push('/app');
        })
        .catch(error => {
          this.setState({errors : ["Une erreur est survenue, veuillez vérifier vos informations de connection"]});
        });
    }

    render(){
        return (
                <Box full={true} direction='column' align='center' justify='center' alignContent='center'>
                <Fade duration={.4}>
                    <LoginForm logo={<Logo />} align='center' errors={this.state.errors} onSubmit={this._handleSubmit.bind(this)}/>
                    </Fade>
                </Box>
        );
    }
}
export default withRouter(LoginPage);
