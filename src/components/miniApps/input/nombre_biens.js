import React, {Component} from 'react';
import FormField from 'grommet/components/FormField';
import NumberInput from 'grommet/components/NumberInput';

export default class NombreBiens extends Component{
    constructor(props){
        super(props);
        this.state = {error: undefined};
    }
    render(){
        return (
            <FormField label={this.props.label} error={this.state.error}>
                <NumberInput
                    defaultValue={this.props.defaultValue}
                    step={1}
                    onChange={(e) => {
                        let value = e.target.value;
                        if (!(value < 0 || value==='')){
                            this.props.onChange(parseFloat(value));
                            this.setState({ error: undefined });
                        }
                        else {
                            this.setState({ error: "Ce nombre de biens est invalide" });
                        }
                      }
                    }
                />
            </FormField>
        )
    }
}
