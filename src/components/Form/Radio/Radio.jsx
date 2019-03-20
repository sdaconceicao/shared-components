import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import FaDotCircleO from 'react-icons/lib/fa/dot-circle-o';
import FaCircleO from 'react-icons/lib/fa/circle-o';

import {withForm} from '../FormContext';
import FormElement from '../FormElement';
import Label from '../Label';

import './Radio.scss';

export class Radio extends FormElement{

    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.checked !== prevState.checked) {
            return { checked: nextProps.checked };
        }
        return null;
    }

    onChange = (e) =>{
        this.setState({checked: e.target.checked});
        this.props.onChange && this.props.onChange({
            value: this.props.value,
            checked: e.target.checked,
            name: this.props.name
        });
    };

    getValue(){
        return this.state.checked
            ? this.props.value
            : undefined;
    }

    render(){
        const {id, name, className, tabIndex, index, value, disabled, label, required,
                checkedIcon, uncheckedIcon} = this.props,
            {checked} = this.state;

        return (
            <Fragment>

                <Label htmlFor={id} required={required} className={`radio ${className}`}>
                    <Fragment>
                        {checked && checkedIcon}
                        {!checked && uncheckedIcon}
                        {label}
                        <input id={id}
                               name={name}
                               type="radio"
                               className="d-none"
                               defaultChecked={checked}
                               disabled={disabled}
                               onChange={this.onChange}
                               value={value}
                               tabIndex={tabIndex}
                               index={index} />
                    </Fragment>
                </Label>
            </Fragment>
        );
    }

}

Radio.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number.isRequired,
    index: PropTypes.number,
    checkedIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    uncheckedIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    required: PropTypes.bool,
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func
};

Radio.defaultProps = {
    className: '',
    tabIndex: 1,
    disabled: false,
    value: false,
    checkedIcon: <FaDotCircleO/>,
    uncheckedIcon: <FaCircleO/>
};

export default withForm(Radio);
