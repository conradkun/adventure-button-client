// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

import React, { Component } from 'react';
import { translate } from 'react-i18next';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Layer from 'grommet/components/Layer';
import CheckBox from 'grommet/components/CheckBox';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';

class EditProfileModal extends Component {
    constructor (props) {
        super(props);
        const { t } = props;
        this.t = t;
        this._onSubmit = this._onSubmit.bind(this);
        this._onPasswordChange = this._onPasswordChange.bind(this);
        this._onPasswordConfirmChange = this._onPasswordConfirmChange.bind(this);
        this._onWantToChangePasswordChange = this._onWantToChangePasswordChange.bind(this);

        this.state = {
            error:{
              password: undefined,
              passwordConfirm: undefined
            },
            wantToChangePassword: false,
            password: '',
            passwordConfirm: ''
        };
    }

    _onSubmit(event) {
        event.preventDefault();
        //Prevent creating a user without having selected an organisation
        if (this.state.wantToChangePassword) {
          if ((this.state.password.length >= 6) && (this.state.password === this.state.passwordConfirm)) {
            const myUserId = this.props.client.get('user')._id;
            const userService = this.props.client.service('users');
            userService.patch(myUserId, {
                password: this.state.password
              })
              .then(() => {
                this.props.msg.success("Votre mot de passe a été modifié");
                this.props.onSubmit();
              })
          }
          else {
            if(this.state.password.length < 6){
              this.props.msg.error("Votre nouveau mot de passe doit faire plus de 6 charactères");
            }
            if(this.state.password !== this.state.passwordConfirm){
              this.props.msg.error("Vérifier le champ de confirmation");
            }
          }
        }
        else {
            this.props.onSubmit();
        }
    }

    _onPasswordChange (event) {
        if(event.target.value.length < 6){
          this.setState({error: {
            password: 'Ce mot de passe est trop court',
            passwordConfirm: this.state.error.passwordConfirm
          }});
        }
        else{
          this.setState({error: {
            password: undefined,
            passwordConfirm: this.state.error.passwordConfirm
          }});
        }
        this.setState({password: event.target.value});
    }
    _onPasswordConfirmChange (event) {
        if(this.state.password !== event.target.value){
          this.setState({error: {
            passwordConfirm: 'Le mot de passe ne correspont pas',
            password: this.state.error.password
          }});
        }
        else{
          this.setState({error: {
            passwordConfirm: undefined,
            password: this.state.error.password
          }});
        }
        this.setState({passwordConfirm: event.target.value});
    }
    _onWantToChangePasswordChange (event) {
        this.setState({wantToChangePassword: event.target.checked});
    }

    render () {
        const me = this.props.client.get('user');
        let org = {
          name: "Pas d'organisation"
        };
        if(me.role !== 'admin'){
          org = this.props.client.get('organisation');
        }
        let permissionLevel;
        if(me.role === 'admin'){
          permissionLevel = 'Administrateur';
        }
        else if(me.role === 'manager'){
          permissionLevel = 'Manager';
        }
        else {
          permissionLevel = 'Standart'
        }
        return (
            <Layer onClose={this.props.onClose} closer={true} align="center"
            >
                <Box pad={{vertical: 'large', horizontal: 'small'}}>
                    <Heading>Votre Profil:</Heading>
                    <Box margin='small'>
                          <span className="small-margin">
                              <Label className="strong-label">Adresse Email: </Label><Label>{me.email}</Label>
                          </span>
                          <span className="small-margin">
                              <Label className="strong-label">Votre organisation: </Label><Label>{org.name}</Label>
                          </span>
                          <span className="small-margin">
                              <Label className="strong-label">Votre niveau de permission: </Label><Label>{permissionLevel}</Label>
                          </span>
                    </Box>
                    <Form onSubmit={this._onSubmit}>
                        <FormFields>
                            <fieldset>
                            <FormField label="Changer votre mot de passe"
                                       >
                                  <CheckBox
                                    defaultChecked={false}
                                    toggle={true}
                                    onChange={this._onWantToChangePasswordChange}
                                     />
                            </FormField>
                            <FormField label="Nouveau mot de passe (Plus de 6 caractères)"
                                       error={this.state.error.password}
                                       >
                                <input name="password" type="password"
                                       disabled={!this.state.wantToChangePassword}
                                       onChange={this._onPasswordChange} />
                            </FormField>
                            <FormField label="Confirmez votre nouveau mot de passe"
                                       error={this.state.error.passwordConfirm}
                                       >
                                <input name="password" type="password"
                                       disabled={!this.state.wantToChangePassword}
                                       onChange={this._onPasswordConfirmChange} />
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

export default translate()(EditProfileModal);
