import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import AppSettings from '../../utils/app_settings';
import Title from 'grommet/components/Title'

import PriceInput from './input/price_input';



export default class SingleValue extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let content = (
          <PriceInput defaultValue={this.props.defaultValue} onChange={(v)=>{
            const client = this.props.client;
            const settings = client.service('settings');
            settings.patch(this.props.id, {
                value: v
            })
            //Reload the organisation settings on the client
            const organisation = client.service('organisation');
            const user = client.get('user');
            organisation.get(user.organisation).then((o) => {
              client.set('organisation', o);
              //Save organisation to localStorage
              let organisationParsed = JSON.stringify(o);
              window.localStorage.setItem("organisation", organisationParsed);
            });
          }}/>
        );
        let basis = 'full';
        let margin = {
          top: 'large'
        }
        if(this.props.responsive === 'single'){
          margin = {
            ...margin,
            horizontal: 'large'
          }
        }
        return (
                <Box
                  justify="between" pad="medium" direction='row'
                  className="drop-shadow"
                  align='center'
                  colorIndex={AppSettings.cardColor}
                  basis = {basis}
                  margin={margin}
                >
                <Title>{this.props.name}</Title>
                {content}
              </Box>
        )
    }
}
