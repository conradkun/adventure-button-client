import React, {Component} from 'react';
import FormField from 'grommet/components/FormField';
import CheckBox from 'grommet/components/CheckBox';
import AppSettings from '../../../utils/app_settings';

export default class Annexe extends Component{
    render(){
        return (
            <FormField label="Abattement">
                <CheckBox
                    label={'Abattement sur '+ this.props.value + '€'}
                    defaultValue={0}
                    toggle={AppSettings.toggleInsteadOfCheckbox}
                    onChange={(e) => {
                        let checked = e.target.checked;
                        this.props.onChange(checked ? this.props.value : 0);
                    }}
                />
            </FormField>
        )
    }
}
