import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import {withForm} from '../FormContext';
import FormElement from '../FormElement';
import Label from '../Label';
import Button from '../Button'

import './FilePicker.scss';

/** File Picker component with optional label */
export class FilePicker extends FormElement {

    onChange = (e) =>{
        const {onChange} = this.props,
            reader = new FileReader();

        reader.onload = (event) => {
            this.setState({value: event.target.result});
            onChange && onChange(event.target.result);
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    render() {
        const {id, name, tabIndex, className, disabled, accepts, label, required, index, children:buttonText, render} = this.props,
            {value} = this.state;

        return (
            <span className={`form-element file-upload ${className}`}>
                {label && <Label required={required}>{label}</Label>}
                <Button disabled={disabled} className={'file-upload__button'}>
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
            </span>
        );
    }

}

FilePicker.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
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
    required: false,
    children: <FormattedMessage id='file.button'/>
};

export default withForm(FilePicker);
