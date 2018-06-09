import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import TextAreaAutosize from 'react-textarea-autosize';

import Label from './Label';

/** Textarea component with label */
class Textarea extends Component {

    constructor(props) {
        super(props);
        this.state = {value: props.value};
        this.onChangeWrapper = this.onChangeWrapper.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.value !== prevState.value) {
            return {
                value: nextProps.value
            };
        }
        return null;
    }

    onChangeWrapper(e){
        const {onChange} = this.props;
        this.setState({value: e.target.value});
        e.persist();
        onChange && onChange({...e, value: e.target.value}, this.props.id)
    }

    render () {
        const {
            id, name, type, tabIndex, minRows, maxLength, placeholder, className, disabled,
            label, required,
            onBlur
        } = this.props,
        {value} = this.state;

        return (
            <Fragment>
                {label && <Label htmlFor={id} required={required}>{label}</Label>}
                <TextAreaAutosize
                    id={id}
                    type={type}
                    name={name}
                    minRows={minRows}
                    className={`form-control ${className}`}
                    disabled={disabled}
                    placeholder={placeholder}
                    value={value}
                    tabIndex={tabIndex}
                    maxLength={maxLength}
                    onBlur={onBlur}
                    onChange={this.onChangeWrapper}/>
            </Fragment>

        )
    }
};

Textarea.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    /** Max number of characters allowed in field */
    maxLength: PropTypes.number,
    /** Default number of rows to display for an empty textara */
    minRows: PropTypes.number,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
};

Textarea.defaultProps = {
    tabIndex: 1,
    minRows: 3,
    className: '',
    placeholder: ''
};

export default Textarea;
