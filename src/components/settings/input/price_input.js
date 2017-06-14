import React, {Component} from 'react';
import classnames from 'classnames';
import NumberFormat from 'react-number-format';
import FormField from 'grommet/components/FormField'

import CSSClassnames from 'grommet/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TEXT_INPUT;
const INPUT = CSSClassnames.INPUT;


export default class PriceInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.defaultValue,
            error: undefined
        }
    }

    render() {
        let classes = classnames(
            CLASS_ROOT,
            INPUT,
            {
                [`${CLASS_ROOT}--active`]: this.state.active
            }
        );
        return (

                <FormField label="Montant" error={this.state.error}>
                    <NumberFormat className={classes} value={this.state.value} thousandSeparator='.' decimalSeparator='.'
                                  suffix={'€'}
                                  onChange={(e, value) => {
                                      if(parseFloat(value.replace(',', '.')) >= 0){
                                          this.setState({value: value});
                                          this.setState({error: undefined});
                                          this.props.onChange(parseFloat(value.replace(',', '.')));
                                      }
                                      else {
                                          this.setState({error: "Ce montant est invalide"});
                                      }
                                  }}/>
                </FormField>
        );
    }
}
