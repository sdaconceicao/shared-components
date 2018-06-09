import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import {FormattedMessage} from 'react-intl';

import ModalConfirm from '../../Modal/ModalConfirm';

class DatePickerDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {value: props.value};
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        new Promise((resolve) => {
            this.setState({resolve});
        }).then(response=> {
            const {onChange} = this.props;
            if (response) {
                onChange({value: this.state.value});
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

    onChange(value){
        this.setState({value});
    }

    render(){
        const { className, minDate, maxDate} = this.props,
            {value, resolve} = this.state;
        return (
            <ModalConfirm resolve={resolve} title={<FormattedMessage id="datePicker.title"/>}>
                <div className={`date-picker-wrapper ${className}`}>
                    <Calendar
                        onChange={this.onChange}
                        calendarType="US"
                        value={value}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                </div>
            </ModalConfirm>
        )
    }

};

DatePickerDialog.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
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
