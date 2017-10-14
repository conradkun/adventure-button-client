// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP
import React, { Component } from "react";
import Fade from "react-fade";
import { translate } from "react-i18next";

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

import createGame from './screens/create_game';



import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import AlertContainer from "react-alert";

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
    
    this.state = {
      isLoading: false,
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
          Easy Scale
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
    let closer;
    /**
         * When grommet will be updated
         let baremeLink = (
         <Anchor path={{ path: '/app', index: true }} onClick={this._onMenuClick}>
         Calcul de Barème
         </Anchor>
         );
         **/
    let casesLink;
    let settingsLink;
    let usersLink;
    let adminLink;
    let breakdownLink;
    if ("single" === this.state.responsive) {
      closer = <Button icon={<CloseIcon />} onClick={this._onMenuClick} />;
    }

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
          {closer}
        </Header>
        <Box flex="grow" justify="start" align="center" alignContent="center">
          <Menu primary={true}>
          
          </Menu>
        </Box>
        <Footer pad="medium">
          <Menu
            icon={<User />}
            dropAlign={{
              bottom: "bottom"
            }}
          >
          </Menu>
        </Footer>
      </Sidebar>
    );
  }

  render() {
    let routeProps = {
      responsive: this.state.responsive,
      onMenuOpen: this._onMenuOpen,
      onLogout: this._logout,
      client: this.props.client,
      renderAppLogo: this._renderAppLogo,
      msg: this.msg,
      offline: this.props.offline
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
            <FadingRoute exact path="/app" component={createGame} />
          </Switch>
        </div>
      </Split>
    );
  }
}
export default (withRouter(Container));
