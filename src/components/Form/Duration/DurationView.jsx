import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import {getRemainderMinutesFromDuration, getHoursFromDuration} from "./Duration.util";

export const DurationView = ({value, className}) => {
    const hours = getHoursFromDuration(value),
        minutes = getRemainderMinutesFromDuration(value);
    return (
    <div className={`duration ${className}`}>
        {hours ? <Fragment> {hours} <FormattedMessage id="duration.hours"/></Fragment> : null}
        {minutes ? <Fragment> {minutes} <FormattedMessage id="duration.minutes"/></Fragment> : null}
    </div>
    )
};

DurationView.propTypes = {
    className: PropTypes.string,
    value: PropTypes.number
};