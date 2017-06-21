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

export default class VenteGreGreWallonie extends Component {
    constructor(props) {
        super(props);
        let region = this.props.client.get('preferredRegion')
        this.state = {
            region: this.props.client.get('preferredRegion'),
            value: this.props.defaultValue[region]
        }
        this.props.onValueChanged(this.state.value);

    }

    componentWillUpdate(nextProps, nextState){
      if(nextState.region !== this.state.region){
        this.setState({
          value: this.props.defaultValue[nextState.region]
        });
        this.props.onValueChanged(this.props.defaultValue[nextState.region]);
      }
      else {
        this.props.onValueChanged(nextState.value);
      }
    }
    _renderWallonie() {
      return(
            <fieldset key='wal'>
              <Prix
                key='wlp'
                label="Prix de vente"
                defaultValue={0}
                onChange={
                  (value) => {
                      this.setState({value: {...this.state.value, prix: value}})
                  }
              }
              />
            <DroitEnregistrement key='wld' onChange={
                  (value) => {
                      this.setState({
                          value: {
                              ...this.state.value,
                              droitEnregistrement: value
                          }
                      })
                  }
              }
                                   options={[15, 12.5, 6, 5]} default={12.5}/>
              <Annexe onChange={
                  (value) => {
                      this.setState({value: {...this.state.value, annexe: value}})
                  }
              }/>
            {((this.state.value.droitEnregistrement === 6) || (this.state.value.droitEnregistrement === 5))
              ? <PressionImmobiliere
                onChange={
                    (value) => {
                        this.setState({value: {...this.state.value, pressionImmobiliere: value}})
                      }
              }/> : undefined}
            </fieldset>
          )
    }
    _renderFlandre() {
      return(
            <fieldset key='fl'>
              <Prix
                key='flp'
                label="Prix de vente"
                defaultValue={0}
                onChange={
                  (value) => {
                      this.setState({value: {...this.state.value, prix: value}})
                  }
              }
              />
            <DroitEnregistrement key='fld' onChange={
                  (value) => {
                      this.setState({
                          value: {
                              ...this.state.value,
                              droitEnregistrement: value
                          }
                      })
                  }
              }
              options={[10, 5]} default={10}/>
            <Annexe onChange={
                (value) => {
                    this.setState({value: {...this.state.value, annexe: value}})
                }
            }/>
            <AbattementSelect onChange={
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
          )
    }
    _renderBruxelles() {
      return(
            <fieldset key='bx'>
              <Prix
                key='bxp'
                label="Prix de vente"
                defaultValue={0}
                onChange={
                  (value) => {
                      this.setState({value: {...this.state.value, prix: value}})
                  }
              }
              />
              <Annexe onChange={
                  (value) => {
                      this.setState({value: {...this.state.value, annexe: value}})
                  }
              }/>
              <Abattement onChange={
                  (value) => {
                      this.setState({value: {...this.state.value, abattement: value}})
                  }
              }
                          value={175000}
              />
            </fieldset>
          )
    }
    render() {
        let content;
        if(this.state.region === 'wallonie'){
          content = this._renderWallonie();
        }
        else if(this.state.region === 'bruxelles'){
          content = this._renderBruxelles();
        }
        else if(this.state.region === 'flandre'){
          content = this._renderFlandre();
        }
        return (
              <Form>
                  <Header>
                      <Title>
                          Vente de Gré à Gré
                      </Title>
                  </Header>
                  <FormFields>
                          <RegionSelect
                            small={this.props.responsive === 'single' ? true : false}
                            client={this.props.client}
                            onSelect={(v)=>{
                              this.setState({
                                region: v
                              })
                            }}
                          />
                        {content}
                  </FormFields>
              </Form>

        )
    }
}
