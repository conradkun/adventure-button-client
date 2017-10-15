import React, { Component } from "react";
import Button from "grommet/components/Button";
import Box from "grommet/components/Box";
import Pulse from "grommet/components/icons/Pulse";
import DeployIcon from "grommet/components/icons/base/Launch";
import { withRouter } from "react-router";
import Form from "grommet/components/Form";
import FormField from "grommet/components/FormField";
import DateTime from "grommet/components/DateTime";
import NumberInput from "grommet/components/NumberInput";
import Heading from "grommet/components/Heading";
import Particles from "react-particles-js";
import * as params from './particlesjs-config.json';

export default class comfigureGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: undefined,
      untilDate: undefined,
      stage1: true,
      budget: 0
    };
    this.handleUntilChange = this.handleUntilChange.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleBudgetChange = this.handleBudgetChange.bind(this);
  }

  handleBudgetChange(event) {
    this.setState({ budget: event.target.valueAsNumber });
    console.log(event);
    console.log(this.state);
  }

  handleFromChange(event) {
    this.setState({ fromDate: event });
  }

  handleUntilChange(event) {
    this.setState({ untilDate: event });
  }
  render() {
    let stage2 = (
      <Box
        justify="center"
        align="center"
        wrap={false}
        full={true}
        colorIndex="accent-1"
      >
        <Heading margin="large" uppercase={true}>
          ADVENTURE BUTTON
        </Heading>
        <Form>
          <h1>Travel from...</h1>
          <FormField>
            <DateTime
              id="id"
              name="from"
              format="DD/MM/YYYY"
              value={this.state.fromDate}
              onChange={this.handleFromChange}
            />
          </FormField>
        </Form>
        <br />
        <Form>
          <h1>...To...</h1>
          <FormField>
            <DateTime
              id="id"
              name="until"
              format="DD/MM/YYYY"
              value={this.state.untilDate}
              onChange={this.handleUntilChange}
            />
          </FormField>
        </Form>
        <br />
        <Form>
          <h1>How much are you willing to spend?</h1>
          <NumberInput
            value={this.state.budget}
            name="budget"
            step={50}
            onChange={this.handleBudgetChange}
          />
        </Form>
        <br />
        <Button
          label="Start the adventure"
          onClick={() => {
            console.log(this.state.untilDate);
            this.props.sendAction({
              name: "configure",

              fromDate: this.state.fromDate,
              toDate: this.state.untilDate,
              budget: this.state.budget + 1
            });
          }}
          href="#"
        />
      </Box>
    );
    let stage1 = (
      <Box
        justify="center"
        align="center"
        wrap={false}
        full={true}
        style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}
        colorIndex="light-1"
      >
        <Pulse
          icon={<DeployIcon colorIndex="light-1" />}
          onClick={() => {
            this.setState({
              stage1: false
            });
          }}
        />
      </Box>
    );
    return (
      <Box>
        {this.state.stage1 ? stage1 : stage2}
      </Box>
    );
  }
}
