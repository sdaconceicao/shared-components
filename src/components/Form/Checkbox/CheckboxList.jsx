import React from 'react';
import PropTypes from 'prop-types';
import FaSquare from 'react-icons/lib/fa/square';
import FaCheck from 'react-icons/lib/fa/check-square';

import {withForm} from '../FormContext';
import FormElement from '../FormElement/FormElement';
import {Checkbox} from "./Checkbox";

export class CheckboxList extends FormElement{

    elements = [];

    addFormElement = (element) =>{
        this.elements.push(element);
    };

    getValue(){
        const results = [];
        this.elements.map(element=>{
            const value = element.getValue();
            value && results.push(value);
        });
        return results;
    }

    render(){
        const {name, className, options, checkedIcon, uncheckedIcon, value} = this.props;

        return (
            <ul className={`checkbox-list ${className}`}>
                {options && options.map((option, index)=>(
                    <li key={index} className="checkbox-list__item">
                        <Checkbox name={option.label}
                                  id={`${name}-${index}`}
                                  value={option.value}
                                  label={option.label}
                                  checkedIcon={checkedIcon}
                                  uncheckedIcon={uncheckedIcon}
                                  checked={value.includes(option.value) }
                                  addFormElement={this.addFormElement}  />
                    </li>
                ))}
            </ul>
        );
    }

}

CheckboxList.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number.isRequired,
    index: PropTypes.number,
    options: PropTypes.array.isRequired,
    value: PropTypes.array.isRequired,
    checkedIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    uncheckedIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    required: PropTypes.bool,
    onChange: PropTypes.func
};

CheckboxList.defaultProps = {
    className: '',
    tabIndex: 1,
    disabled: false,
    value: [],
    checkedIcon: <FaCheck/>,
    uncheckedIcon: <FaSquare/>
};

export default withForm(CheckboxList);
