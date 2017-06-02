import React, {Component} from 'react';
import FormField from 'grommet/components/FormField';
import NumberInput from 'grommet/components/NumberInput';

export default class Seats extends Component{
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
                        if (!(value < 1 || value==='' || value < this.props.minSeats)){
                            this.props.onChange( parseFloat(value));
                            this.setState({ error: undefined });
                        }
                        else if (value <= this.props.minSeats) {
                            this.props.onChange( parseFloat(value));
                            this.setState({ error: "Ce nombre d'utilisateurs n'est pas suffisant" });
                        } else {
                            this.props.onChange( parseFloat(value));
                            this.setState({ error: "Ce n'est pas un nombre d'utilisateurs valide" });
                        }
                      }
                    }
                />
            </FormField>
        )
    }
}

Seats.defaultProps = {
    defaultValue: 1
};
