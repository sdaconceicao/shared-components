import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip as Tooltip } from 'reactstrap';
import {withForm} from "../FormContext";

/** Button component with optional tooltip */
const Button = ({id, className, name, onClick, type, disabled, tooltip, children}) => {
    return (
        <button
            id={id}
            type={type}
            name={name}
            className={`btn ${className}`}
            onClick={onClick}
            disabled={disabled}>
            {tooltip &&
                <Tooltip placement="top" target={id} delay={{show: 0, hide: 200}}>
                    {tooltip}
                </Tooltip>
            }
            {children}
        </button>
    );
};

Button.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    /** Tooltip to display on button hover */
    tooltip: PropTypes.object,
    onClick: PropTypes.func
};

Button.defaultProps = {
    disabled: false,
    type: 'button',
    className: ''
};

export default withForm(Button);
