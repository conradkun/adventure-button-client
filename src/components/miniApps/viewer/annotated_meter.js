/**
 * Created by justin on 27/01/17.
 */

import React, {Component, PropTypes} from 'react';
import isMobile from 'is-mobile';
import AppSettings from '../../../utils/app_settings'
import currencyFormatter from 'currency-formatter';
import Meter from 'grommet/components/Meter';
import Box from 'grommet/components/Box';
import Value from 'grommet/components/Value';
// import Label from 'grommet/components/Label';
import Legend from './legend';
import ListItem from 'grommet/components/ListItem';
import FormattedMessage from 'grommet/components/FormattedMessage';

const CLASS_ROOT = 'grommetux-legend';

function getMaxDecimalDigits(series){
    let maxDigits = 0;
    series.forEach((item) => {
        const currentDigitsGroup = /\.(\d*)$/.exec(item.value.toString());
        if (currentDigitsGroup) {
            const currentDigits = currentDigitsGroup[1].length;
            maxDigits = Math.max(maxDigits, currentDigits);
        }
    });

    return Math.pow(10, maxDigits);
}

export default class AnnotatedMeter extends Component {

    constructor() {
        super();
        this._onActive = this._onActive.bind(this);
        this._seriesTotal = this._seriesTotal.bind(this);
        this.state = {};
    }

    _onActive(index) {
        const {onActive} = this.props;
        this.setState({index: index});
        if (onActive) {
            onActive(index);
        }
    }

    _seriesTotal () {
        const { series } = this.props;
        const maxDecimalDigits = getMaxDecimalDigits(series);
        let total = 0;
        series.forEach(item =>
            total += (typeof item.value === 'number' ?
                    item.value : 0) * maxDecimalDigits );
        return total / maxDecimalDigits;
    }

    render() {
        const {legend, max, series, type, units, responsive} = this.props;
        let sizeLabel = 'medium';
        let size = this.props.size;
        const {index} = this.state;

        if (responsive && isMobile()) {
            size = 'small'
        }

        let value, label;
        if (index >= 0) {
            value = 0;
            value = series[index].value;
            if (value > 9999) {
                sizeLabel = 'small';
            }
            value = currencyFormatter.format(value, AppSettings.currencyOptionFormater);
            label = series[index].label;
        } else {
            value = 0;
            series.forEach(item => value += item.value);
            if (value > 9999) {
                sizeLabel = 'small';
            }
            value = parseFloat(Math.round(value * 100) / 100).toFixed(2);
            value = currencyFormatter.format(value, AppSettings.currencyOptionFormater);
            label = <FormattedMessage id='Total' defaultMessage='Provision'/>;
        }

        let top, middle, bottom, alignLegend;
        if ('bar' === type) {

            top = (
                <Box direction='row' justify='between' align='center'
                     pad={{between: 'small'}} responsive={false}>
                    <Value value={value} units={units} align='start' size={size}/>
                    <span>{label}</span>
                </Box>
            );

            middle = (
                <Meter series={series} stacked={true} label={false} max={max}
                       size={size} activeIndex={index}
                       onActive={this._onActive}/>
            );

            alignLegend = 'start';

        } else if ('circle' === type) {

            middle = (
                <Meter type='circle' stacked={true} series={series}
                       label={
                           <Value value={value} units={units} align='center' label={label}
                                  size={sizeLabel}/>
                       } max={max} size={size} activeIndex={index}
                       onActive={this._onActive}/>
            );

            alignLegend = 'center';
        }

        // if (max) {
        //   bottom = (
        //     <Box direction='row' justify='between' align='center'
        //       responsive={false}>
        //       <Label size='small'>0 {units}</Label>
        //       <Label size='small'>{max} {units}</Label>
        //     </Box>
        //   );
        // }

        let legendElement;
        if (legend) {
            legendElement = (
                <Box alignSelf={alignLegend}>
                    <Legend series={series} units={units} total={true}
                            activeIndex={index} onActive={this._onActive}/>
                </Box>
            );
        }

        return (
            <Box align='start'>
                <Box>
                    {top}
                    {middle}
                    {bottom}
                    {legendElement}
                </Box>
            </Box>
        );
    }

};

AnnotatedMeter.propTypes = {
    onActive: PropTypes.number,
    legend: PropTypes.bool,
    max: PropTypes.number,
    series: PropTypes.arrayOf(PropTypes.shape({
        colorIndex: PropTypes.string,
        onClick: PropTypes.func,
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired
    })).isRequired,
    size: Meter.propTypes.size,
    type: PropTypes.oneOf(['bar', 'circle']).isRequired,
    units: PropTypes.string
};
