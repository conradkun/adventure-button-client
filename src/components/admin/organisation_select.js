import TrackerReact from 'meteor/ultimatejs:tracker-react';
import React, {Component} from 'react';
import { Meteor } from 'meteor-client';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';

import {Organisation} from '../../../imports/api/organisation';

export default class OrganisationSelect extends TrackerReact(React.Component){
    constructor(props){
        super(props);
        this.state = {
            subscription: {
                organisation: Meteor.subscribe('organisation')
            },
            error: undefined,
            selected: {
                value: props.organisationId,
                label: props.organisationName
            },
            options: undefined,
            organisationList: undefined
        };
    }
    componentWillUnmount() {
        this.state.subscription.organisation.stop();
    }

    organisations() {
        return Organisation.find({}).fetch(); //fetch must be called to trigger reactivity
    }

    componentWillMount(){
        let organisationList = this.organisations().map((organisation) => {
            return({
                value: organisation._id,
                label: organisation.name
            });
        });

        this.setState({
            options : organisationList,
            organisationList: organisationList
        });
    }

    render(){

        return (
            <FormField label="Organisation" error={this.state.error}>
                <Select placeHolder='Rechercher'
                        inline={false}
                        multiple={false}
                        value={this.state.selected}
                        options={this.state.options}
                        onSearch={(e) => {
                            let tempOrganisationList = this.state.organisationList.slice();
                            let searchString = e.target.value;
                            let options = tempOrganisationList.filter((organisation) => {
                                return organisation.label.toLowerCase().indexOf(searchString.toLowerCase())!=-1
                            });
                            this.setState({options});
                        }}
                        onChange={(o) => {
                            console.log(o);
                            this.setState({selected:
                                {
                                   value: o.value.value,
                                   label: o.value.label
                                }
                            });
                            this.props.onChange(o.value.value);
                        }} />
            </FormField>
        )
    }
}

OrganisationSelect.defaultProps = {
  organisationId: undefined,
  organisationName: 'Choississez une organisation'
};
