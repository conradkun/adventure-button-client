import React, { Component } from 'react'
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Pulse from 'grommet/components/icons/Pulse';
import DeployIcon from 'grommet/components/icons/base/Cube';
import {withRouter} from 'react-router';
export default class createGame extends Component {
  render() {
    
    return (
      <Box justify='center'
      align='center'
      wrap={false}
      pad='medium'
      full = {true}
      margin='small'
      >
      <Pulse icon={<DeployIcon  colorIndex="light-1"/>} onClick={()=>{
            this.props.history.push('/app/configure')
        }}/>
      </Box>
    )
  }
}