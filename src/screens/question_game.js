import React, { Component } from "react";
import Button from "grommet/components/Button";
import Box from "grommet/components/Box";
import Pulse from "grommet/components/icons/Pulse";
import DeployIcon from "grommet/components/icons/base/Cube";
import { withRouter } from "react-router";
import Value from "grommet/components/Value";
import Headline from "grommet/components/Headline";

export default class joinGame extends Component {
  render() {
    return (
      <Box
        justify="center"
        align="center"
        wrap={false}
        pad="medium"
        full={true}
        margin="small"
      >
        <Headline strong={true} size="medium">
          {this.props.serverState.gameSpecific.question}
        </Headline>
        <Box responsive={false} direction="row" pad={{ between: "large" }}>
          <Button label="Yes" onClick={()=>{
              this.props.sendAction({
                  name: 'move',
                  gameSpecific: true
              })
              this.props.sendAction({
                  name: 'endMinigame',
              })
              }}/>
              <Button label="No" onClick={()=>{
              this.props.sendAction({
                  name: 'move',
                  gameSpecific: false
              })
              this.props.sendAction({
                  name: 'endMinigame',
              })
              }}/>
        </Box>
      </Box>
    );
  }
}
