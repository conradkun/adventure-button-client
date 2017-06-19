import React, {Component} from 'react';
import isMobile from 'is-mobile';

import Box from 'grommet/components/Box';
import AnnotatedMeter from './annotated_meter';

export default class Viewer extends Component{

    render(){
        let { value } = this.props;
        let type ='circle';
        if(isMobile()){
          type = 'bar';
        }
        return (
            <Box>
                <AnnotatedMeter
                    size='medium'
                    type={type}
                    units='€'
                    responsive={true}
                    legend={true}
                    series={value} />

            </Box>
        )
    }
}
