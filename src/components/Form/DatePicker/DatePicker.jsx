import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FaCalendar from 'react-icons/lib/fa/calendar';

import {withForm} from '../FormContext';
import Label from '../Label';
import {Input} from '../Input';
import Button from '../Button';
import DatePickerDialog from './DatePickerDialog';

import './DatePicker.scss';
import FormElement from "../FormElement";

class DatePicker extends FormElement {

    state = {
        value: this.props.value,
        picker: null,
        prettyValue: this.props.value
            ? moment(this.props.value).format(this.props.format)
            : null
    };

    componentDidMount(){
        console.log("PROPS", this.props);
    }

    onChangeDate = (e) => {
        const {format} = this.props;
        if (e && e.value) {
            this.setState({picker: null, prettyValue: moment(e.value).format(format), value: e.value});
        } else {
            this.setPicker(null);
        }
    };

    setPicker = (picker) =>{
        this.setState({picker});
    };

    render(){
        const { id, name, tabIndex, className, placeholder,
                minDate, maxDate,
                label, required,
                onBlur, onKeyDown} = this.props,
            {value, prettyValue, picker} = this.state;

        return (
            <div className={`date-picker ${className}`}>
                {label && <Label htmlFor={id} required={required}>{label}</Label>}
                {picker === 'date' &&
                    <DatePickerDialog
                        onChange={this.onChangeDate}
                        value={value}
                        minDate={minDate}
                        maxDate={maxDate}/>
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
                <Button onClick={() => this.setPicker('date')}><FaCalendar/></Button>
            </div>
        )
    }

};

DatePicker.propTypes = {
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
    required: false,
    value: new Date(),
    format: 'MMMM Do YYYY',
};

export default withForm(DatePicker);
