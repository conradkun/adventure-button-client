import React, { Component } from "react";
import Button from "grommet/components/Button";
import Box from "grommet/components/Box";
import Pulse from "grommet/components/icons/Pulse";
import DeployIcon from "grommet/components/icons/base/Cube";
import { withRouter } from "react-router";
import Value from "grommet/components/Value";
import Headline from "grommet/components/Headline";
import Label from "grommet/components/Label";
import * as animationData from "./location.json";
import Lottie from "react-lottie";
import Anchor from "grommet/components/Anchor";

export default class joinGame extends Component {
  constructor() {
    super();
  }
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData
    };
    return (
      <Box
        justify="top"
        align="center"
        wrap={false}
        pad="medium"
        full={true}
        margin="small"
      >
        <Lottie
          options={defaultOptions}
          height={400}
          width={400}
          isStopped={false}
          isPaused={false}
        />
        <Label>The winning city is:</Label>
        <Headline strong={true} size="small">
          {this.props.serverState.result
            ? this.props.serverState.result.city.name
            : undefined}
        </Headline>
        <Value
          value={
            this.props.serverState.result
              ? this.props.serverState.result.city.price
              : 0
          }
          label="(Return ticket)"
          units="£"
          size="large"
          reverse={false}
          responsive={false}
        />
        <Box margin="large" alig='center'>
          <Anchor
            label="Book your ticket now!"
            href={this.props.serverState.ref_url}
            primary={true}
            target="_blank"
          />
          <Anchor
            label="Reset"
            href="#"
            primary={false}
            onClick={()=>{
                this.props.sendAction({
                    name: 'reset'
                })
            }}
          />
        </Box>
      </Box>
    );
  }
}
