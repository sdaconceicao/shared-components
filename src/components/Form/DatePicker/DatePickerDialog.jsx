import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import {FormattedMessage} from 'react-intl';

import Popover from '../../Popover';

class DatePickerDialog extends Component {

    state = {
        value: this.props.value
    };

    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.value !== prevState.value) {
            return { value: nextProps.value };
        }
        return null;
    }

    onChange = (value) =>{
        const {onChange} = this.props;
        this.setState({dateValue: value});
        onChange && onChange({value});
    };

    render(){
        const { className, minDate, maxDate, target} = this.props,
            {value} = this.state;
        return (
            <Popover title={<FormattedMessage id="datePicker.title"/>}
                     target={target}>
                <div className={`date-picker-wrapper ${className}`}>
                    <Calendar
                        onChange={this.onChange}
                        calendarType="US"
                        value={value}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                </div>
            </Popover>
        )
    }

};

DatePickerDialog.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    className: PropTypes.string,
    /** Earliest date allowed to choose */
    minDate: PropTypes.string,
    /** Latest date allowed to choose */
    maxDate: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

DatePickerDialog.defaultProps = {
    className: ''
};

export default DatePickerDialog;
