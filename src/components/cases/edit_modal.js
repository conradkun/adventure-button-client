import React, {Component} from 'react';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import Columns from 'grommet/components/Columns';
import Viewer from '../miniApps/viewer/viewer';
import Layer from 'grommet/components/Layer';

import AppSettings from '../../utils/app_settings';
import {miniApps} from '../../miniApps';
import i18n from '../../i18n';

export default class EditModal extends Component {
  constructor(props) {
    super(props);
    this.error = false
    this._onValueChanged = this._onValueChanged.bind(this);
    this._onSave = this._onSave.bind(this);



    this.miniApp = this._getMiniApp(props.code);
    if (!this.miniApp) {
      this.error = true;
    }

    this.compute = this.miniApp.compute;

    this.miniAppInput = React.cloneElement(this.miniApp.input, {
      noAutoOnValueChanged: true,
      client: props.client,
      onValueChanged: this._onValueChanged,
      defaultValue: props.value,
      responsive: props.responsive
    });



    let result = this.compute(this.props.client.get('organisation').settings, props.value);
    this.result = result;
    this.state = {
      value: props.value,
      result: result
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
    console.log(value);
    this.value = value;
    this.result = this.compute(this.props.client.get('organisation').settings, value);
    this.forceUpdate();
  }


  _onSave(){
    const client = this.props.client;
    const saves = client.service('saves');
    let save = {
      miniAppCode: this.miniApp.code,
      miniAppName: this.miniApp.name,
      value: this.value,
      result: this.result
    };
    saves.patch(this.props.id, save)
    .then((s)=>{
      this.props.msg.success('Sauvegarde réussie!');
    })
  }

  _renderContent() {
    return(
              <Box justify='center' margin={this.props.responsive === 'single' ? 'none' : 'large'} basis='full' direction='row'>
                  <Box align='center'
                       pad={{
                         between: 'large'
                       }}
                       margin={this.props.responsive === 'single' ? 'none' : 'large'}
                       colorIndex={AppSettings.cardColor}>
                      {this.miniAppInput}
                      <Button label="Sauvegarder" primary={true} onClick={()=>{
                          this._onSave()
                      }}/>
                  </Box>
                  <Box align='center'
                    margin={this.props.responsive === 'single' ? 'none' : 'large'}
                       colorIndex={AppSettings.cardColor}>
                       <Viewer i18n={i18n} value={this.result}/>
                  </Box>
              </Box>
    )
  }
  render() {
    return (
      <Layer colorIndex={AppSettings.backgroundColor} closer={true} onClose={this.props.onClose} >
        <Box>
        {this.error ? <b>ERROR</b> : this._renderContent()}
        </Box>
      </Layer>
    )
  }
}
