import React, { Component } from "react";
import Button from "grommet/components/Button";
import Box from "grommet/components/Box";
import Pulse from "grommet/components/icons/Pulse";
import DeployIcon from "grommet/components/icons/base/Globe";
import { withRouter } from "react-router";
import Value from "grommet/components/Value";
import {Elements} from 'react-stripe-elements';
import {injectStripe} from 'react-stripe-elements';
import {CardElement} from 'react-stripe-elements';
import Checkout from '../components/checkout';
import Anchor from 'grommet/components/Anchor';
import Image from 'grommet/components/Image';
import Logo from '../assets/logo.png';
import * as animationData from './loader.json';
import Lottie from 'react-lottie';
class joinGame extends Component {
  constructor() {
    super();
  }
  handleSubmit = () => {
    // We don't want to let default form submission happen here, which would refresh the page.

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
      console.log('Received Stripe token:', token);
    });

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  }
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData
    };
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
        full={true}
        align='center'
        justify="center"
        pad="medium"
        margin="small"
      >
      {alreadyJoined && <Lottie
          options={defaultOptions}
          height={400}
          width={400}
          isStopped={false}
          isPaused={false}
        />}
        {!alreadyJoined && (
          <Box margin={{vertical: 'large'}}>
          <Pulse
            icon={<DeployIcon colorIndex="light-1" />}
            onClick={() => {
              this.props.sendAction({
                name: "join"
              });
            }}
          />
          </Box>
        )}
        {!alreadyJoined && (
          <Elements>
          <Checkout/>
        </Elements>
        )}
        
        <Value
          value={
            this.props.serverState.players
              ? this.props.serverState.players.length
              : 0
          }
          label="Adventurers in the room"
        />
        {this.props.serverState.players &&
        this.props.serverState.players[0]._id === this.props.userId ? (
          <Button
            label="Start the Game"
            onClick={() => {
              this.props.sendAction({
                name: "startGame"
              });
            }}
          />
        ) : (
          <b>Waiting...</b>
        )}
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
    );
  }
}
export default joinGame;
