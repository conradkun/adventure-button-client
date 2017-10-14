import React, { Component } from 'react'
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Pulse from 'grommet/components/icons/Pulse';
import DeployIcon from 'grommet/components/icons/base/Cube';
import {withRouter} from 'react-router';
export default class comfigureGame extends Component {
  render() {
    
    return (
      <Box justify='center'
      align='center'
      wrap={false}
      pad='medium'
      full = {true}
      margin='small'
      colorIndex='accent-6'>
      {console.log('configure')}
      <Button label='test' onClick={()=>{

        this.props.sendAction('configure',{budget: 100, date: new Date()})
        
        }}/>
      </Box>
    )
  }
}
