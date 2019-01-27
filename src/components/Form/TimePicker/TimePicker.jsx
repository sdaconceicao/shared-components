import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FaClockO from 'react-icons/lib/fa/clock-o';

import {withForm} from '../FormContext';
import FormElement from '../FormElement';
import Label from '../Label/Label';
import Input from '../Input';
import Button from '../Button/Button';
import TimePickerDialog from './TimePickerDialog';

/** Timepicker input component with optional label component */
class TimePicker extends FormElement {

    state = {
        value: this.props.value,
        picker: null,
        prettyValue: this.props.value
            ? moment(this.props.value).format(this.props.format)
            : null
    };

    onChangeTime = (e) =>{
        const {onChange, format} = this.props;
        if (e && e.value) {
            this.setState({picker: null, prettyValue: moment(e.value).format(format), value: e.value}, ()=>{
                onChange && onChange( {value: e.value}, this.props.name);
            });
        } else {
            this.setPicker(null);
        }
    };

    setPicker = (picker) =>{
        this.setState({picker});
    };

    render(){
        const { id, name, tabIndex, className, placeholder,
                label, required,
                onBlur, onKeyDown} = this.props,
            {value, prettyValue, picker} = this.state;

        return (
            <div className={`time-picker ${className}`}>
                {label && <Label htmlFor={id} required={required}>{label}</Label>}
                {picker === 'time' &&
                    <TimePickerDialog
                        onChange={this.onChangeTime}
                        value={value}/>
                }
                <Input
                    name={name}
                    id={id}
                    type='text'
                    placeholder={placeholder}
                    value={prettyValue}
                    tabIndex={tabIndex}
                    onChange={this.onChange}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}/>
                <Button onClick={() => this.setPicker('time')}><FaClockO/></Button>
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
    placeholder: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    required: PropTypes.bool,
    value: PropTypes.instanceOf(Date),
    /** Time format */
    format: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func
};

TimePicker.defaultProps = {
    tabIndex: 1,
    placeholder: '',
    className: '',
    required: false,
    value: new Date(),
    format: 'h:mm a'
};

export default withForm(TimePicker);
