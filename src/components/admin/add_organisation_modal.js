// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Layer from 'grommet/components/Layer';
import Seats from './seats';

export default class AddOrganisationModal extends Component {
    constructor () {
        super();

        this._onSubmit = this._onSubmit.bind(this);
        this._onNameChange = this._onNameChange.bind(this);

        this.state = {
            error: {
              name: undefined
            },
            name: '',
            seats: 1,
        };
    }

    _onSubmit (event){
        event.preventDefault();
        if ((this.state.name.length !== 0) && (this.state.seats >= 1)) {
            this.props.msg.success("Cette organisation va être ajoutée à la base de donnée, veuillez patienter");
            this.props.onSubmit({
                name: this.state.name,
                seats: this.state.seats
            });
        }
        else {
            this.props.msg.error("Certaines de ces informations ne sont pas valides!");
        }
    }

    _onNameChange (event) {
        if(event.target.value.length === 0){
          this.setState({
            error: {
              name: 'Ce nom est invalide'
            }
          });
        } else {
          this.setState({
            error: {
              name: undefined
            }
          });
        }
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
                                <FormField label="Nom" error={this.state.error.name}>
                                    <input name="Nom" type="text"
                                           onChange={this._onNameChange} />
                                </FormField>
                                <Seats onChange={(value)=> {
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
