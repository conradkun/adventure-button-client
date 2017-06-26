import React, {Component} from 'react';

import Prix from './input/montant';
import Annexe from './input/annexe';
import OperationComplementaire from './input/operation_complementaire';

import Title from 'grommet/components/Title'
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Header from 'grommet/components/Header';

export default class MandatHypothecaire extends Component {
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
                          Mandat Hypothécaire
                      </Title>
                  </Header>
                  <FormFields>
                    <fieldset>
                      <Prix
                        label="Montant total du mandat"
                        defaultValue={this.props.defaultValue.montant}
                        onChange={
                          (value) => {
                              this.setState({value: {...this.state.value, montant: value}})
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
                      <OperationComplementaire
                        defaultValue={this.props.defaultValue.operationComplementaire} 
                        onChange={
                              (value) => {
                                  this.setState({value: {...this.state.value, operationComplementaire: value}})
                              }
                          }
                        />
                    </fieldset>
                  </FormFields>
              </Form>

        )
    }
}
