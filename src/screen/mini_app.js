import React, {Component} from 'react';

import MenuIcon from 'grommet/components/icons/base/Menu';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Columns from 'grommet/components/Columns';
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious';
import FloatingButton from '../components/common/floating-button/floating-button';
import MainButton from '../components/common/floating-button/main-button';
import ChildButton from '../components/common/floating-button/child-button';
import Viewer from '../components/miniApps/viewer/viewer';
import SaveModal from '../components/miniApps/modals/save_modal';

import AppSettings from '../utils/app_settings';
import miniApps from '../miniApps';

export default class MiniAppContainer extends Component {
  constructor(props) {
    super(props);
    this.error = false
    this._onValueChanged = this._onValueChanged.bind(this);
    this._onRequestForSave = this._onRequestForSave.bind(this);
    this._onRequestForSaveClose = this._onRequestForSaveClose.bind(this);
    this._onSave = this._onSave.bind(this);



    this.miniApp = this._getMiniApp(this.props.match.params.miniAppCode);
    if (!this.miniApp) {
      this.error = true;
    }

    this.defaultValue = this.miniApp.defaultValue;
    this.compute = this.miniApp.compute;

    this.miniAppInput = React.cloneElement(this.miniApp.input, {
      client: this.props.client,
      onValueChanged: this._onValueChanged,
      defaultValue: this.defaultValue,
      responsive: this.props.responsive
    });



    let defaultResult = this.compute(this.props.client.get('organisation').settings, this.defaultValue);

    if (!this.miniAppInput) {
      this.error = true;
    }

    this.state = {
      value: this.defaultValue,
      save: false,
      share: false,
      result: defaultResult
    }
  }

  _getMiniApp(code) {
    let miniApp = undefined;
    miniApps.forEach((ma) => {
      if (ma.code === code) {
        miniApp = ma;
      }
    });
    return miniApp;
  }


  _onValueChanged(value) {
    this.setState({value: value});
    this.setState({result: this.compute(this.props.client.get('organisation').settings, value)});
  }

  _onRequestForSave(){
    this.setState({
      save: true
    })
  }
  _onRequestForSaveClose(){
    this.setState({
      save: false
    })
  }

  _onSave(save){
    this.setState({
      save: false
    });
    const client = this.props.client;
    const saves = client.service('saves');
    saves.create(save)
    .then((s)=>{
      this.props.msg.success('Sauvegarde réussie!');
    })
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

  _renderModal(){
    let modal;
    if(this.state.save){
      modal = (
        <SaveModal client={this.props.client} msg={this.props.msg} onClose={this._onRequestForSaveClose} value={this.state.value} miniAppCode={this.miniApp.code} miniAppName={this.miniApp.name} onSubmit={this._onSave}/>
      )
    }
    return modal;
  }
  _renderContent() {
    return(
      <Article>
          <Section align='center' alignContent='center'>
              <Columns justify='center' size='large'>
                  <Box align='center'
                       className="drop-shadow"
                       pad='large'
                       margin='small'
                       colorIndex={AppSettings.cardColor}>
                      {this.miniAppInput}
                  </Box>
                  <Box align='center'
                       className="drop-shadow"
                       pad='large'
                       margin='small'
                       colorIndex={AppSettings.cardColor}>
                       <Viewer value={this.state.result}/>
                  </Box>
              </Columns>
              {this._renderModal()}
          </Section>
      </Article>
    )
  }
  render() {
    var effect = 'zoomin',
      pos = 'br',
      method = 'click';
    return (
      <Box full='vertical' colorIndex={AppSettings.backgroundColor}>
        {this._renderHeader()}
        <Box full='horizontal'>
        {this.error ? <b>ERROR</b> : this._renderContent()}
        </Box>
        <FloatingButton effect={effect} method={method} position={pos}>
          <MainButton iconResting="ion-plus-round" iconActive="ion-close-round"/>
          <ChildButton onClick={() => {
              console.log('clicked');
            }
          }icon="ion-android-share-alt" label="Partager"/>
          <ChildButton onClick={() => {
              this._onRequestForSave();
            }
          }icon="ion-android-archive" label="Sauvegarder"/>
        </FloatingButton>
      </Box>
    )
  }
}
