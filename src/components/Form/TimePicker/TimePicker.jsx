import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FaClockO from 'react-icons/lib/fa/clock-o';

import Label from '../Label';
import TextInput from '../TextInput';
import Button from '../Button';
import TimePickerDialog from './TimePickerDialog';

/** Timepicker input component with optional label component */
class TimePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {value: props.value, picker: null};
        this.onChangeWrapper = this.onChangeWrapper.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.setPicker = this.setPicker.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.value !== prevState.value) {
            return { value: nextProps.value };
        }
        return null;
    }

    onChangeTime(e){
        const {onChange, format} = this.props;
        if (e && e.value) {
            this.setState({picker: null, prettyValue: moment(e.value).format(format), value: e.value}, ()=>{
                onChange( {value: e.value}, this.props.id);
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
    label: PropTypes.string,
    required: PropTypes.bool,
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
    format: 'h:mm a'
};

export default TimePicker;
