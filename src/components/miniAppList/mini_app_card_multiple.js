import React from 'react'
import Card from 'grommet/components/Card';
import RegionSelect from '../common/region_select';
import AppSettings from '../../utils/app_settings';
import {withRouter} from "react-router-dom";

class MiniAppCardMultiple extends React.Component {
  constructor(props){
    super(props);
    this._getCode = this._getCode.bind(this);
    this.state = {
      region: this.props.client.get('preferredRegion')
    }
  }
  _getCode(){
    let code;
    this.props.miniApp.code.forEach((m)=>{
      if(m.region === this.state.region){
        code = m.code
      }
    })
    return code;
  }
  render () {
    let link = `app/b/${this._getCode()}`;
    let basis = 'medium';
    let margin = {
      top: 'large'
    }
    if(this.props.responsive === 'single'){
      basis = 'full'
      margin = {
        ...margin,
        horizontal: 'large'
      }
    }
    return (
          <Card
                margin={margin}
                basis={basis}
                responsive={false}
                key={this.props.miniApp.name}
                className="better_card"
                heading={this.props.miniApp.name}
                colorIndex={AppSettings.cardColor}
                description={<RegionSelect small={true} client={this.props.client} onSelect={(r)=>{
                  this.setState({region: r})
                }}/>}
                onClick={()=>{
                  this.props.history.push(link);
                }}
          />

    );
  }
}

export default withRouter(MiniAppCardMultiple);
