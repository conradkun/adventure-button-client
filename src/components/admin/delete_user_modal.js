// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import Footer from 'grommet/components/Footer';
import Layer from 'grommet/components/Layer';
import Label from 'grommet/components/Label';


export default class DeleteUserModal extends Component {
    constructor (props) {
        super(props);
        this._onSubmit = this._onSubmit.bind(this);
        this.state = {
            email: props.email,
        };
    }

    _onSubmit (event){
        event.preventDefault();
        this.props.onSubmit({
            email: this.state.email,
        });
    }


    render () {
        return (
            <Layer onClose={this.props.onClose} closer={true} align="center"
            >
                <Box pad={{vertical: 'large', horizontal: 'small'}}>
                    <Form onSubmit={this._onSubmit}>
                        <header><h1>Confirmation</h1></header>
                        <Label>Êtes vous sur de vouloir supprimer <b>{this.state.email}</b> ?</Label>
                        <Footer pad={{vertical: 'medium'}} justify='center'>
                            <Button label="Oui" primary={true}
                                    onClick={this._onSubmit} type="submit"/>
                        </Footer>
                    </Form>
                </Box>
            </Layer>
        );
    }
}