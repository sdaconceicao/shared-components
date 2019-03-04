import React from 'react';
import PropTypes from 'prop-types';
import FaPlus from 'react-icons/lib/fa/plus-square';

import {withForm} from '../FormContext';
import FormElement from '../FormElement';
import {Input} from '../Input';
import Button from '../Button';
import TagList from './TagsList';
import {TagContext} from "./TagContext";

import './Tags.scss';

/** Text Input component with optional label */
export class Tags extends FormElement {

    state = {
        inputValue: '',
        value: this.props.value
    };

    handleTagInput = (e) =>{
        this.setState({inputValue: e.value});
    };

    handleTagEnter = (e) =>{
        if(e.keyCode == 13){
            e.preventDefault();
            this.handleAddTag();
        }
    };

    handleAddTag = () =>{
        const {value, inputValue} = this.state,
            newTags = inputValue.split(',');
        newTags.map(tag=>{
           value.push({id: `temp-${Math.floor(Math.random() * 1000+1)}`, name: tag});
        });
        this.setState({value, inputValue: ''});
    };

    handleRemoveTag = (tag) =>{
        this.setState({value: this.state.value.filter(value => value.name !==tag)});
    };

    getValue(){
        const {value} = this.state,
            cleanValue = JSON.parse(JSON.stringify(value));
        cleanValue.map(tag=>{
           if (isNaN(tag.id)) delete tag.id; //remove temporary ids for save
        });
        return cleanValue;
    }

    render() {
        const {id, name, tabIndex, buttonClassName, autoCapitalize, className, style, placeholder, disabled, index, editable} = this.props,
            {inputValue, value} = this.state;
        return (
            <div className="tags">
                <Input
                    name={name}
                    id={id}
                    className={`form-control with-button ${className}`}
                    style={style}
                    index={index}
                    placeholder={placeholder}
                    disabled={disabled}
                    value={inputValue}
                    autoCapitalize={autoCapitalize}
                    onChange={this.handleTagInput}
                    onKeyDown={this.handleTagEnter}
                    tabIndex={tabIndex}/>
                <Button className={`with-input ${buttonClassName}`} onClick={this.handleAddTag}><FaPlus/></Button>
                <TagContext.Provider value={{editable: editable, onRemove: this.handleRemoveTag}}>
                    <TagList tags={value}/>
                </TagContext.Provider>
            </div>
        );
    }

};

Tags.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    buttonClassName: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    /** Type of input, text or password */
    type: PropTypes.string.isRequired,
    /** Controls whether first character input is automatically capitalized */
    autoCapitalize: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func
};

Tags.defaultProps = {
    tabIndex: 1,
    type: "text",
    placeholder: '',
    disabled: false,
    className: '',
    buttonClassName: '',
    autoCapitalize: 'none',
    required: false
};

export default withForm(Tags);
