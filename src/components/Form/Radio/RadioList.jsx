import React from 'react';
import PropTypes from 'prop-types';
import FaDotCircleO from 'react-icons/lib/fa/dot-circle-o';
import FaCircleO from 'react-icons/lib/fa/circle-o';

import {withForm} from '../FormContext';
import FormElement from '../FormElement';
import Label from '../Label';
import {Radio} from "./Radio";

export class RadioList extends FormElement{

    onChange = (e) =>{
        this.setState({value: e.value});
    };

    render(){
        const {name, className, label, options, checkedIcon, uncheckedIcon} = this.props,
            {value} = this.state;

        return (
            <span className={`form-element ${className}`}>
                <Label>{label}</Label>
                <ul className="radio-list">
                    {options && options.map((option, index)=>{
                        return (
                            <li key={index} className="checkbox-list__item">
                                <Radio name={name}
                                       id={`${name}-${index}`}
                                       value={option.value}
                                       label={option.label}
                                       checkedIcon={checkedIcon}
                                       uncheckedIcon={uncheckedIcon}
                                       checked={value === option.value }
                                       onChange={this.onChange} />
                            </li>
                        )
                    })}
                </ul>
            </span>
        );
    }

}

RadioList.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number.isRequired,
    index: PropTypes.number,
    options: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    checkedIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    uncheckedIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    required: PropTypes.bool,
    onChange: PropTypes.func
};

RadioList.defaultProps = {
    className: '',
    tabIndex: 1,
    disabled: false,
    checkedIcon: <FaDotCircleO/>,
    uncheckedIcon: <FaCircleO/>
};

export default withForm(RadioList);
