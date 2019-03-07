import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import {withForm} from '../FormContext';
import FormElement from '../FormElement';
import Label from '../Label';
import Button from '../Button'

import './FilePicker.scss';
import {correctImageOrientation} from "../../Image/Image.util";

/** File Picker component with optional label */
export class FilePicker extends FormElement {

    onChange = (e) =>{
        const {onChange, onSelect} = this.props,
            reader = new FileReader(),
            filename = e.target.files[0].name,
            extension = filename.split('.').pop().toLowerCase();

        reader.onload = (event) => {
            onSelect && onSelect(event.target.result);
            if (['jpeg', 'jpg'].includes(extension)){
                correctImageOrientation(event.target.result).then(value=>{
                    this.setState({value});
                    onChange && onChange(value);
                });
            } else {
                this.setState({value: event.target.result});
                onChange && onChange(event.target.result, filename);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    render() {
        const {id, name, tabIndex, className, buttonClassName, disabled, accepts, index, children:buttonText, render} = this.props,
            {value} = this.state;

        return (
            <div className={`file-upload ${className}`}>
                <Button disabled={disabled} className={`file-upload__button ${buttonClassName}`}>
                    <Label htmlFor={id} className={'file-upload__label'}>{buttonText}</Label>
                    <input
                        name={name}
                        id={id}
                        className='file-upload__input'
                        index={index}
                        type="file"
                        accepts={accepts}
                        disabled={disabled}
                        tabIndex={tabIndex}
                        onChange={this.onChange}/>
                </Button>
                {value && render &&
                    <div className='file-upload__preview'>
                        {render(value)}
                    </div>
                }
            </div>
        );
    }

}

FilePicker.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    buttonClassName: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number.isRequired,
    accepts: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    required: PropTypes.bool,
    onChange: PropTypes.func
};

FilePicker.defaultProps = {
    tabIndex: 1,
    disabled: false,
    className: '',
    buttonClassName: '',
    required: false,
    children: <FormattedMessage id='file.button'/>
};

export default withForm(FilePicker);
