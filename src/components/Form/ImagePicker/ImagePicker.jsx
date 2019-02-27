import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import FaTrash from 'react-icons/lib/fa/trash';

import {withForm} from '../FormContext';
import FormElement from '../FormElement';
import Button from '../Button';
import FilePicker from '../FilePicker';
import {Image, ImageMeta} from "../../Image";

import './ImagePicker.scss';

/** Image Picker component with optional label */
export class ImagePicker extends FormElement {

    onChange = (value) =>{
        const {onChange} = this.props;
        this.setState({value});
        onChange && onChange(value);
    };

    onImageLoad = (loadedImage) =>{
        this.setState({loadedImage});
    };

    onRemove = () =>{
        this.setState({value: undefined, loadedImage: undefined});
    };

    render() {
        const {id, name, tabIndex, className, buttonClassName, disabled, accepts, showMeta, index} = this.props,
            {value, loadedImage} = this.state;
        return (
            <div className={`image-picker ${className} ${value && showMeta ? 'image-picker--meta-shown' : ''}`}>
                <div className="image-picker__preview">
                    <Image src={value}
                          className="image-picker__preview-image"
                          onLoad={this.onImageLoad} />
                    {value &&
                        <Button className={`image-picker__remove ${buttonClassName}`}
                            onClick={this.onRemove}><FaTrash/></Button>
                    }
                </div>
                {!value &&
                    <FilePicker
                        name={name}
                        id={id}
                        index={index}
                        className="image-picker__file-picker"
                        buttonClassName={buttonClassName}
                        accepts={accepts}
                        disabled={disabled}
                        tabIndex={tabIndex}
                        onChange={this.onChange}/>
                }
                {loadedImage && showMeta &&
                    <ImageMeta className={'image-picker__meta'} image={loadedImage}/>
                }

            </div>
        );
    }

}

ImagePicker.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number.isRequired,
    accepts: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    required: PropTypes.bool,
    showMeta: PropTypes.bool,
    onChange: PropTypes.func
};

ImagePicker.defaultProps = {
    tabIndex: 1,
    disabled: false,
    className: '',
    required: false,
    showMeta: true,
    children: <FormattedMessage id='file.button'/>
};

export default withForm(ImagePicker);
