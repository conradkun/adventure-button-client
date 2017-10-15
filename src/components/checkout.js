// CheckoutForm.js
import React from 'react';
import {injectStripe} from 'react-stripe-elements';

import {CardElement} from 'react-stripe-elements';
import Button from 'grommet/components/Button'
import Box from 'grommet/components/Box'
import CreditCard from 'grommet/components/icons/base/CreditCard'
class CheckoutForm extends React.Component {
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
    return (
    <Box margin={{vertical: 'large'}} pad={{between: 'large'}}>
        <CardElement style={{base: {fontSize: '18px'}}} />
        <Button icon={<CreditCard/>} style={{width: '400px'}}label='Confirm Credit Card' onClick={()=>{this.handleSubmit()}}/>
    </Box>
    );
  }
}

export default injectStripe(CheckoutForm);