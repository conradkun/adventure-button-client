// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Layer from 'grommet/components/Layer';

import OrganisationSelect from './organisation_select';

export default class AddUserModal extends Component {
    constructor () {
        super();

        this._onSubmit = this._onSubmit.bind(this);
        this._onEmailChange = this._onEmailChange.bind(this);
        this._onPasswordChange = this._onPasswordChange.bind(this);
        this._onOrganisationChange = this._onOrganisationChange.bind(this);
        this._onRoleChange = this._onRoleChange.bind(this);

        this.state = {

            email: undefined,
            password: undefined,
            organisation: undefined,
            role: 'user',
        };
    }

    _onSubmit (event){
        event.preventDefault();
        console.log(this.state);
        if (this.state.email && this.state.organisation && this.state.password && (this.state.password.length >= 6)) {
            this.props.onSubmit({
                email: this.state.email,
                password: this.state.password,
                organisation: this.state.organisation,
                role: this.state.role
            });
        }
        else {
            //Bert.alert("Certaines de ces informations ne sont pas correctes!", 'danger', 'fixed-top', 'fa-remove' );
        }
    }

    _onEmailChange (event) {
        this.setState({email: event.target.value});
    }

    _onPasswordChange (event) {
        this.setState({password: event.target.value});
    }

    _onOrganisationChange (organisation) {
        this.setState({organisation});
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
                        <header><h1>Ajouter un utilisateur</h1></header>
                        <FormFields>
                            <fieldset>
                                <FormField label="Email"
                                           >
                                    <input name="email" type="text"
                                           onChange={this._onEmailChange} />
                                </FormField>
                                <FormField label="Mot de passe (Plus de 6 caractères)"
                                           >
                                    <input name="password" type="password"
                                           onChange={this._onPasswordChange} />
                                </FormField>
                                <OrganisationSelect onChange={this._onOrganisationChange}
                                />
                                <FormField label="Role">
                                    <select name="Role"
                                            onChange={this._onRoleChange}>
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
