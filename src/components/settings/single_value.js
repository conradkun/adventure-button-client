import React, {Component} from 'react';
import Card from 'grommet/components/Card';
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
        let direction = this.props.responsive === 'single' ? 'column' : 'row';
        let header = (
          <Box direction={direction} justify='between'>
            <Title>{this.props.name}</Title>
            {content}
          </Box>
        )
        return (
                <Card
                  margin={{
                    top: 'large'
                  }} responsive={false} className="drop-shadow" basis="full" colorIndex="light-1" key={this.props.email} heading={header}
                >
              </Card>
        )
    }
}
