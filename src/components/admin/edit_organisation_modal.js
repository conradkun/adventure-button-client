// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Layer from 'grommet/components/Layer';
import Label from 'grommet/components/Label';

import Seats from './seats';


export default class EditOrganisationModal extends Component {
    constructor (props) {
        super(props);

        this._onSubmit = this._onSubmit.bind(this);
        this._onNameChange = this._onNameChange.bind(this);


        this.state = {
            id: props.id,
            name: props.name,
            seats: props.seats,
        };
    }
    _onSubmit (event){
        event.preventDefault();
        if ((this.state.name !== "") && (this.state.seats >= 1)) {
            this.props.onSubmit(this.state.id, {
                name: this.state.name,
                seats: this.state.seats
            });
        }
        else {
            //Bert.alert("Veuillez choisir un nom et un nombre d'utilisateurs valide", 'danger', 'fixed-top', 'fa-remove' );
        }
    }

    _onNameChange (event) {
        this.setState({name: event.target.value});
    }

    render () {
        return (
            <Layer onClose={this.props.onClose} closer={true} align="center"
            >
                <Box pad={{vertical: 'large', horizontal: 'small'}}>
                    <Form onSubmit={this._onSubmit}>
                        <header><h1>Modifier une organisation</h1></header>
                        <FormFields>
                            <fieldset>
                                    <Label>
                                        Organisation : <b>{this.state.name}</b>
                                    </Label>
                                <FormField label="Organisation"
                                >
                                    <input name="organisation" type="text" defaultValue={this.state.name}
                                           onChange={this._onNameChange} />
                                </FormField>
                                    <Seats defaultValue={this.props.seats}
                                                   onChange={(value)=> {
                                        this.setState({seats: value})
                                    }}/>
                            </fieldset>
                        </FormFields>
                        <Footer pad={{vertical: 'medium'}} justify='center'>
                            <Button label="OK" primary={true}
                                    onClick={this._onSubmit} type="submit"/>
                        </Footer>
                    </Form>
                </Box>
            </Layer>
        );
    }
}
