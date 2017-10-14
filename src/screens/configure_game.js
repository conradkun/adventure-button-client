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
    this.setState({budget: event.value});
  }

  handleFromChange(event){
    if (this.state.untilDate === undefined || event < this.state.untilDate) this.setState({fromDate: event});
  }

  handleUntilChange(event){
    if (this.state.fromDate === undefined || this.state.fromDate < event) this.setState({untilDate: event});
  }
  render() {

    return (
      <Box justify='center'
        align='center'
        wrap={false}
        margin='medium'
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
          <h1>...Until...</h1>
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
            onChange={this.handleBudgetChange} />
        </Form>
        <Button label='Start the adventure'
          onClick={()=>{
            this.props.sendAction( {
              name: 'configure',
              
              date: this.state.fromDate,
              budget: 4,
            })
          }}
          href='#' />
      </Box>
    )
  }
}
