import React, {Component} from 'react';
import classnames from 'classnames';
import NumberFormat from 'react-number-format';
import Card from 'grommet/components/Card';
import Box from 'grommet/components/Box';
import AppSettings from '../../../utils/app_settings';
import Title from 'grommet/components/Title'
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
        let content = (

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
        let basis = 'full';
        let margin = {
          top: 'large'
        }
        if(this.props.responsive === 'single'){
          margin = {
            ...margin,
            horizontal: 'large'
          }
        }
        return (
                <Box
                  justify="between" pad="medium" direction='row'
                  className="drop-shadow"
                  align='center'
                  key={this.props.name}
                  colorIndex={AppSettings.cardColor}
                  basis = {basis}
                  margin={margin}
                >
                <Title>{this.props.name}</Title>
                {content}
              </Box>
        )
    }
}
