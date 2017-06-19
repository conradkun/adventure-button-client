import React, {Component} from 'react';

import Prix from './input/prix';
import DroitEnregistrement from './input/droit_enregistrement';
import Annexe from './input/annexe';
import ReductionHonoraire from './input/reduction_honoraire';
import Viewer from './viewer/viewer';
import RegionSelect from './input/region_select';
import Bareme from '../../utils/bareme';

import Title from 'grommet/components/Title'
import Section from 'grommet/components/Section';
import Article from 'grommet/components/Article';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Header from 'grommet/components/Header';

export default class VenteGreGreWallonie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: this.props.client.get('preferredRegion'),
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
                          Vente de Gré à Gré
                      </Title>
                  </Header>
                  <FormFields>
                      <fieldset>
                          <RegionSelect
                            small={this.props.responsive === 'single' ? true : false}
                            client={this.props.client}
                            onSelect={(v)=>{
                              this.setState({
                                region: v
                              })
                            }}
                          />
                          <Prix
                            label="Prix de vente"
                            defaultValue={0}
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
                                               options={[12.5, 12, 5, 6]} default={12}/>
                          <Annexe onChange={
                              (value) => {
                                  this.setState({value: {...this.state.value, annexe: value}})
                              }
                          }/>
                          <ReductionHonoraire onChange={
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
