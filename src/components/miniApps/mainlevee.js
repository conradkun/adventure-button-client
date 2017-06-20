import React, {Component} from 'react';

import Prix from './input/montant';
import DroitEnregistrement from './input/droit_enregistrement';
import Annexe from './input/annexe';
import PressionImmobiliere from './input/pression_immobiliere';
import RegionSelect from './input/region_select';
import Abattement from './input/abattement';
import AbattementSelect from './input/abattement_select';

import Title from 'grommet/components/Title'
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Header from 'grommet/components/Header';

export default class MainLevee extends Component {
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
                          Mainlevée
                      </Title>
                  </Header>
                  <FormFields>
                    <fieldset>
                      <Prix
                        label="Inscription"
                        defaultValue={0}
                        onChange={
                          (value) => {
                              this.setState({value: {...this.state.value, inscription: value}})
                            }
                          }
                        />
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
