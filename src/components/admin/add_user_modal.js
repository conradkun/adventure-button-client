
import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Layer from 'grommet/components/Layer';


export default class AddUserModal extends Component {
    constructor(props) {
        super(props);

        this._onSubmit = this._onSubmit.bind(this);
        this._onEmailChange = this._onEmailChange.bind(this);
        this._onPasswordChange = this._onPasswordChange.bind(this);
        this._onRoleChange = this._onRoleChange.bind(this);

        this.state = {
            email: undefined,
            password: undefined,
            organisation: props.organisation,
            role: 'user',
        };
    }

    _onSubmit (event){
        event.preventDefault();
        if (this.state.email && this.state.organisation && this.state.password && (this.state.password.length >= 6)) {
            this.props.msg.success("Cet utilisateur va être ajouté à la base de donnée, veuillez patienter");
            this.props.onSubmit({
                email: this.state.email,
                password: this.state.password,
                organisation: this.state.organisation,
                role: this.state.role
            });
        }
        else {
            this.props.msg.error("Certaines de ces informations ne sont pas correctes!");
        }
    }

    _onEmailChange (event) {
        this.setState({email: event.target.value});
    }

    _onPasswordChange (event) {
        this.setState({password: event.target.value});
    }

    _onRoleChange (event) {
        this.setState({role: event.target.value});
    }

    render () {
        return (
          <div>
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
            </div>
        );
    }
}
