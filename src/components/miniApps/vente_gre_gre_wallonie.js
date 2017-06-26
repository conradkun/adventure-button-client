import React, {Component} from 'react';

import Prix from './input/montant';
import DroitEnregistrement from './input/droit_enregistrement';
import Annexe from './input/annexe';
import PressionImmobiliere from './input/pression_immobiliere';

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
                          Vente de Gré à Gré (Wallonie)
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
                                               options={[15, 12.5, 6, 5]} default={this.props.defaultValue.droitEnregistrement}/>
                          <Annexe
                            defaultValue={this.props.defaultValue.annexe}
                            onChange={
                              (value) => {
                                  this.setState({value: {...this.state.value, annexe: value}})
                              }
                          }/>
                        {((this.state.value.droitEnregistrement === 6) || (this.state.value.droitEnregistrement === 5))
                          ? <PressionImmobiliere
                            defaultValue={this.props.defaultValue.pressionImmobiliere}
                            onChange={
                                (value) => {
                                    this.setState({value: {...this.state.value, pressionImmobiliere: value}})
                                  }
                          }/> : undefined}
                        </fieldset>
                  </FormFields>
              </Form>

        )
    }
}
