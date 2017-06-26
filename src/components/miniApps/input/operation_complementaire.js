import React, {Component} from 'react';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';

class OperationComplementaire extends Component{
    constructor(props){
        super(props);
        this.options = [
          {
            value: 0,
            label: 'Isolé'
          },
          {
            value: 1,
            label: 'Complémentaire (2)'
          },
          {
            value: 2,
            label: 'Complémentaire (3)'
          }
        ];

        let defaultOption =   {
            value: 0,
            label: 'Isolé'
        };
  
        this.options.forEach((o)=>{
          if(o.value === props.defaultValue){
            defaultOption = o
          }
        })
        this.state = {
          value: defaultOption.value,
          label: defaultOption.label
        };

    }
    render(){
        return (
            <FormField label="Opération Complémentaire">
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
export default OperationComplementaire;
