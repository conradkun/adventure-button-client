
import React, {Component} from 'react';

import Prix from './input/montant';
import Annexe from './input/annexe';
import NombreBiens from './input/nombre_biens';

import Title from 'grommet/components/Title'
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Header from 'grommet/components/Header';

export default class Partage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.defaultValue
        }
    }

    componentWillUpdate(nextProps, nextState){
        this.props.onValueChanged(nextState.value);
    }

    render() {
        return (
              <Form>
                  <Header>
                      <Title>
                          Partage
                      </Title>
                  </Header>
                  <FormFields>
                    <fieldset>
                      <Prix
                        label="Valeur vénale du patrimoine"
                        defaultValue={0}
                        onChange={
                          (value) => {
                              this.setState({value: {...this.state.value, valeur: value}});
                            }
                          }
                        />
                      <Prix
                        label="Valeur vénale du patrimoine immobilier"
                        key={this.state.value.valeur}
                        defaultValue={this.state.value.valeur}
                        onChange={
                          (value) => {
                              this.setState({value: {...this.state.value, valeurImmobilier: value}})
                            }
                          }
                        />
                        <NombreBiens
                          label="Nombre de biens"
                          defaultValue={0}
                          onChange={
                            (value) => {
                                this.setState({value: {...this.state.value, nombreBiens: value}})
                            }
                        }/>
                        <Annexe onChange={
                            (value) => {
                                this.setState({value: {...this.state.value, annexe: value}})
                            }
                        }/>
                      </fieldset>
                  </FormFields>
              </Form>

        )
    }
}
