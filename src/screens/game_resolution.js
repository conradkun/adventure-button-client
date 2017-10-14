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
import GamepadIcon from 'grommet/components/icons/base/Gamepad';


export default class gameResolution extends Component {
  
  
    constructor(props){
    super(props);
    this.state={
      drinks: false, 
      waiting: false
    };
    this.hasToDrink = this.hasToDrink.bind(this);
  }
  
  isWaiting(){
    this.setState({waiting: true});
  }

  hasToDrink(){
    if(this.props.serverState.drinkers && this.props.serverState.drinkers.filter((player)=>{
        return player._id === this.props.userId
      }).length > 0){
         this.setState({drinks: true});
      }
  }

  render() {
    this.hasToDrink();
    return (
      <Box justify='center'
        align='center'
        wrap={false}
        margin='medium'
        full = {true}
        colorIndex='accent-1'>
        
        {(this.state.drinks) ?
            <h1> DRINK FOR THE BEAUTY OF THIS WORLD!!! </h1>:
            <h1> Not your lucky day today :( </h1>
        }

        <Button icon={<GamepadIcon />}
            label='Next game'
            onClick= {
                ()=>{  
                    this.props.sendAction({name: 'nextMinigame'})
                    this.isWaiting()
                }
            }
            href='#'
        primary={false} />  
        <br/>
        {(this.state.waiting) ?
            <h1> Waiting for other players </h1>:<h1/>
        }          
      </Box>
    )
  }
}
