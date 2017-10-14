import React, { Component } from 'react'
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Pulse from 'grommet/components/icons/Pulse';
import DeployIcon from 'grommet/components/icons/base/Cube';
import {withRouter} from 'react-router';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import DateTime from 'grommet/components/DateTime';
import NumberInput from 'grommet/components/NumberInput';
import Image from 'grommet/components/Image';
import Heading from 'grommet/components/Heading';
import Fire from '../assets/fire.png';
import Ice from '../assets/ice.png';

export default class hotColdGame extends Component {
  constructor(props){
    super(props);
    this.state={
      hots: 1, 
      colds: 1,
      temp: 15
    };
    this.handleHotChange = this.handleHotChange.bind(this);
    this.handleColdChange = this.handleColdChange.bind(this);
    this.handleTempChange = this.handleTempChange.bind(this);
  }
  
  handleHotChange(){
      this.setState({hots: this.state.hots + 1});
      this.handleTempChange();
  }
  
  handleColdChange(){
    this.setState({colds: this.state.colds + 1});
    this.handleTempChange();
  }

  handleTempChange(){
    const newTemp = -20 + (this.state.hots / (this.state.colds + this.state.hots))*70;
    if (newTemp < -20) this.setState({temp: -20})
    else {
        if (newTemp > 50) this.setState({temp: 50})
        else this.setState({temp: newTemp})
    }
  }

  render() {
    return (
        <div>
        <Box justify='center'
            align='center'
            wrap={false}
            margin='medium'
            full = {false}
            colorIndex='accent-1'
            onClick={ () => this.handleHotChange()}>
            <br/>
            <Image src={Fire} size='small'/>
            <br/>
        </Box>
        <Box justify='center'
            align='center'
            wrap={false}
            margin='medium'
            full = {false}
            colorIndex='#00FFFF'
            onClick={ () => this.handleColdChange()}>
            <Image src={Ice} size='small'/>
        </Box>
        <Heading align = 'center'>
                {Math.floor(this.state.temp)}ºC
        </Heading>
      </div>
    )
  }
}
