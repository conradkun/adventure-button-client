import React, {Component} from 'react';

import AppSettings from '../../../utils/app_settings';
import Bareme from '../../../utils/bareme';

import Box from 'grommet/components/Box';
import AnnotatedMeter from './annotated_meter';

export default class Viewer extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        let { series } = this.props;
        return (
            <Box align='center'
                 pad='medium'
                 margin='small'
                 colorIndex={AppSettings.cardColor}>
                <AnnotatedMeter
                    size='medium'
                    type='circle'
                    units='€'
                    responsive={false}
                    legend={true}
                    series={series} />

            </Box>
        )
    }
}

