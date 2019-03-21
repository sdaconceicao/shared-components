import React, {PureComponent} from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from "prop-types";

/** Abstract FormElement class used to setup forms for usage within Form component */
export class FormElement extends PureComponent {

    state = {
        value: this.props.value,
        ref: React.createRef()
    };

    componentDidMount(){
        this.props.addFormElement && this.props.addFormElement(this);
    }

    componentWillUnmount(){
        this.props.removeFormElement && this.props.removeFormElement(this);
    }

    componentDidUpdate(prevProps){
        this.props.value !== prevProps.value && this.setState({ value: this.props.value });
    }

    onChange = (e) => {
        this.setState({value: e && e.value, dirty: true});
        this.props.onChange && this.props.onChange({
            value: e.value,
            dirty: true,
            name: this.props.name
        });
    };

    getValue(){
        return this.state.value;
    }

    doValidate(){
        return new Promise(resolve=>{
            const {required, name, label} = this.props,
                errors = [];
            if(required && !this.getValue()){
                errors.push({
                    type: required,
                    value: <FormattedMessage id='form.fieldRequired' values={{name: label || name}}/>
                });
            }

            if(errors.length > 0){
                this.setState({errors}, ()=>{
                    resolve(false);
                });
            } else {
                this.setState({errors: null}, ()=>{
                    resolve(true);
                });
            }
        });
    }
};

FormElement.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number.isRequired,
    required: PropTypes.bool,
    wrapper: PropTypes.bool,
    onChange: PropTypes.func
};

FormElement.defaultValues = {
    className: '',
    wrapper: true
};

export default FormElement;
