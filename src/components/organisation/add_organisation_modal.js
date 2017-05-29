// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Layer from 'grommet/components/Layer';
import NumberOfUsers from './number_of_users';

export default class AddOrganisationModal extends Component {
    constructor () {
        super();

        this._onSubmit = this._onSubmit.bind(this);
        this._onNameChange = this._onNameChange.bind(this);

        this.state = {
            name: undefined,
            maximumNumberOfUsers: 1,
        };
    }

    _onSubmit (event){
        event.preventDefault();
        if ((this.state.name !== "") && (this.state.maximumNumberOfUsers >= 1)) {
            this.props.onSubmit({
                name: this.state.name,
                maximumNumberOfUsers: this.state.maximumNumberOfUsers
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
                        <header><h1>Ajouter une organisation</h1></header>
                        <FormFields>
                            <fieldset>
                                <FormField label="Name"
                                           >
                                    <input name="name" type="text"
                                           onChange={this._onNameChange} />
                                </FormField>
                                <NumberOfUsers onChange={(value)=> {
                                    this.setState({maximumNumberOfUsers: value})
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
