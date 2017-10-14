import React, { Component } from 'react'
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Pulse from 'grommet/components/icons/Pulse';
import DeployIcon from 'grommet/components/icons/base/Cube';
import {withRouter} from 'react-router';
import Value from 'grommet/components/Value';

export default class joinGame extends Component {

  render() {
    let alreadyJoined = false;
    if(this.props.serverState.players && this.props.serverState.players.filter((player)=>{
      return player._id === this.props.userId
    }).length > 0){
      alreadyJoined = true;
    }
    return (
      <Box justify='center'
      align='center'
      wrap={false}
      pad='medium'
      full = {true}
      margin='small'
      >
      {!alreadyJoined && <Pulse icon={<DeployIcon  colorIndex="light-1"/>} onClick={()=>{
          this.props.sendAction({
            name: 'join'
          })
        }}/>}
        <Value value={this.props.serverState.players ? this.props.serverState.players.length : 0}
      label='Adventurers in the room'
      />
      </Box>
    )
  }
}
