import React, {Component} from 'react';

import Prix from './input/montant';
import DroitEnregistrement from './input/droit_enregistrement';
import Annexe from './input/annexe';
import AbattementSelect from './input/abattement_select';

import Title from 'grommet/components/Title'
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Header from 'grommet/components/Header';

export default class VenteGreGreWallonie extends Component {
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
                          Vente de Gré à Gré (Flandre)
                      </Title>
                  </Header>
                    <FormFields>
                    <fieldset>
                       <Prix
                           label="Prix de vente"
                           defaultValue={this.props.defaultValue.prix}
                           onChange={
                             (value) => {
                                 this.setState({value: {...this.state.value, prix: value}})
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
                         options={[10, 5]} default={this.props.defaultValue.droitEnregistrement}/>
                       <Annexe
                         defaultValue={this.props.defaultValue.annexe}
                         onChange={
                           (value) => {
                               this.setState({value: {...this.state.value, annexe: value}})
                           }
                       }/>
                       <AbattementSelect
                       defaultValue={this.props.defaultValue.abattement}
                       onChange={
                         (value) => {
                             this.setState({
                                 value: {
                                     ...this.state.value,
                                     abattement: value
                                 }
                             })
                         }
                       }
                       options={[
                         {
                             label: 'Pas d\'abattement',
                             value: 0
                         },
                         {
                             label: 'Abattement sur 15000€',
                             value: 15000
                         },
                         {
                             label: 'Abattement majoré',
                             value: 25000
                         },
                         {
                             label: 'Abattement rénovation',
                             value: 45000
                         },
                       ]}
                       />
                    </fieldset>
                  </FormFields>
              </Form>

        )
    }
}
