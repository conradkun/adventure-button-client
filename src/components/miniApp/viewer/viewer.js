import React, {Component} from 'react';

import AppSettings from '../../../utils/app_settings';
import Bareme from '../../../utils/bareme';
import isMobile from 'is-mobile';

import Box from 'grommet/components/Box';
import AnnotatedMeter from './annotated_meter';

export default class Viewer extends Component{

    render(){
        let { series } = this.props;
        let type ='circle';
        if(isMobile()){
          type = 'bar';
        }
        return (
            <Box align='center'
                 className="drop-shadow"
                 pad='large'
                 margin='small'
                 colorIndex={AppSettings.cardColor}>
                <AnnotatedMeter
                    size='medium'
                    type={type}
                    units='€'
                    responsive={true}
                    legend={true}
                    series={series} />

            </Box>
        )
    }
}
