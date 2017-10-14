import React, { Component } from "react";
import Button from "grommet/components/Button";
import Box from "grommet/components/Box";
import Pulse from "grommet/components/icons/Pulse";
import DeployIcon from "grommet/components/icons/base/Cube";
import { withRouter } from "react-router";
import Value from "grommet/components/Value";

export default class joinGame extends Component {
  constructor(){
    super();
    this.timer = this.timer.bind(this);
    this.state = {
      currentCount: 5
    }
  }
  componentDidMount() {
    var intervalId = setInterval(this.timer, 1000);
    // store intervalId in the state so it can be accessed later:
    this.setState({ intervalId: intervalId});
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }

  timer() {
    // setState method is used to update the state
    if(this.state.currentCount <= 0){
      this.props.sendAction({
        name: 'startGame'
      })
    }
    this.setState({ currentCount: this.state.currentCount - 1 });
  }
  render() {
    let alreadyJoined = false;
    if (
      this.props.serverState.players &&
      this.props.serverState.players.filter(player => {
        return player._id === this.props.userId;
      }).length > 0
    ) {
      alreadyJoined = true;
    }
    return (
      <Box
        justify="center"
        align="center"
        wrap={false}
        pad="medium"
        full={true}
        margin="small"
      >
        {!alreadyJoined && (
          <Pulse
            icon={<DeployIcon colorIndex="light-1" />}
            onClick={() => {
              this.props.sendAction({
                name: "join"
              });
            }}
          />
        )}
        <Value
          value={
            this.props.serverState.players
              ? this.props.serverState.players.length
              : 0
          }
          label="Adventurers in the room"
        />
        {this.props.serverState.players && this.props.serverState.players[0]._id === this.props.userId ? <Value
          value={
            this.state.currentCount
          }
          label="Seconds before starting"
        /> : <b>Waiting...</b>}
        
      </Box>
    );
  }
}
