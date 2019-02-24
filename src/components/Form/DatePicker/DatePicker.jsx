import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FaCalendar from 'react-icons/lib/fa/calendar';

import {withForm} from '../FormContext';
import FormElement from "../FormElement";
import {Input} from '../Input';
import Button from '../Button';
import DatePickerDialog from './DatePickerDialog';

import './DatePicker.scss';

export class DatePicker extends FormElement {

    state = {
        value: this.props.value,
        btnTarget: `btn-${this.props.id}`,
        prettyValue: this.props.value
            ? moment(this.props.value).format(this.props.format)
            : null
    };

    onChangeDate = (e) => {
        const {format} = this.props;
        if (e && e.value) {
            this.setState({picker: null, prettyValue: moment(e.value).format(format), value: e.value});
        }
    };

    render(){
        const { id, name, tabIndex, className, placeholder, buttonClassName,
                minDate, maxDate,
                onBlur, onKeyDown} = this.props,
            {value, prettyValue, btnTarget} = this.state;

        return (
            <div className={`date-picker ${className}`}>
                <Input
                    name={name}
                    id={id}
                    type='text'
                    placeholder={placeholder}
                    value={prettyValue}
                    tabIndex={tabIndex}
                    onChange={this.onChange}
                    className="with-button"
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}/>
                <Button id={btnTarget}
                        className={`with-input ${buttonClassName}`}><FaCalendar/></Button>
                <DatePickerDialog
                    onChange={this.onChangeDate}
                    value={value}
                    minDate={minDate}
                    maxDate={maxDate}
                    target={btnTarget}/>
            </div>
        )
    }

};

DatePicker.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    buttonClassName: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    /** Earliest date allowed to choose */
    minDate: PropTypes.string,
    /** Latest date allowed to choose */
    maxDate: PropTypes.string,
    /** Date format */
    format: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func
};

DatePicker.defaultProps = {
    tabIndex: 1,
    placeholder: '',
    className: '',
    buttonClassName: '',
    required: false,
    value: new Date(),
    format: 'MMMM Do YYYY',
};

export default withForm(DatePicker);
