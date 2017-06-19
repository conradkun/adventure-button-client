import React, {Component} from 'react';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';

export default class PressionImmobiliere extends Component{
    constructor(props){
        super(props);
        this.options = [
          {
            label: 'Zone à pression Immobilière normale',
            value: 0
          },
          {
            label: 'Zone à forte pression Immobilière',
            value: 1
          }
        ]

        this.state = {
          value: 0,
          label: 'Zone à pression Immobilière normale'
        };

    }

    render(){
        return (
            <FormField label="Pression Immobilière">
                <Select
                        options={this.options}
                        value={this.state.label}
                        onChange={(o) => {
                            this.setState(
                              {
                                value: o.value.value,
                                label: o.value.label
                              }
                            );
                            this.props.onChange(o.value.value);
                        }}
                />
            </FormField>
        )
    }
}
