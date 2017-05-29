
import React, {Component} from 'react';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';


export default class OrganisationSelect extends Component{
    constructor(props){
        super(props);
        this.state = {
            error: undefined,
            selected: {
                value: props.organisationId,
                label: props.organisationName
            },
            options: undefined,
            organisationList: undefined
        };
    }

    organisations() {
        //return Organisation.find({}).fetch(); //fetch must be called to trigger reactivity
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
                                return organisation.label.toLowerCase().indexOf(searchString.toLowerCase())!==-1
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
