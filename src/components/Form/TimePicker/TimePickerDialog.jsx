import React from 'react';
import PropTypes from 'prop-types';
import TimePickerClock from 'react-times';
import {FormattedMessage} from 'react-intl';

import ModalConfirm from '../../Modal/ModalConfirm';
import FormElement from "../FormElement";

import 'react-times/css/material/default.css';
import './TimePicker.scss';

/** Timepicker component */
class TimePickerDialog extends FormElement {

    state = {
        value: this.props.value,
        timeValue:`${this.props.value.getHours()}:${this.props.value.getMinutes()}`
    };

    componentDidMount(){
        this.props.addFormElement && this.props.addFormElement(this);
        new Promise((resolve) => {
            this.setState({resolve});
        }).then(response=> {
            const {onChange} = this.props;
            if (response) {
                onChange({value: this.state.value, timeValue:`${this.state.value.getHours()}:${this.state.value.getMinutes()}`}, this.props.name);
            } else {
                onChange(null);
            }
        });
    }

    onChange = (timeValue) => {

        const {value} = this.state;
        value.setHours(timeValue.hour);
        value.setMinutes(timeValue.minute);
        if(!this.state.setHour){
            this.setState({value, timeValue: `${timeValue.hour}:${timeValue.minute}`, setHour: true});
        } else {
            this.state.resolve(true);
        }
    };


    render(){
        const { className } = this.props,
            { timeValue, resolve} = this.state;
        return (
            <ModalConfirm resolve={resolve} title={<FormattedMessage id="timePicker.title"/>}>
                <div className={`time-picker-wrapper ${className}`}>
                    <TimePickerClock
                        focused={true}
                        trigger={(<div/>)}
                        time={timeValue}
                        theme="material"
                        onTimeChange={this.onChange}
                    />
                </div>
            </ModalConfirm>
        )
    }
}

TimePickerDialog.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

TimePickerDialog.defaultProps = {
    className: '',
    value: new Date()
};

export default TimePickerDialog;
