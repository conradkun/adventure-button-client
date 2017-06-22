// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import Footer from 'grommet/components/Footer';
import Layer from 'grommet/components/Layer';
import Label from 'grommet/components/Label';
import SelectCase from './select_case';

export default class SaveModal extends Component {
    constructor (props) {
        super(props);
        this._onSubmit = this._onSubmit.bind(this);
        this.state = {
            case: undefined,
        };
    }

    _onSubmit (event){
        event.preventDefault();
        let save = {
          caseId: this.state.case,
          miniApp: this.props.miniApp,
          value: this.props.value
        }
        if(!this.state.case){
            this.props.msg.error('Veuillez spécifier un dossier!')
        }
        else {
          this.props.onSubmit(save);
        }
    }


    render () {
        return (
            <Layer onClose={this.props.onClose} closer={true} align="center"
            >
                <Box pad={{vertical: 'large', horizontal: 'small'}}>
                    <Form onSubmit={this._onSubmit}>
                        <header><h1>Ajouter à un dossier</h1></header>
                        <Box margin='small'>
                          <Label>Pour ajouter ce calcul de frais à un dossier, veuillez choisir un dossier dans la liste ci dessous (ou en créer un)</Label>
                        </Box>
                        <SelectCase client={this.props.client} msg={this.props.msg} onChange={
                            (v)=>{
                              this.setState({
                                case: v
                              });
                            }
                          }/>
                        <Footer pad={{vertical: 'medium'}} justify='center'>
                            <Button label="Sauvegarder" primary={true}
                                    onClick={this._onSubmit} type="submit"/>
                        </Footer>
                    </Form>
                </Box>
            </Layer>
        );
    }
}
