import React, {Component} from 'react';

import Prix from './input/montant';
import Annexe from './input/annexe';

import Title from 'grommet/components/Title'
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Header from 'grommet/components/Header';

export default class Credit extends Component {
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
                          Crédit
                      </Title>
                  </Header>
                  <FormFields>
                    <fieldset>
                      <Prix
                        label="Crédit augmenté des accessoires"
                        defaultValue={0}
                        onChange={
                          (value) => {
                              this.setState({value: {...this.state.value, credit: value}})
                            }
                          }
                        />
                      <Prix
                        label="Inscription hypothécaire"
                        value={this.state.value.credit}
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
