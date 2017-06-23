
import React, {Component} from 'react';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';
import Box from 'grommet/components/Box';
import IconAdd from 'grommet/components/icons/base/Add';
import Label from 'grommet/components/Label';

export default class SelectCase extends Component{
    constructor(props){
        super(props);
        this._load = this._load.bind(this);
        this._getCases = this._getCases.bind(this);
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

    _getCases(query={
      query: {
        $limit: 5,
        $sort: {
          createdAt: -1
        }
      }
    }){
      return new Promise((resolve,reject)=>{
        const client = this.props.client;
        const cases = client.service('cases');
        let options = [];
        cases.find(query)
        .then((data)=>{
          data.data.forEach((data)=>{
            let option = {
              value: data.name,
              label: data.name,
              id: data._id
            };
            options.push(option);
          });
          resolve(options);
        })
      });
    }

    _load() {
      this._getCases()
      .then((options)=>{
        this.setState({
          options: options
        })
      })
    }

    componentWillMount(){
        this._load();
    }

    render(){

        return (
            <FormField label="Dossier" error={this.state.error}>
                <Select placeHolder='Rechercher'
                        inline={false}
                        multiple={false}
                        value={this.state.selected.value}
                        options={this.state.options}
                        onSearch={(e) => {
                            let searchString = e.target.value;
                            if(searchString === ''){
                              this._getCases()
                              .then((options)=>{
                                this.setState({
                                  options: options
                                })
                              })
                            }
                            else {
                              this._getCases({
                                query: {
                                  $limit: 5,
                                  name: {
                                    $search: searchString
                                  }
                                }
                              })
                              .then((options)=>{
                                let labelObject = (
                                <Box direction='row' align='center' margin='small'>
                                  <IconAdd/>
                                  <Box direction='row' flex={true} align='center' margin={{left: 'small'}}>
                                    <Label size='medium' margin='small'>Créer le dossier: <b>{searchString}</b></Label>
                                  </Box>
                                </Box>
                                )
                                let addNew = ({
                                    label: labelObject,
                                    value: searchString,
                                    new: true
                                })
                                if(options.length === 1){
                                  if(options[0].label === searchString){
                                    addNew = null
                                  }
                                }
                                if(addNew){
                                  options.unshift(addNew);
                                }
                                this.setState({
                                  options: options
                                })
                              })
                            }
                        }}
                        onChange={(o) => {
                            this.setState({selected:
                                {
                                   value: o.value.value,
                                   label: o.value.label
                                }
                            });
                            if(o.value.new){
                              this.props.onChange(o.value.value, undefined);
                            } else {
                              this.props.onChange(o.value.value, o.value.id);
                            }
                        }} />
            </FormField>
        )
    }
}
