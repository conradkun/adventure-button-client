import React, {Component} from 'react';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';

export default class AbattementSelect extends Component{
    constructor(props){
        super(props);
        this.options = props.options;

        this.state = {
          value: 0,
          label: 'Pas d\'abattement'
        };

    }
    render(){
        return (
            <FormField label="Abattement">
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
