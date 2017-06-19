import React, {Component} from 'react';

import Prix from './input/montant';
import DroitEnregistrement from './input/droit_enregistrement';
import Annexe from './input/annexe';
import PressionImmobiliere from './input/pression_immobiliere';
import RegionSelect from './input/region_select';
import Abattement from './input/abattement';

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
            <fieldset>
              <Prix
                key='bx'
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

    _renderBruxelles() {
      return(
            <fieldset>
              <Prix
                key='wal'
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
              }/>
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