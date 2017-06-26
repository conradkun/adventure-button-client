import React, {Component} from 'react';

import Prix from './input/montant';
import Annexe from './input/annexe';
import ReductionHonoraire from './input/reduction_honoraire';
import DroitEnregistrement from './input/droit_enregistrement';

import Title from 'grommet/components/Title'
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Header from 'grommet/components/Header';

export default class Pret extends Component {
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
                          Prêt
                      </Title>
                  </Header>
                  <FormFields>
                    <fieldset>
                      <Prix
                        label="Prêt augmenté des accessoires"
                        defaultValue={this.props.defaultValue.pret}
                        onChange={
                          (value) => {
                              this.setState({value: {...this.state.value, pret: value}});
                            }
                          }
                        />
                        <DroitEnregistrement onChange={
                              (value) => {
                                  this.setState({
                                      value: {
                                          ...this.state.value,
                                          droitEnregistrement: value
                                      }
                                  })
                              }
                          }
                        options={[1, 0]} default={this.props.defaultValue.droitEnregistrement}/>
                        <Annexe
                          defaultValue={this.props.defaultValue.annexe}
                          onChange={
                            (value) => {
                                this.setState({value: {...this.state.value, annexe: value}})
                            }
                        }/>
                        <ReductionHonoraire
                          defaultValue={this.props.defaultValue.reductionHonoraire}
                          label="Prêt social (réduction des honoraires)"
                          onChange={
                            (value) => {
                                this.setState({value: {...this.state.value, reductionHonoraire: value}})
                            }
                          }/>
                      </fieldset>
                  </FormFields>
              </Form>

        )
    }
}
