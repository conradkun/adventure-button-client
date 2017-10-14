import React, { Component } from 'react'
import Button from 'grommet/components/Button';


export default class createGame extends Component {
  render() {
    
    return (
      <div>
        Hello {this.props.userId}
        <Button label='Label'
        onClick={()=>{
            this.props.sendAction('test', {test: 'test'})
        }}
        href='#' />
      </div>
    )
  }
}
