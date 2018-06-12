import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TimePickerClock from 'react-times';
import {FormattedMessage} from 'react-intl';

import ModalConfirm from '../../Modal/ModalConfirm';

import 'react-times/css/material/default.css';
import './TimePicker.scss';

/** Timepicker component */
class TimePickerDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {value: props.value, timeValue:`${props.value.getHours()}:${props.value.getMinutes()}`};
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
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

    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.value !== prevState.value) {
            return { value: nextProps.value };
        }
        return null;
    }

    onChange(timeValue){
        const timeSplit = timeValue.split(':'),
            {value} = this.state;
        value.setHours(timeSplit[0]);
        value.setMinutes(timeSplit[1]);
        this.setState({value, timeValue});
    }

    onMinutesChange(){
        this.state.resolve(true);
    }

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
                        onMinuteChange={this.onMinutesChange.bind(this)}
                        onTimeChange={this.onChange.bind(this)}
                    />
                </div>
            </ModalConfirm>
        )
    }

};

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
