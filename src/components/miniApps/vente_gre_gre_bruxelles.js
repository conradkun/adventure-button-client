import React, {Component} from 'react';

import Prix from './input/montant';
import Annexe from './input/annexe';
import Abattement from './input/abattement';

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
                          Vente de Gré à Gré (Bruxelles)
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
                        <Annexe
                        defaultValue={this.props.defaultValue.annexe}
                        onChange={
                            (value) => {
                                this.setState({value: {...this.state.value, annexe: value}})
                            }
                        }/>
                        <Abattement
                        defaultValue={this.props.defaultValue.abattement}
                        onChange={
                            (value) => {
                                this.setState({value: {...this.state.value, abattement: value}})
                            }
                        }
                                    value={175000}
                        />
                      </fieldset>
                  </FormFields>
              </Form>

        )
    }
}
