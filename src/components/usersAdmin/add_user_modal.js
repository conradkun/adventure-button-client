
import React, { Component } from 'react';
import isEmail from 'validator/lib/isEmail';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Layer from 'grommet/components/Layer';
import CheckBox from 'grommet/components/CheckBox';


export default class AddUserModal extends Component {
    constructor(props) {
        super(props);

        this._onSubmit = this._onSubmit.bind(this);
        this._onEmailChange = this._onEmailChange.bind(this);
        this._onPasswordChange = this._onPasswordChange.bind(this);
        this._onRandomPasswordChange = this._onRandomPasswordChange.bind(this);

        this.state = {
            error: {
              password: undefined,
              email: undefined
            },
            email: '',
            randomPassword: true,
            password: ''
        };
    }

    _onSubmit (event){
        event.preventDefault();
        if ((isEmail(this.state.email)) && (this.state.email.length !== 0) && ((this.state.password && (this.state.password.length >= 6)) || this.state.randomPassword)) {
            this.props.msg.success("Cet utilisateur va être ajouté à la base de donnée, veuillez patienter");
            if(this.state.randomPassword){
              this.props.onSubmit({
                  email: this.state.email,
              });
            }
            else {
              this.props.onSubmit({
                  email: this.state.email,
                  password: this.state.password
                });
            }
        }
        else {
            this.props.msg.error("Certaines de ces informations ne sont pas valides!");
        }
    }

    _onEmailChange (event) {
        if(!isEmail(event.target.value)){
          this.setState({error: {
            password: this.state.error.password,
            email: 'Cette adresse email est invalide'
          }})
        }
        else {
          this.setState({error: {
            password: this.state.error.password,
            email: undefined
          }})
        }
        this.setState({email: event.target.value});
    }

    _onPasswordChange (event) {
        if(event.target.value.length < 6){
          this.setState({error: {
            email: this.state.error.email,
            password: 'Ce mot de passe est trop court'
          }})
        }
        else {
          this.setState({error: {
            email: this.state.error.email,
            password: undefined
          }})
        }
        this.setState({password: event.target.value});
    }

    _onRandomPasswordChange(event) {
        this.setState({
          randomPassword: event.target.checked
        });
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
                                           error={this.state.error.email}
                                           >
                                    <input name="email" type="text"
                                           onChange={this._onEmailChange} />
                                </FormField>
                                <FormField label="Mot de passe aléatoire"
                                           >
                                      <CheckBox
                                        label='Générer un mot de passe aléatoire'
                                        defaultChecked={true}
                                        toggle={true}
                                        onChange={this._onRandomPasswordChange}
                                         />
                                </FormField>
                                <FormField label="Mot de passe (Plus de 6 caractères)"
                                           help={this.state.randomPassword ? "Un mot de passe aléatoire sera généré" : undefined}
                                           error={!this.state.randomPassword ? this.state.error.password : undefined}
                                           >
                                    <input name="password" type="password"
                                           disabled={this.state.randomPassword}
                                           onChange={this._onPasswordChange} />
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
