// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP
import React, { Component, PropTypes } from 'react';
import Fade from 'react-fade';
import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Button from 'grommet/components/Button';
import CloseIcon from 'grommet/components/icons/base/Close';
import Anchor from 'grommet/components/Anchor';
import Footer from 'grommet/components/Footer';
import User from 'grommet/components/icons/base/User'
import AppSettings from './utils/app_settings';

import CardList from './screen/card_list';
import MiniAppContainer from './screen/mini_app';
import Admin from './screen/admin'
/**
import OrganisationAdmin from './screen/organisation_admin'
import UsersAdmin from './screen/users_admin'
import SettingsAdmin from './screen/settings_admin'
**/

import {
    Switch,
    Route,
    withRouter
} from 'react-router-dom'


import Spinner from 'react-spinkit';

class Container extends Component {

    constructor () {
        super();
        this._onResponsive = this._onResponsive.bind(this);
        this._onMenuOpen = this._onMenuOpen.bind(this);
        this._onMenuClick = this._onMenuClick.bind(this);
        this._logout = this._logout.bind(this);
        this.state = {
            isLoading: true,
            showMenu: true, responsive: 'multiple',
            searchString: '',
            me: {
              email: 'Loading...',
              role: undefined,
              organisation: undefined,
            }
        }
    }
    _logout(){
      const client = this.props.client;
      client.logout();
      this.props.history.push('/');
    }

    componentDidMount(){
      const client = this.props.client;
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
          me: {
          email: user.email,
          role: user.role,
          organisation: user.organisation
        }})
      })
      .catch(error => {
        if (error.code === 401 || error.code === 404) {
          client.logout();
          this.props.history.push('/');
        }
        console.error(error);
      });
    }

    _onResponsive (responsive) {
        this.setState({responsive: responsive});
        if ('multiple' === responsive) {
            this.setState({showMenu: true});
        }
        if ('single' === responsive) {
            this.setState({showMenu: false});
        }
    }

    _onMenuOpen () {
        this.setState({showMenu: true});
    }

    _onMenuClick () {
        if ('single' === this.state.responsive) {
            this.setState({showMenu: false});
        }
    }

    _renderTitle () {
        return (
            <Title pad='small' responsive={false}>
                    <Box align='center' direction='row'>
                        <Title>Projet Bareme</Title>
                    </Box>
            </Title>
        );
    }

    _renderNav () {
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
        let baremeLink = (
            <Anchor path="/app" onClick={this._onMenuClick}>
                Calcul de Barème
            </Anchor>
        );
        let settingsLink;
        let usersLink;
        let adminLink;
        let organisationLink;
        let createTestUser;
        if ('single' === this.state.responsive) {
            closer = (
                <Button icon={<CloseIcon />} onClick={this._onMenuClick}/>
            );
        }

        adminLink = (
            <Anchor path="/app/admin" onClick={this._onMenuClick}>
                Administration
            </Anchor>);

        organisationLink = (
            <Anchor path="/app/organisation" onClick={this._onMenuClick}>
                Organisation
            </Anchor>);

        usersLink = (
            <Anchor path='/app/users' onClick={this._onMenuClick}>
                Collaborateurs
            </Anchor>
        );
        settingsLink = (
            <Anchor path='/app/settings' onClick={this._onMenuClick}>
                Paramètres de l´étude
            </Anchor>
        );

        createTestUser = (
            <Anchor path='/app/settings' onClick={() => {
              const app = this.props.client;
              const users = app.service('/users');
              users.create({ email: 'test7@test.com', password: '1111', role: 'admin' , organisation: 'org2'});
            }}>
                Create Test User
            </Anchor>
        );

        return (
            <Sidebar ref='sidebar' size='small' separator='right' colorIndex={AppSettings.mainColor}
                     fixed={true}>
                <Header justify='between' size='large' pad={{horizontal: 'medium'}}>
                    {title}
                    {closer}
                </Header>
                <Box flex='grow'
                     justify='start'>
                     <h5>{this.state.me.email}</h5>
                     <h5>{this.state.me.role}</h5>
                     <h5>{this.state.me.organisation}</h5>
                    <Menu primary={true}>
                        {baremeLink}
                        {this.state.me.role === 'admin' ? adminLink : undefined}
                        {this.state.me.role === 'manager' ? usersLink : undefined}
                        {this.state.me.role === 'manager' ? settingsLink : undefined}
                    </Menu>
                </Box>
                <Footer pad='medium'>
                    <Button icon={<User />} onClick={() => {

                      const client = this.props.client;
                      const users = client.service('users');

                      users.patch('9m1vjDTGFSri3Qnu', {
                        password: '1111'
                      });

                      //TODO: Popup to change own password
                    }}/>
                </Footer>
            </Sidebar>
        );


    }

    render () {
        let routeProps = {
            responsive:this.state.responsive,
            onMenuOpen: this._onMenuOpen,
            onLogout: this._logout,
            client: this.props.client
        };

        let priority = ('single' === this.state.responsive && this.state.showMenu ?
            'left' : 'right');

        const FadingRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={matchProps => (
                <Fade duration={0.5}>
                    <Component {...matchProps} {...routeProps}/>
                </Fade>
            )}/>
        );

        let content;
        if(this.state.isLoading){
          content = (
            <Box full={true} direction='column' align='center' justify='center' alignContent='center'>
              <Spinner spinnerName="double-bounce" noFadeIn={true} />
            </Box>
          );
        }
        else {
          content =  (
                  <Split flex='right' priority={priority} fixed={true}
                    onResponsive={this._onResponsive}>
                      {this._renderNav()}
                      <Switch>
                          <FadingRoute exact path='/app' component={CardList} />
                          <FadingRoute path="/app/b/:miniApp" component={MiniAppContainer}/>
                          <FadingRoute path="/app/admin" component={Admin}/>
                      </Switch>
                    </Split>
                  );
          }

          return content;
        /**

         <FadingRoute path="settings" component={SettingsAdmin}/>
         <FadingRoute path="admin" component={Admin}/>
         <FadingRoute path="organisation" component={OrganisationAdmin}/>
         <FadingRoute path="users" component={UsersAdmin}/>
         */
    }
};
export default withRouter(Container);
