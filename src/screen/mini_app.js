import React, {Component} from 'react';

import MenuIcon from 'grommet/components/icons/base/Menu';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious';
import Actions from 'grommet/components/icons/base/Actions';
import FloatingButton from '../components/common/floating-button/floating-button';
import MainButton from '../components/common/floating-button/main-button';
import ChildButton from '../components/common/floating-button/child-button';

import AppSettings from '../utils/app_settings';
import Types from '../types';

export default class MiniAppContainer extends Component {
  constructor(props) {
    super(props);
    this.miniApp = this._getMiniAppComponent(this.props.match.params.miniApp);
    if (!this.miniApp) {
      this.miniApp = <p>Error, this mini App doesnt exist</p>;
    }
  }
  _getMiniAppComponent(code) {
    let component = undefined;
    Types.forEach((type) => {
      if (type.code === code) {
        component = React.cloneElement(type.component, {
          client: this.props.client,
          responsive: this.props.responsive
        });;
      }
    });
    return component;
  }

  _renderHeader() {
    /**
         * First create the header and add some button if the user is mobile
         */
    let appLogo;
    let mobileButton;
    let goBack;
    let colorIndex = 'light-1';
    let justify = 'between';
    if ('single' === this.props.responsive) {
      justify = 'end';
      appLogo = this.props.renderAppLogo();
      colorIndex = AppSettings.mainColor;
      mobileButton = (
        <Anchor icon={< MenuIcon />} onClick={this.props.onMenuOpen}></Anchor>
      );
    }
    goBack = (
      <Anchor icon={< LinkPrevious />} primary={false} animateIcon={true} path="/app"></Anchor>
    );
    return (
      <Header size='small' className="drop-shadow-bottom" colorIndex={colorIndex} fixed={true}>
        {appLogo}
        <Box flex={true} justify={justify} pad="small" direction='row' responsive={false}>
          {goBack}
          {mobileButton}
        </Box>
      </Header>
    );
  }

  render() {
    var effect = 'zoomin',
      pos = 'br',
      method = 'click';
    return (
      <Box full='vertical' colorIndex={AppSettings.backgroundColor}>
        {this._renderHeader()}
        <Box full='horizontal'>
          {this.miniApp}
        </Box>
        <FloatingButton effect={effect} method={method} position={pos}>
          <MainButton iconResting="ion-plus-round" iconActive="ion-close-round"/>
          <ChildButton onClick={(e) => {
              console.log(e);
              e.preventDefault();
            }
          }icon="ion-android-share-alt" label="Partager"/>
          <ChildButton icon="ion-android-archive" label="Sauvegarder"/>
        </FloatingButton>
      </Box>
    )
  }
}
