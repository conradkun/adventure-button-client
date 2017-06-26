import Select from 'react-select';
import '../../style/react-select.css';
import isEmail from 'validator/lib/isEmail';

import React from 'react'

class EmailsSelect extends React.Component {
  constructor (props) {
      super(props);
      this._handleOnChange = this._handleOnChange.bind(this);
      this.state = {
          emails: [],
      };
  }

  _handleOnChange (value) {
    if(value.slice(-1).pop()){
      if(isEmail(value.slice(-1).pop().value)){
        this.setState({ emails: value });
        this.props.onChange(value);
      }
      else {
        this.props.msg.error('Veuillez utiliser une adresse email valide');
      }
    } else {
      this.setState({ emails: [] });
      this.props.onChange([]);
    }
  }

  promptTextCreator (label) {
     return `Ajouter l'adresse email "${label}"`;
   }
  render () {
    return (
      <Select.Creatable
        multi={true}
        options={[]}
        promptTextCreator = {this.promptTextCreator}
        noResultsText='Aucune adresse email enregistrée'
        placeholder='Ajouter une ou plusieurs adresse(s) email(s)'
        onChange={this._handleOnChange}
        value={this.state.emails}
      />
    )
  }
}

export default EmailsSelect;
