import React, {Component} from 'react';
import FormField from 'grommet/components/FormField';
import NumberInput from 'grommet/components/NumberInput';

export default class Prix extends Component{
    constructor(props){
        super(props);
        this.state = {error: undefined};
    }
    render(){
        return (
            <FormField label="Prix" error={this.state.error}>
                <NumberInput
                    defaultValue={0}
                    step={1000}
                    onChange={(e) => {
                        let value = e.target.value;
                        if (!(value < 0 || value=='')){
                            this.props.onChange( parseFloat(value));
                            this.setState({ error: undefined });
                        } else {
                            this.setState({ error: "Ce n'est pas un prix valide" });
                        }
                    }}
                />
            </FormField>
        )
    }
}
