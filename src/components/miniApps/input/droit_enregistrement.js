import React, {Component} from 'react';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';

export default class DroitEnregistrement extends Component{
    constructor(props){
        super(props);
        this._makeOptions.bind(this);
        this.state = {value: this.props.default};
        this.options = this._makeOptions(this.props.options);
    }
    _makeOptions(o) {
        let options = [];
        o.forEach((o) => {
            options.push({value: o, label: o.toString() + '%'})
        });
        return options
    }
    render(){
        return (
            <FormField label="Droit d'enregistrement">
                <Select
                        options={this.options}
                        value={this.state.value.toString() + "%"}
                        onChange={(o) => {
                            this.setState({value: o.value.value});
                            this.props.onChange(o.value.value);
                        }}
                />
            </FormField>
        )
    }
}
