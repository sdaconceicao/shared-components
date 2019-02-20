import React from 'react';
import PropTypes from 'prop-types';
import FaDotCircleO from 'react-icons/lib/fa/dot-circle-o';
import FaCircleO from 'react-icons/lib/fa/circle-o';

import {withForm} from '../FormContext';
import FormElement from '../FormElement';
import {Radio} from "./Radio";

export class RadioList extends FormElement{

    onChange = (e) =>{
        this.setState({value: e.value});
        this.props.onChange && this.props.onChange({
            value: e.value,
            name: this.props.name
        });
    };

    render(){
        const {name, className, options, checkedIcon, uncheckedIcon} = this.props,
            {value} = this.state;

        return (
            <ul className={`radio-list list-style--none ${className}`}>
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
