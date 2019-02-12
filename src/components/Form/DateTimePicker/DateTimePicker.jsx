import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Calendar from "react-calendar";
import FaCalendar from 'react-icons/lib/fa/calendar';
import {FormattedMessage} from "react-intl";

import {withForm} from '../FormContext';
import Label from '../Label';
import {Input} from '../Input';
import Button from '../Button';
import FormElement from "../FormElement";
import Popover from "../../Popover";
import TimePicker from "../TimePicker/TimePicker";

/** Date/Time Picker input component with optional label */
class DateTimePicker extends FormElement {

    state = {
        value: this.props.value,
        btnTarget: `btn-${this.props.id}`,
        prettyValue: this.props.value
            ? moment(this.props.value).format(this.props.format)
            : null
    };

    onChangeDate = (e) =>{
        const {format} = this.props;
        let {value} = this.state;
        if (!value) value = new Date();
        e.setHours(value.getHours());
        e.setMinutes(value.getMinutes());
        this.setState({prettyValue: moment(e).format(format), value: e});
    };

    onChangeTime = (e) =>{
        const {format} = this.props;
        this.setState({prettyValue: moment(e.value).format(format), value: e.value});
    };

    render(){
        const { id, name, tabIndex, className, placeholder,
                minDate, maxDate,
                label, required,
                onBlur, onKeyDown} = this.props,
            {value, prettyValue, btnTarget} = this.state;
        return (
            <span className={`form-element date-time-picker ${className}`}>
                {label && <Label htmlFor={id} required={required}>{label}</Label>}
                <Popover title={<FormattedMessage id="datePicker.title"/>}
                         target={btnTarget}>
                    <div className={`date-picker-wrapper ${className}`}>
                        <Calendar
                            onChange={this.onChangeDate}
                            calendarType="US"
                            value={value}
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                        <TimePicker id={`time-picker-${id}`}
                                    name={`time-picker-${name}`}
                                    value={value}
                                    onChange={this.onChangeTime}/>
                    </div>
                </Popover>
                <Input
                    name={name}
                    id={id}
                    type='text'
                    placeholder={placeholder}
                    value={prettyValue}
                    tabIndex={tabIndex}
                    className="with-button"
                    onChange={this.onChange}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}/>
                <Button id={btnTarget}
                        className="with-input"><FaCalendar/></Button>
            </span>
        )
    }

};

DateTimePicker.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    required: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    /** Earliest date allowed to choose */
    minDate: PropTypes.string,
    /** Latest date allowed to choose */
    maxDate: PropTypes.string,
    /** Date/time format */
    format: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func
};

DateTimePicker.defaultProps = {
    tabIndex: 1,
    placeholder: '',
    className: '',
    value: new Date(),
    format: 'MMMM Do YYYY h:mm a',
    required: false
};

export default withForm(DateTimePicker);
