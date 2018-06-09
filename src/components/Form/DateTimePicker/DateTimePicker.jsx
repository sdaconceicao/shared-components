import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FaCalendar from 'react-icons/lib/fa/calendar';

import Label from '../Label';
import TextInput from '../TextInput';
import Button from '../Button';
import {DatePickerDialog} from '../DatePicker';
import {TimePickerDialog} from '../TimePicker';
import './DateTimePicker.scss';

/** Date/Time Picker input component with optional label */
class DateTimePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {value: props.value, picker: null, prettyValue: props.value ? moment(props.value).format(props.format) : null};
        this.onChangeWrapper = this.onChangeWrapper.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.setPicker = this.setPicker.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.value !== prevState.value) {
            return { value: nextProps.value };
        }
        return null;
    }

    onChangeDate(e){
        const {onChange, format} = this.props;
        let {value} = this.state;
        if (e && e.value){
            if (!value) value = new Date();
            e.value.setHours(value.getHours());
            e.value.setMinutes(value.getMinutes());
            this.setState({picker: 'time', prettyValue: moment(e.value).format(format), value: e.value});
        } else {
            this.setPicker(null);
        }

    }

    onChangeTime(e){
        const {onChange, format} = this.props,
            {value} = this.state;
        if (e && e.value) {
            this.setState({picker: null, prettyValue: moment(value).format(format), value}, ()=>{
                onChange({value: this.state.value}, this.props.id);
            });
        } else {
            this.setPicker('date');
        }
    }

    onChangeWrapper(value){
        const {onChange} = this.props;
        this.setState({value});
        onChange({value}, this.props.id)
    }

    setPicker(picker){
        this.setState({picker});
    }

    render(){
        const { id, name, tabIndex, className, placeholder,
                minDate, maxDate,
                label, required,
                onBlur, onKeyDown} = this.props,
            {value, prettyValue, picker} = this.state;
        return (
            <div className={`date-time-picker ${className}`}>
                {label && <Label htmlFor={id} required={required}>{label}</Label>}
                {picker !== null &&
                    <Fragment>
                        {picker === 'date' &&
                            <DatePickerDialog
                                onChange={this.onChangeDate}
                                value={value}
                                minDate={minDate}
                                maxDate={maxDate}/>
                        }
                        {picker === 'time' &&
                            <TimePickerDialog
                                onChange={this.onChangeTime}
                                value={value}/>
                            }
                    </Fragment>
                }

                <TextInput
                    name={name}
                    id={id}
                    type='text'
                    placeholder={placeholder}
                    value={prettyValue}
                    tabIndex={tabIndex}
                    onChange={this.onChangeWrapper}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}/>
                <Button onClick={() => this.setPicker('date')}><FaCalendar/></Button>
            </div>
        )
    }

};

DateTimePicker.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.string,
    /** Earliest date allowed to choose */
    minDate: PropTypes.string,
    /** Latest date allowed to choose */
    maxDate: PropTypes.string,
    /** Date/time format */
    format: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func
};

DateTimePicker.defaultProps = {
    tabIndex: 1,
    placeholder: '',
    className: '',
    format: 'MMMM Do YYYY, h:mm a',
    required: false,
    value: new Date()
};

export default DateTimePicker;
