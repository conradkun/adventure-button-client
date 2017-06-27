// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP
import React, {Component} from 'react';
import Fade from 'react-fade';
import {translate} from 'react-i18next';

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
import Notification from 'grommet/components/Notification';


import AppSettings from './utils/app_settings';
import EditProfileModal from './components/common/edit_profile_modal'
import Logo from './components/common/logo';

import miniAppList from './screen/mini_app_list';
import MiniAppContainer from './screen/mini_app';
import Cases from './screen/cases';
import Admin from './screen/admin'
import UsersAdmin from './screen/users_admin'
import SettingsAdmin from './screen/settings'
import Breakdown from './screen/breakdown';


import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import AlertContainer from 'react-alert';

class Container extends Component {

  constructor(props) {
    super(props);
    const {t} = props;
    this.t = t;
    this.alertOptions = {
      offset: 20,
      position: 'top right',
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

    /**
        * Listen to Settings:Patched
        **/
    const client = this.props.client;
    const settings = client.service('settings');
    const organisation = client.service('organisation');
    if(!this.props.offline){
      settings.on('patched', () => {
        //We need to reload the organisation and change the settings
        organisation.get(client.get('user').organisation).then((o) => {
          client.set('organisation', o);
          //Save organisation to localStorage
          let organisationParsed = JSON.stringify(o);
          window.localStorage.setItem("organisation", organisationParsed);
        });
      });
    }

    this.state = {
      editProfile: false,
      isLoading: true,
      showMenu: true,
      responsive: 'multiple',
      searchString: '',
      me: props.client.get('user')
    }
  }
  _logout() {
    const client = this.props.client;
    client.logout();
    //Now we have to destroy the localStorage items
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('organisation');
    this.props.history.push('/');
  }

  _onResponsive(responsive) {
    this.setState({responsive: responsive});
    if ('multiple' === responsive) {
      this.setState({showMenu: true});
    }
    if ('single' === responsive) {
      this.setState({showMenu: false});
    }
  }
  _onRequestForEditProfile() {
    this.setState({editProfile: true})
  }
  _onRequestForEditProfileClose() {
    this.setState({editProfile: false})
  }
  _onMenuOpen() {
    this.setState({showMenu: true});
  }

  _onMenuClick() {
    if ('single' === this.state.responsive) {
      this.setState({showMenu: false});
    }
  }

  _renderTitle() {
    return (

      <Box align='center' direction='row' responsive={false}>
        <Logo multiplier={0.1} margin="40px" color="#FFF"/>
        <Title pad='small' responsive={true}>Baremio</Title>
      </Box>
    );
  }

  _renderAppLogo() {
    return (
      <Title pad='small' responsive={false}>
        <Box align='center' pad='small' direction='row'>
          <Logo multiplier={0.1} margin="40px" color="#FFF"/>
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
    let baremeLink = (
      <Anchor path="/app" onClick={this._onMenuClick}>
        {this.t('navLinkCalculator')}
      </Anchor>
    );
    let casesLink;
    let settingsLink;
    let usersLink;
    let adminLink;
    if ('single' === this.state.responsive) {
      closer = (
        <Button icon={< CloseIcon />} onClick={this._onMenuClick}/>
      );
    }
    casesLink = (
      <Anchor path="/app/cases" onClick={this._onMenuClick}>
        Dossiers
      </Anchor>
    )
    adminLink = (
      <Anchor path="/app/admin" onClick={this._onMenuClick}>
        {this.t('navLinkAdmin')}
      </Anchor>
    );
    usersLink = (
      <Anchor path='/app/users' onClick={this._onMenuClick}>
        {this.t('navLinkUsers')}
      </Anchor>
    );
    settingsLink = (
      <Anchor path='/app/settings' onClick={this._onMenuClick}>
        {this.t('navLinkSettings')}
      </Anchor>
    );

    return (
      <Sidebar ref='sidebar' size='small' separator='right' colorIndex={AppSettings.mainColor} fixed={true}>
        <Header justify='between' size='large' pad={{
          horizontal: 'medium'
        }}>
          {title}
          {closer}
        </Header>
        <Box flex='grow' justify='start' align='center' alignContent='center'>
          <Menu primary={true}>
            {this.state.me.role !== 'admin'
              ? baremeLink
              : undefined}
            {this.state.me.role !== 'admin' && !this.props.offline
              ? casesLink
              : undefined}
            {this.state.me.role === 'admin' && !this.props.offline
              ? adminLink
              : undefined}
            {this.state.me.role === 'manager' && !this.props.offline
              ? usersLink
              : undefined}
            {this.state.me.role === 'manager' && !this.props.offline
              ? settingsLink
              : undefined}
          </Menu>
        </Box>
        <Footer pad='medium'>
          <Menu icon={< User />} dropAlign={{
            "bottom": "bottom"
          }}>
            <Anchor onClick={this._logout}>
              {this.t('navUserMenuLogout')}
            </Anchor>
            <Anchor onClick={this._onRequestForEditProfile}>
              {this.t('navUserMenuMyProfile')}
            </Anchor>
            <Anchor href='#'>
              {this.t('navUserMenuHelp')}
            </Anchor>
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
    if (this.state.responsive === 'single') {
      fadeDuration = 0;
    }
    let priority = ('single' === this.state.responsive && this.state.showMenu
      ? 'left'
      : 'right');

    const FadingRoute = ({
      component: Component,
      ...rest
    }) => (
      <Route {...rest} render={matchProps => (
        <Fade duration={fadeDuration}>
          <Component {...matchProps} {...routeProps}/>
        </Fade>
      )}/>
    );
    let modal;
    if (this.state.editProfile) {
      modal = <EditProfileModal offline={this.props.offline} client={this.props.client} msg={this.msg} onClose={this._onRequestForEditProfileClose} onSubmit={this._onRequestForEditProfileClose}/>
    }
    return (
      <Split flex='right' priority={priority} fixed={true} onResponsive={this._onResponsive}>
        {this._renderNav()}
        <div>
          {this.props.offline ? <Notification message='Vous êtes offline'
            status='warning'
            size='medium' /> : undefined}
          <AlertContainer ref={a => this.msg = a} {...this.alertOptions}/>
          <Switch>
            <FadingRoute exact path='/app' component={miniAppList}/>
            <FadingRoute path="/app/b/:miniAppCode" component={MiniAppContainer}/>
            <FadingRoute path="/app/cases" component={Cases}/>
            <FadingRoute path="/app/admin" component={Admin}/>
            <FadingRoute path="/app/users" component={UsersAdmin}/>
            <FadingRoute path="/app/settings" component={SettingsAdmin}/>
            <FadingRoute path="/app/breakdown" component={Breakdown}/>
            <Redirect to='/app'/>
          </Switch>
          {modal}
        </div>
      </Split>
    );
  }
}
export default translate()(withRouter(Container));
