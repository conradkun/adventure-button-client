// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP
import React, { Component } from "react";
import Fade from "react-fade";
import { translate } from "react-i18next";
import io from 'socket.io-client'
import Split from "grommet/components/Split";
import Sidebar from "grommet/components/Sidebar";
import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Box from "grommet/components/Box";
import Menu from "grommet/components/Menu";
import Button from "grommet/components/Button";
import CloseIcon from "grommet/components/icons/base/Close";
import Anchor from "grommet/components/Anchor";
import Footer from "grommet/components/Footer";
import User from "grommet/components/icons/base/User";
import Notification from "grommet/components/Notification";
import ReactJson from 'react-json-view';
import joinGame from './screens/join_game';
import configureGame from './screens/configure_game';
import game from './screens/game';
import result from './screens/result';
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import AlertContainer from "react-alert";
import {register, getState} from './api'

class Container extends Component {
  constructor(props) {
    super(props);

    this.alertOptions = {
      offset: 20,
      position: "top right",
      theme: "dark",
      time: 4000,
      transition: "scale"
    };

    this._onResponsive = this._onResponsive.bind(this);
    this._logout = this._logout.bind(this);
    this._navigateToMode = this._navigateToMode.bind(this);
    this._register = this._register.bind(this);
    this._sendAction = this._sendAction.bind(this);
    this._getState = this._getState.bind(this);
    
    const socket = io('http://46.101.29.63/', {
      transports: ['websocket']
    });
    this.io = socket;

    socket.on('state', (state)=>{
      console.log('got an update over socketio', state);
      this.setState({
        serverState: state
      })
    });

    this.state = {
      isLoading: false,
      serverState: {},
      userId: undefined,
    };
  }
  _logout() {
    this.props.history.push("/");
  }

  _onResponsive(responsive) {
    this.setState({ responsive: responsive });
    if ("multiple" === responsive) {
      this.setState({ showMenu: true });
    }
    if ("single" === responsive) {
      this.setState({ showMenu: false });
    }
  }

  _renderTitle() {
    return (
      <Box align="center" direction="row" responsive={false}>
        <Title pad="small" responsive={true}>
          AB
        </Title>
      </Box>
    );
  }

  _renderAppLogo() {
    return (
      <Title pad="small" responsive={false}>
        <Box align="center" pad="small" direction="row">
          AB
        </Box>
      </Title>
    );
  }

  _renderNav() {
    const title = this._renderTitle(true);

    return (
      <Sidebar
        ref="sidebar"
        size="small"
        separator="right"
        fixed={true}
      >
        <Header
          justify="between"
          size="large"
          pad={{
            horizontal: "medium"
          }}
        >
          {title}
        </Header>
        <Box flex="grow" justify="start" align="center" alignContent="center">
          {this.state.userId}
          <ReactJson src={this.state.serverState} />
        </Box>
      </Sidebar>
    );
  }

  _register(){
    register()
    .then((id)=>{
      console.log('registered')
      this.setState(
        {
          userId: id,
          serverState: {
            mode: 'Configure'
          }
        }
      )
    })
    .then(()=>{
      this._getState()
    })
    console.log(this.state)
  }

  _getState(){
    getState()
    .then((state)=>{
      console.log('')
      this.setState({
        serverState: state
      })
    })
  }

  _sendAction(payload){
    this.io.emit('action', {
      userId: this.state.userId,
      payload: payload
    });
  }


  _navigateToMode(){

    let location = this.props.history.location;
    switch (this.state.serverState.mode) {
      case undefined: 
        {
          this._register();
          break;
        }
      
      case 'Configure':
        {
          if(location.pathname !== "/app/configure"){
            this.props.history.push('/app/configure')
          }
          break;
        }

      case 'Join':
        {
          if(location.pathname !== "/app/join"){
            this.props.history.push('/app/join')
        }
        break;
        }
      case 'Game':
        {
          if(location.pathname !== "/app/game"){
            this.props.history.push('/app/game')
        }
        break;
        }
        case 'Result':
        {
          if(location.pathname !== "/app/result"){
            this.props.history.push('/app/result')
        }
        break;
        }
      default:
        break;
    }
  }


  render() {
    let routeProps = {
      responsive: this.state.responsive,
      sendAction: this._sendAction,
      serverState: this.state.serverState,
      userId: this.state.userId

    };
    let fadeDuration = 0.5;
    if (this.state.responsive === "single") {
      fadeDuration = 0;
    }
    let priority =
      "single" === this.state.responsive && this.state.showMenu
        ? "left"
        : "right";

    const FadingRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={matchProps => (
          <Fade duration={fadeDuration}>
            <Component {...matchProps} {...routeProps} />
          </Fade>
        )}
      />
    );
    this._navigateToMode();
    return (

      <Split
        flex="right"
        priority={priority}
        fixed={true}
        onResponsive={this._onResponsive}
      >
        {this._renderNav()}
        <div>
          <AlertContainer ref={a => (this.msg = a)} {...this.alertOptions} />
          <Switch>
            <FadingRoute exact path="/app/join" component={joinGame} />
            <FadingRoute exact path="/app/configure" component={configureGame} />
            <FadingRoute exact path="/app/game" component={game} />
            <FadingRoute exact path="/app/result" component={result} />
          </Switch>
        </div>
      </Split>
    );
  }
}
export default (withRouter(Container));
