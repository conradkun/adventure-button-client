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


import TestApp from './screen/test';

import CardList from './screen/card_list';
import MiniAppContainer from './screen/mini_app';
/**
import Admin from './screen/admin'
import OrganisationAdmin from './screen/organisation_admin'
import UsersAdmin from './screen/users_admin'
import SettingsAdmin from './screen/settings_admin'
**/

import {
    Switch,
    BrowserRouter as Router,
    Route,
    Link,
    withRouter
} from 'react-router-dom'

class Container extends Component {

    constructor () {
        super();
        this._onResponsive = this._onResponsive.bind(this);
        this._onMenuOpen = this._onMenuOpen.bind(this);
        this._onMenuClick = this._onMenuClick.bind(this);
        this._logout = this._logout.bind(this);
        this.state = {
            showMenu: true, responsive: 'multiple',
            searchString: ''
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
          console.log("Authenticated");
      })
      .catch(error => {
        if (error.code === 401) {
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

        return (
            <Sidebar ref='sidebar' size='small' separator='right' colorIndex={AppSettings.mainColor}
                     fixed={true}>
                <Header justify='between' size='large' pad={{horizontal: 'medium'}}>
                    {title}
                    {closer}
                </Header>
                <Box flex='grow'
                     justify='start'>
                    <Menu primary={true}>
                        {baremeLink}

                    </Menu>
                </Box>
                <Footer pad='medium'>
                    <Button icon={<User />}/>
                </Footer>
            </Sidebar>
        );


    }

    render () {
        let routeProps = {
            responsive:this.state.responsive,
            onMenuOpen: this._onMenuOpen,
            onLogout: this._logout
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


        return (
                <Split flex='right' priority={priority} fixed={true}
                   onResponsive={this._onResponsive}>
                    {this._renderNav()}
                    <Switch>
                        <FadingRoute exact path='/app' component={CardList} />
                        <FadingRoute path="/app/b/:miniApp" component={MiniAppContainer}/>
                    </Switch>
                </Split>
        );
        /**

         <FadingRoute path="settings" component={SettingsAdmin}/>
         <FadingRoute path="admin" component={Admin}/>
         <FadingRoute path="organisation" component={OrganisationAdmin}/>
         <FadingRoute path="users" component={UsersAdmin}/>
         */
    }
};
export default withRouter(Container);
