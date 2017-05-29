import React, {Component} from 'react';
import FormField from 'grommet/components/FormField';
import NumberInput from 'grommet/components/NumberInput';

export default class NumberOfUsers extends Component{
    constructor(props){
        super(props);
        this.state = {error: undefined};
    }
    render(){
        return (
            <FormField label="Nombre d'utilisateurs" error={this.state.error}>
                <NumberInput
                    defaultValue={this.props.defaultValue}
                    step={1}
                    onChange={(e) => {
                        let value = e.target.value;
                        if (!(value < 1 || value=='')){
                            this.props.onChange( parseFloat(value));
                            this.setState({ error: undefined });
                        } else {
                            this.setState({ error: "Ce n'est pas un nombre d'utilisateur valide" });
                        }
                    }}
                />
            </FormField>
        )
    }
}

NumberOfUsers.defaultProps = {
    defaultValue: 1
};