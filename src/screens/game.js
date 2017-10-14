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
import SendIcon from 'grommet/components/icons/base/Send';

export default class hotColdGame extends Component {
  constructor(props){
    super(props);
    this.state={
      city: undefined,
      counter: 0,
      timer: 20
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(){
      this.setState({counter: this.state.counter + 1});
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
        name: 'endGame',
        counter: this.state.counter,
        city: this.state.city
      })
    }
    this.setState({ timer: this.state.timer - 1 });
  }


  render() {
    let component = (
      <Pulse
      icon={<SendIcon colorIndex="light-1" />}
      onClick={() => {
        this.handleChange()
      }}
    />
    )
    if (this.state.city === undefined){
      component = this.props.serverState.locations.map((location)=>{
        return (
          <Button label={location.name} onClick={()=>{
            this.setState({
              city: location
            })
          }}/>
        );
      })
    }
    return (
        <div>
        <Box justify='center'
            align='center'
            wrap={false}
            margin='medium'
            full = {true}
            colorIndex='accent-1'>
          {component}
        </Box>
      </div>
    )
  }
}
