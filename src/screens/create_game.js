import React, { Component } from 'react'
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Pulse from 'grommet/components/icons/Pulse';
import DeployIcon from 'grommet/components/icons/base/Deploy';

export default class createGame extends Component {
  render() {
    
    return (
      <Box justify='start'
      align='center'
      wrap={false}
      pad='medium'
      full = {true}
      margin='small'
      colorIndex='accent-6'>
      <Pulse size='large' icon={<DeployIcon size='small' />} />
        Hello {this.props.userId}
        <Button label='Label'
        onClick={()=>{
            this.props.sendAction('test', {test: 'test'})
        }}
        href='#' />
      </Box>
    )
  }
}
