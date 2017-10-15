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

export default class comfigureGame extends Component {
  constructor(props){
    super(props);
    this.state={
      fromDate: undefined,
      untilDate: undefined,
      budget: 0
    };
    this.handleUntilChange = this.handleUntilChange.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleBudgetChange = this.handleBudgetChange.bind(this);
  }
  
  handleBudgetChange(event){
    this.setState({budget: event.target.valueAsNumber});
    console.log(event)
    console.log(this.state)
  }

  handleFromChange(event){
    this.setState({fromDate: event});
  }

  handleUntilChange(event){
    this.setState({untilDate: event});
  }
  render() {

    return (
      <Box justify='center'
        align='center'
        wrap={false}
        full = {true}
        colorIndex='accent-1'>
      
        <Form>
          <h1>Travel from...</h1>
          <FormField>
            <DateTime id='id'
              name='from'
              format='DD/MM/YYYY'
              value={this.state.fromDate}
              onChange={this.handleFromChange} />
          </FormField>
        </Form>
        <br/>
        <Form>
          <h1>...To...</h1>
          <FormField>
            <DateTime id='id'
              name='until'
              format='DD/MM/YYYY'
              value={this.state.untilDate}
              onChange={this.handleUntilChange} />
          </FormField>
        </Form>
        <br/>
        <Form>
          <h1>How much are you willing to spend?</h1>
          <NumberInput value={this.state.budget}
            name='budget'
            step={50}
            onChange={this.handleBudgetChange} />
        </Form>
        <br/>
        <Button label='Start the adventure'
          onClick={()=>{
            console.log(this.state.untilDate);
            this.props.sendAction( {
              name: 'configure',
              
              fromDate: this.state.fromDate,
              toDate: this.state.untilDate,
              budget: this.state.budget + 1,
            })
          }}
          href='#' />
      </Box>
    )
  }
}
