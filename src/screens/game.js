import React, { Component } from "react";
import Button from "grommet/components/Button";
import Box from "grommet/components/Box";
import Pulse from "grommet/components/icons/Pulse";
import DeployIcon from "grommet/components/icons/base/Cube";
import { withRouter } from "react-router";
import Form from "grommet/components/Form";
import FormField from "grommet/components/FormField";
import DateTime from "grommet/components/DateTime";
import NumberInput from "grommet/components/NumberInput";
import Image from "grommet/components/Image";
import Heading from "grommet/components/Heading";
import Favorite from "grommet/components/icons/base/Target";
import Value from "grommet/components/Value";
import Lottie from "../components/lottie";
import * as animationData from "./like.json";

export default class hotColdGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: undefined,
      counter: 0,
      timer: 10
    };
    this.handleChange = this.handleChange.bind(this);
    this.timer = this.timer.bind(this);
  }

  handleChange() {
    this.setState({ counter: this.state.counter + 1 });
  }

  componentDidMount() {
    var intervalId = setInterval(this.timer, 1000);
    // store intervalId in the state so it can be accessed later:
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }

  timer() {
    // setState method is used to update the state
    if (this.state.timer === 0) {
      this.props.sendAction({
        name: "endGame",
        clicks: this.state.counter,
        city: this.state.city
      });
    }
    this.setState({ timer: this.state.timer - 1 });
  }
  click() {
    console.log("click");
  }
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData
    };
    let component = (
      <Box align="center">
        <Value value={this.state.counter} label="Hits" />
        <Box margin='large'>
        <Pulse
          margin='large'
          icon={<Favorite colorIndex="light-1" />}
          onClick={() => {
            this.handleChange();
          }}
        />
        </Box>
      </Box>
    );
    if (this.state.city === undefined && this.props.serverState.locations) {
      component = this.props.serverState.locations.map(location => {
        return (
            <Button
              style={{margin: '20px', width: '400px'}}
              size='big'
              critical={true}
              label={location.name}
              onClick={() => {
                this.setState({
                  city: location
                });
              }}
            />
        );
      });
    }
    return (
      <div>
        <Box
          justify="center"
          align="center"
          wrap={false}
          margin="medium"
          full={true}
          colorIndex={this.state.city === undefined ? 'brand' : 'light-1'}
        >
          {component}
          {this.state.timer > 0 ? (
            <Box margin='large'>
            <Value value={this.state.timer} label="Seconds Left" /></Box>
          ) : (
            <b>Waiting...</b>
          )}
        </Box>
      </div>
    );
  }
}
