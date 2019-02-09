import React, {Fragment} from 'react'
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color'
import FaClose from 'react-icons/lib/fa/close';

import {withForm} from '../FormContext';
import FormElement from "../FormElement";

export class ColorPickerDialog extends FormElement {
    state = {
        color: {
            hex: this.props.value
        },
    };

    onChange = (color) => {
        const {onChange} = this.props;
        this.setState({ color});
        onChange && onChange(color.hex);
    };

    render() {
        const {onClose, presetColors} = this.props,
            {color} = this.state;
        return (
            <Fragment>
                <button className="color-dropdown__close" onClick={ onClose }><FaClose/></button>
                <SketchPicker disableAlpha={true}
                              color={ color }
                              onChange={ this.onChange }
                              presetColors={presetColors}
                />
            </Fragment>
        )
    }
}

ColorPickerDialog.propTypes = {
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    presetColors: PropTypes.array
};

ColorPickerDialog.defaultProps = {
    presetColors: ['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505',
        '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A',
        '#9B9B9B', 'transparent']
};

export default withForm(ColorPickerDialog);