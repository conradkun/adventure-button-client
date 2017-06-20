import React, {Component} from 'react';
import isMobile from 'is-mobile';

import Box from 'grommet/components/Box';
import Legend from './legend';
import AnnotatedMeter from './annotated_meter';
import {translate} from 'react-i18next';

class Viewer extends Component{
    constructor(props){
      super(props);
      this.t = props.t;
    }

    render(){
        let type ='circle';
        if(isMobile()){
          type = 'bar';
        }
        let sumEtat = 0;
        let sumEtude = 0;
        let value = this.props.value;
        value.sort((a, b) => {return a.etat > b.etat});
        value.filter((s)=>s.etat).forEach((s)=> sumEtat += s.value);
        value.filter((s)=>!s.etat).forEach((s)=> sumEtude += s.value);
        let seriesMeter = [
          {
            colorIndex : 'neutral-1',
            label: this.t('Frais et Taxes Administrative'),
            value: sumEtat
          },
          {
            colorIndex : 'neutral-2',
            label: this.t('Frais et Honoraires de l\'Etude'),
            value: sumEtude
          }
        ]
        value.map((s)=>{
          s.colorIndex = s.etat ? 'neutral-1' : 'neutral-2'
          s.label = this.t(s.label)
          return s;
        });
        let seriesLegend = value;
        return (
            <Box align='start'>
                <AnnotatedMeter
                    size='medium'
                    type={type}
                    units='€'
                    responsive={true}
                    legend={false}
                    series={seriesMeter} />
                  <Box alignSelf='center'>
                        <Legend series={seriesLegend} units='€' total={true}
                                />
                  </Box>
            </Box>
        )
    }
}
export default translate()(Viewer);
