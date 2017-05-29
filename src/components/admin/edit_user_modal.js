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

import OrganisationSelect from './organisation_select';

export default class EditUserModal extends Component {
    constructor (props) {
        super(props);

        this._onSubmit = this._onSubmit.bind(this);
        this._onOrganisationChange = this._onOrganisationChange.bind(this);
        this._onRoleChange = this._onRoleChange.bind(this);
        console.log(props);
        this.state = {
            email: props.email,
            organisation: props.organisation,
            role: props.role,
        };
    }

    _onSubmit (event){
        event.preventDefault();
        //Prevent creating a user without having selected an organisation
        if(this.state.organisation) {
            this.props.onSubmit({
                email: this.state.email,
                organisation: this.state.organisation,
                role: this.state.role || 'user'
            });
        }
        else {
            //Bert.alert("Veuillez choisir une organisation", 'danger', 'fixed-top', 'fa-remove' );
        }
    }

    _onOrganisationChange (id) {
        this.setState({organisation: id});
    }

    _onRoleChange (event) {
        this.setState({role: event.target.value});
    }

    render () {
        return (
            <Layer onClose={this.props.onClose} closer={true} align="center"
            >
                <Box pad={{vertical: 'large', horizontal: 'small'}}>
                    <Form onSubmit={this._onSubmit}>
                        <header><h1>Modifier un utilisateur</h1></header>
                        <FormFields>
                            <fieldset>
                                <Label>
                                    Utilisateur : {this.props.email}
                                </Label>
                                <OrganisationSelect onChange={this._onOrganisationChange}
                                                    organisationId={this.props.organisation}
                                                    organisationName={this.props.organisationName}
                                />
                                <FormField label="Role">
                                    <select name="Role"
                                            onChange={this._onRoleChange} defaultValue={this.state.role}>
                                        <option value="user">Collaborateur</option>
                                        <option value="organisationManager">Manager d'organisation</option>
                                        <option value="admin">Administrateur</option>
                                    </select>
                                </FormField>
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
