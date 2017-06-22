import React, {Component} from 'react';
import classnames from 'classnames';
import NumberFormat from 'react-number-format';
import Card from 'grommet/components/Card';
import Tile from 'grommet/components/Tile';
import AppSettings from '../../../utils/app_settings';
import FormFields from 'grommet/components/FormFields'
import FormField from 'grommet/components/FormField'
import Button from 'grommet/components/Button';
import AddIcon from 'grommet/components/icons/base/Add';
import SubtractIcon from 'grommet/components/icons/base/Subtract';


import CSSClassnames from 'grommet/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.NUMBER_INPUT;
const INPUT = CSSClassnames.INPUT;


export default class MontantInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: (this.props.defaultValue ? this.props.defaultValue.toString().replace('.', ',') : '0'),
            error: undefined
        };
        props.onChange(this.state.value);
        this._onAdd = this._onAdd.bind(this);
        this._onSubtract = this._onSubtract.bind(this);
    }


    _onAdd () {
      const { max, step } = this.props;

      let value = (parseFloat(this.state.value.replace(',', '.')) || 0) + (step || 1000);
      if (max !== undefined) {
        value = Math.min(value, max);
      }
      this.props.onChange(value);
      this.setState({
        value: value.toString().replace('.', ',')
      })

    }

    _onSubtract () {
      const { min, step } = this.props;

      let value = (parseFloat(this.state.value.replace(',', '.')) || 0) - (step || 1000);
      if (min !== undefined) {
        value = Math.max(value, min);
      }
      this.props.onChange(value);
      this.setState({
        value: value.toString().replace('.', ',')
      })
    }

    render() {
        const { className, disabled, ...props } = this.props;
        const button = true;
        let classes = classnames(
          CLASS_ROOT,
          {
            [`${CLASS_ROOT}--disabled`]: disabled
          },
          className
        );

        let classesNumberFormat = `${INPUT} ${CLASS_ROOT}__input grommet_price_input`;
        const onSubtract = this._onSubtract;
        const onAdd = this._onAdd;
        let buttonElementAdd = (
          <Button icon={<AddIcon />}
            className={`${CLASS_ROOT}__add`} onClick={onAdd} />
        )
        let buttonElementSubtract = (
          <Button icon={<SubtractIcon />}
            className={`${CLASS_ROOT}__subtract`} onClick={onSubtract} />
        )
        return (
                <FormField label={this.props.label} error={this.state.error}>
                  <span className={classes}>
                    <NumberFormat className={classesNumberFormat} value={this.state.value} thousandSeparator='.' decimalSeparator='.'
                                  suffix={'€'}
                                  onChange={(e, value) => {
                                      if( this.props.noCheck || parseFloat(value.replace(',', '.')) >= 0){
                                          this.setState({value: value});
                                          this.setState({error: undefined});
                                          this.props.onChange(parseFloat(value.replace(',', '.')));
                                      }
                                      else {
                                          this.setState({error: "Ce montant est invalide"});
                                      }
                                  }}/>
                    {button ? buttonElementSubtract : undefined}
                    {button ? buttonElementAdd : undefined}

                  </span>
                </FormField>
        );
    }
}
