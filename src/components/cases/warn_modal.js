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
    }

    _onSubmit (event){
        this.props.onSubmit();
    }


    render () {
        return (
            <Layer onClose={this.props.onClose} closer={true} align="center"
            >
                <Box pad={{vertical: 'large', horizontal: 'small'}}>
                    <Form onSubmit={this._onSubmit}>
                        <header><h1>Avertissement</h1></header>
                        <Label>Ce calcul de provision a été effectué avec une version antérieure des paramètres de votre étude.
                        Si vous modifiez ce calcul maintenant, le résultat pourrait être différent.
                        Êtes-vous sur(e) de vouloir continuer?</Label>
                        <Footer pad={{vertical: 'medium'}} justify='center'>
                        <Box direction='row' responsive={false} flex={'grow'} justify='center' pad={{
                            between: "large"
                          }}>
                            <Button margin='medium' label="Oui" primary={false}
                                    onClick={this._onSubmit} type="submit"/>
                            <Button margin='medium' label="Non" primary={true}
                                    onClick={this._onClose} type="submit"/>
                        </Box>
                        </Footer>
                    </Form>
                </Box>
            </Layer>
        );
    }
}
