import React from 'react';
import PropTypes from 'prop-types';

import {withForm} from '../FormContext';
import FormElement from '../FormElement';
import Label from '../Label';
import {Select} from '../Select';

import './TimePicker.scss';

/** Timepicker input component with optional label component */
class TimePicker extends FormElement {

    state = {
        value: this.props.value
    };

    hours = Array.from(Array(this.props.mode === '12' ? 12 : 24), (_, x)=> {return {label: x+1, value: x+1}});
    minutes = Array.from(Array(60), (_, x)=> {return {label: x+1, value: x+1}});
    ampm = [{label: 'AM', value: 'am'}, {label:"PM", value: 'pm'}];

    onChange = (e, type) =>{
        const {onChange} = this.props,
            timeValue = this.state.value;
        switch (type){
            case "hours":
                timeValue.setHours(e.value);
                break;
            case "minutes":
                timeValue.setMinutes(e.value);
                break;
            case "ampm":
                if(e.value === 'am'){
                    timeValue.setHours(timeValue.getHours()-12);
                } else {
                    timeValue.setHours(timeValue.getHours()+12);
                }
                break;
        }
        this.setState({value: timeValue}, ()=>{
            onChange && onChange( {value: this.state.value}, this.props.name);
        });
    };

    render(){
        const { id, name, tabIndex, className,
                label, required, mode} = this.props,
            {value} = this.state;
        return (
            <span className={`form-element time-picker ${className}`}>
                {label && <Label htmlFor={id} required={required}>{label}</Label>}
                <Select name={`time-picker-hours-${name}`}
                        className="time-picker__hours"
                        value={value.getHours() > 12 ? value.getHours() - 12 : value.getHours()}
                        options={this.hours}
                        tabIndex={tabIndex}
                        onChange={(e)=>this.onChange(e, 'hours')}/>
                <Select name={`time-picker-minutes-${name}`}
                        className="time-picker__minutes"
                        value={value.getMinutes()}
                        options={this.minutes}
                        tabIndex={tabIndex + .1}
                        onChange={(e)=>this.onChange(e, 'minutes')}/>
                {mode === '12' &&
                    <Select name={`time-picker-ampm-${name}`}
                            className="time-picker__ampm"
                            value={value.getHours() > 12 ? 'pm' : 'am'}
                            options={this.ampm}
                            tabIndex={tabIndex + .2}
                            onChange={(e)=>this.onChange(e, 'ampm')}/>
                }
            </span>
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
