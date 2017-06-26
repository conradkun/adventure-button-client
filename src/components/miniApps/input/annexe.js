import React, {Component} from 'react';
import FormField from 'grommet/components/FormField';
import CheckBox from 'grommet/components/CheckBox';
import AppSettings from '../../../utils/app_settings';

export default class Annexe extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <FormField>
                <CheckBox
                    label="Une annexe ou plus"
                    defaultChecked={this.props.defaultValue}
                    toggle={AppSettings.toggleInsteadOfCheckbox}
                    onChange={(e) => {
                        let value = e.target.checked;
                        this.props.onChange(value);
                    }}
                />
            </FormField>
        )
    }
}
