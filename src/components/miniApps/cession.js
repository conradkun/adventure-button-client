import React, {Component} from 'react';

import Prix from './input/montant';
import Annexe from './input/annexe';

import Title from 'grommet/components/Title'
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Header from 'grommet/components/Header';

import FormField from 'grommet/components/FormField';
import CheckBox from 'grommet/components/CheckBox';
import AppSettings from '../../utils/app_settings';

export default class Cession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.defaultValue
        }
    }

    componentWillUpdate(nextProps, nextState){
      if(nextState !== this.state){
        this.props.onValueChanged(nextState.value);
      }
    }

    render() {
        return (
              <Form>
                  <Header>
                      <Title>
                          Cession
                      </Title>
                  </Header>
                  <FormFields>
                    <fieldset>
                      <Prix
                        label="Valeur du ou des lot(s) cédé(s)"
                        defaultValue={this.props.defaultValue.valeur}
                        onChange={
                          (value) => {
                              this.setState({value: {...this.state.value, valeur: value}});
                            }
                          }
                        />
                      <Prix
                        label="Montant utilisé dans le calcul des droits d'enregistrement"
                        key={this.state.value.valeur}
                        defaultValue={this.props.defaultValue.valeurDroitEnregistrement || this.state.value.valeur}
                        onChange={
                          (value) => {
                              this.setState({value: {...this.state.value, valeurDroitEnregistrement: value}})
                            }
                          }
                        />
                        <Annexe
                          defaultValue={this.props.defaultValue.annexe}
                          onChange={
                            (value) => {
                                this.setState({value: {...this.state.value, annexe: value}})
                            }
                        }/>
                        <FormField>
                            <CheckBox
                                label="Flandre (droit d'enregistrement à 2.5%)"
                                defaultValue={this.props.defaultValue.flandre}
                                toggle={AppSettings.toggleInsteadOfCheckbox}
                                onChange={(e) => {
                                    let value = e.target.checked;
                                    this.setState({value: {...this.state.value, flandre: value}})
                                }}
                            />
                        </FormField>
                      </fieldset>
                  </FormFields>
              </Form>

        )
    }
}
