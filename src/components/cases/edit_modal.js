import React, {Component} from 'react';

import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Columns from 'grommet/components/Columns';
import Viewer from '../components/miniApps/viewer/viewer';


import AppSettings from '../utils/app_settings';
import miniApps from '../miniApps';

export default class MiniAppContainer extends Component {
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
      client: props.client,
      onValueChanged: this._onValueChanged,
      defaultValue: this.props.value,
      responsive: this.props.responsive
    });



    let result = this.compute(this.props.client.get('organisation').settings, props.value);

    this.state = {
      value: props.value,
      save: false,
      share: false,
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

  _onSave(caseId){
    this.setState({
      save: false
    });
    const client = this.props.client;
    const saves = client.service('saves');
    let save = {
      caseId: caseId,
      miniAppCode: this.miniApp.code,
      miniAppName: this.miniApp.name,
      value: this.state.value,
      result: this.state.result
    };
    saves.create(save)
    .then((s)=>{
      this.props.msg.success('Sauvegarde réussie!');
    })
  }

  _renderHeader() {

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
          </Section>
      </Article>
    )
  }
  render() {
    return (
      <Box full='vertical' colorIndex={AppSettings.backgroundColor}>
        {this._renderHeader()}
        <Box full='horizontal'>
        {this.error ? <b>ERROR</b> : this._renderContent()}
        </Box>
      </Box>
    )
  }
}
