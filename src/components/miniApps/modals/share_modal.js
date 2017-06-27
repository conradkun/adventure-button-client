// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import Footer from 'grommet/components/Footer';
import Layer from 'grommet/components/Layer';
import Label from 'grommet/components/Label';
import EmailsSelect from '../../common/emails_select'

export default class SaveModal extends Component {
    constructor (props) {
        super(props);
        this._onSubmit = this._onSubmit.bind(this);
        this.state = {
          emails : []
        }
    }

    _onSubmit (event){
        event.preventDefault();
        if(this.state.emails.length > 0){
          this.props.onSubmit(this.state.emails)
        }
        else {
          this.props.msg.error('Veuillez ajouter au moins une adresse email!')
        }
    }

    render () {
        return (
            <Layer onClose={this.props.onClose} closer={true} align="center"
            >
                <Box pad={{vertical: 'large', horizontal: 'small'}}>
                    <Form onSubmit={this._onSubmit}>
                        <header><h1>Partager</h1></header>
                        <Box margin='small'>
                          <Label>Partager ce calcul de frais</Label>
                          <EmailsSelect msg={this.props.msg} onChange={(emails)=>{this.setState({
                              emails: emails
                            })}}/>
                        </Box>

                        <Footer pad={{vertical: 'medium'}} justify='center'>
                            <Button label="Partager" primary={true}
                                    onClick={this._onSubmit} type="submit"/>
                        </Footer>
                    </Form>
                </Box>
            </Layer>
        );
    }
}
