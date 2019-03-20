import React from 'react';
import PropTypes from 'prop-types';

import {withForm} from '../FormContext';
import FormElement from '../FormElement/FormElement';
import {Select} from '../Select';

import {getHoursFromDuration, getRemainderMinutesFromDuration} from "./Duration.util";

import './Duration.scss';

/** Time Duration input component with optional label component */
export class Duration extends FormElement {

    state = {
        hours: getHoursFromDuration(this.props.value),
        minutes: getRemainderMinutesFromDuration(this.props.value),
        value: this.props.value
    };

    hours = Array.from(Array(60), (_, x)=> {return {label: `${x+1} ${x < 1 ? 'hr' : 'hrs'}`, value: x+1}});
    minutes = Array.from(Array(60), (_, x)=> {return {label: `${x+1} ${x < 1 ? 'min' : 'mins'}`, value: x+1}});

    onChange = (e, type) =>{
        const {onChange} = this.props;
        let durationValue;

        switch (type){
            case "hours":
                durationValue = e.value * 60 + this.state.minutes;
                this.setState({hours: e.value, value: durationValue });
                break;
            case "minutes":
                durationValue = this.state.hours * 60 + e.value;
                this.setState({minutes: e.value, value: durationValue });
                break;
        }
        onChange && onChange( {value: durationValue}, this.props.name);
    };

    render(){
        const { id, name, tabIndex, className} = this.props,
            {hours, minutes} = this.state;
        return (
            <div className={`duration ${className}`}>
                <Select id={`duration-hours-${id}`}
                        name={`duration-hours-${name}`}
                        className="duration__hours"
                        value={hours}
                        options={this.hours}
                        tabIndex={tabIndex}
                        placeholder="-----"
                        onChange={(e)=>this.onChange(e, 'hours')}/>
                <Select id={`duration-minutes-${id}`}
                        name={`duration-minutes-${name}`}
                        className="duration__minutes"
                        value={minutes}
                        options={this.minutes}
                        tabIndex={tabIndex + .1}
                        placeholder="-----"
                        onChange={(e)=>this.onChange(e, 'minutes')}/>
            </div>
        )
    }

};

Duration.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    required: PropTypes.bool,
    value: PropTypes.number,
    onChange: PropTypes.func
};

Duration.defaultProps = {
    tabIndex: 1,
    className: '',
    required: false
};

export default withForm(Duration);
