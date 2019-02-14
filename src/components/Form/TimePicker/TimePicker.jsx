import React from 'react';
import PropTypes from 'prop-types';

import {withForm} from '../FormContext';
import FormElement from '../FormElement/FormElement';
import {Select} from '../Select';
import {convertTimeByAmPm, getHourFromDateAndMode, getHourValueByMode} from './TimePicker.util';


import './TimePicker.scss';

/** Timepicker input component with optional label component */
class TimePicker extends FormElement {

    state = {
        value: this.props.value
    };

    hours = this.props.mode === '12'
        ? Array.from(Array(12), (_, x)=> {return {label: x+1, value: x+1}})
        : Array.from(Array(24), (_, x)=> {return {label: x, value: x}});
    minutes = Array.from(Array(60), (_, x)=> {return {label: x+1, value: x+1}});
    ampm = [{label: 'AM', value: 'am'}, {label:"PM", value: 'pm'}];

    onChange = (e, type) =>{
        const {onChange, mode} = this.props,
            timeValue = this.state.value;
        switch (type){
            case "hours":
                timeValue.setHours(getHourFromDateAndMode(e.value, mode, timeValue));
                break;
            case "minutes":
                timeValue.setMinutes(e.value);
                break;
            case "ampm":
                timeValue.setHours(convertTimeByAmPm(e.value, timeValue));
                break;
        }
        this.setState({value: timeValue}, ()=>{
            onChange && onChange( {value: this.state.value}, this.props.name);
        });
    };

    render(){
        const { id, name, tabIndex, className,
                mode} = this.props,
            {value} = this.state;
        return (
            <div className={`time-picker ${className}`}>
                <Select id={`time-picker-hours-${id}`}
                        name={`time-picker-hours-${name}`}
                        className="time-picker__hours"
                        value={getHourValueByMode(mode, value)}
                        options={this.hours}
                        tabIndex={tabIndex}
                        placeholder="--"
                        onChange={(e)=>this.onChange(e, 'hours')}/>
                <Select id={`time-picker-minutes-${id}`}
                        name={`time-picker-minutes-${name}`}
                        className="time-picker__minutes"
                        value={value.getMinutes()}
                        options={this.minutes}
                        tabIndex={tabIndex + .1}
                        placeholder="--"
                        onChange={(e)=>this.onChange(e, 'minutes')}/>
                {mode === '12' &&
                    <Select name={`time-picker-ampm-${name}`}
                            className="time-picker__ampm"
                            value={value.getHours() > 12 ? 'pm' : 'am'}
                            options={this.ampm}
                            tabIndex={tabIndex + .2}
                            placeholder="--"
                            onChange={(e)=>this.onChange(e, 'ampm')}/>
                }
            </div>
        )
    }

};

TimePicker.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number.isRequired,
    mode: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    required: PropTypes.bool,
    value: PropTypes.instanceOf(Date),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func
};

TimePicker.defaultProps = {
    tabIndex: 1,
    placeholder: '',
    className: '',
    mode: '12',
    required: false
};

export default withForm(TimePicker);
