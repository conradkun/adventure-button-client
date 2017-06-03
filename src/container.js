// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP
import React, { Component } from 'react';
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

import EditProfileModal from './components/common/edit_profile_modal'

import CardList from './screen/card_list';
import MiniAppContainer from './screen/mini_app';
import Admin from './screen/admin'
import UsersAdmin from './screen/users_admin'
/**
import OrganisationAdmin from './screen/organisation_admin'

import SettingsAdmin from './screen/settings_admin'
**/

import {
    Switch,
    Route,
    withRouter
} from 'react-router-dom'
import AlertContainer from 'react-alert';
class Container extends Component {

    constructor(props) {
        super(props);
        this.alertOptions = {
          offset: 20,
          position: 'bottom right',
          theme: 'dark',
          time: 4000,
          transition: 'scale'
        };

        this._onResponsive = this._onResponsive.bind(this);
        this._onMenuOpen = this._onMenuOpen.bind(this);
        this._onMenuClick = this._onMenuClick.bind(this);
        this._logout = this._logout.bind(this);
        this._onRequestForEditProfile = this._onRequestForEditProfile.bind(this);
        this._onRequestForEditProfileClose = this._onRequestForEditProfileClose.bind(this);

        this.state = {
            editProfile: false,
            isLoading: true,
            showMenu: true, responsive: 'multiple',
            searchString: '',
            me: props.client.get('user')
        }
    }
    _logout(){
      const client = this.props.client;
      client.logout();
      //Now we have to destroy the localStorage items
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('organisation');
      this.props.history.push('/');
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
    _onRequestForEditProfile() {
      this.setState({
        editProfile: true
      })
    }
    _onRequestForEditProfileClose() {
      this.setState({
        editProfile: false
      })
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
            <Title pad='small' responsive={true}>
                    <Box align='center' direction='row'>
                        <Title>Projet Bareme</Title>
                    </Box>
            </Title>
        );
    }

    _renderAppLogo () {
      return (
          <Title pad='small' responsive={false}>
                  <Box align='center' direction='row'>
                      <Title>IO</Title>
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
        if ('single' === this.state.responsive) {
            closer = (
                <Button icon={<CloseIcon />} onClick={this._onMenuClick}/>
            );
        }

        adminLink = (
            <Anchor path="/app/admin" onClick={this._onMenuClick}>
                Administration
            </Anchor>);

        usersLink = (
            <Anchor path='/app/users' onClick={this._onMenuClick}>
                Collaborateurs
            </Anchor>
        );
        settingsLink = (
            <Anchor path='/app/settings' onClick={this._onMenuClick}>
                Paramètres
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
                     justify='start'
                     align='center'
                     alignContent='center'
                     >
                    <Menu primary={true}>
                        {baremeLink}
                        {this.state.me.role === 'admin' ? adminLink : undefined}
                        {this.state.me.role === 'manager' ? usersLink : undefined}
                        {this.state.me.role === 'manager' ? settingsLink : undefined}
                    </Menu>
                </Box>
                <Footer pad='medium'>
                  <Menu icon={<User />}
                      dropAlign={{"bottom": "bottom"}}>
                    <Anchor onClick={this._logout}>
                        Déconnexion
                    </Anchor>
                    <Anchor onClick={this._onRequestForEditProfile}>
                        Mon profil
                    </Anchor>
                    <Anchor href='#'>
                        Aide
                    </Anchor>
                  </Menu>
                </Footer>
            </Sidebar>
        );


    }

    render () {
        let routeProps = {
            responsive:this.state.responsive,
            onMenuOpen: this._onMenuOpen,
            onLogout: this._logout,
            client: this.props.client,
            renderAppLogo: this._renderAppLogo,
            msg: this.msg
        };
        let fadeDuration = 0.5;
        if(this.state.responsive === 'single'){
          fadeDuration = 0;
        }
        let priority = ('single' === this.state.responsive && this.state.showMenu ?
            'left' : 'right');

        const FadingRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={matchProps => (
                <Fade duration={fadeDuration}>
                    <Component {...matchProps} {...routeProps}/>
                </Fade>
            )}/>
        );
        let modal;
        if(this.state.editProfile){
          modal = <EditProfileModal client={this.props.client} msg={this.msg} onClose={this._onRequestForEditProfileClose} onSubmit={this._onRequestForEditProfileClose}/>
        }
        return (
                  <Split flex='right' priority={priority} fixed={true}
                    onResponsive={this._onResponsive}>
                      {this._renderNav()}
                      <div>
                        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                        <Switch>
                            <FadingRoute exact path='/app' component={CardList} />
                            <FadingRoute path="/app/b/:miniApp" component={MiniAppContainer}/>
                            <FadingRoute path="/app/admin" component={Admin}/>
                            <FadingRoute path="/app/users" component={UsersAdmin}/>
                        </Switch>
                        {modal}
                      </div>
                    </Split>
              );
        }
        /**

         <FadingRoute path="settings" component={SettingsAdmin}/>
         <FadingRoute path="admin" component={Admin}/>
         <FadingRoute path="organisation" component={OrganisationAdmin}/>
         <FadingRoute path="users" component={UsersAdmin}/>
         */
}
export default withRouter(Container);
