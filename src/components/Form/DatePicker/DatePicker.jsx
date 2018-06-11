import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FaCalendar from 'react-icons/lib/fa/calendar';

import Label from '../Label';
import TextInput from '../TextInput';
import Button from '../Button';
import DatePickerDialog from './DatePickerDialog';

import './DatePicker.scss';

class DatePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {value: props.value, picker: null};
        this.onChangeWrapper = this.onChangeWrapper.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
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
        if (e && e.value){
            this.setState({picker: null, prettyValue: moment(e.value).format(format), value: e.value},()=>{
                onChange(this.state.value, this.props.id);
            });
        } else {
            this.setPicker(null);
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
            <div className={`date-picker ${className}`}>
                {label && <Label htmlFor={id} required={required}>{label}</Label>}
                {picker === 'date' &&
                    <DatePickerDialog
                        onChange={this.onChangeDate}
                        value={value}
                        minDate={minDate}
                        maxDate={maxDate}/>
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

DatePicker.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.instanceOf(Date),
    /** Earliest date allowed to choose */
    minDate: PropTypes.string,
    /** Latest date allowed to choose */
    maxDate: PropTypes.string,
    /** Date format */
    format: PropTypes.string,
    onChange: PropTypes.func.isRequired,
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

export default DatePicker;
