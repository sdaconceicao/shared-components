import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';

/** Abstract FormElement class used to setup forms for usage within Form component */
export class FormElement extends Component {

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
        this.setState({value: e && e.value});
        this.props.onChange && this.props.onChange({
            value: e.value,
            name: this.props.name
        });
    };

    getValue(){
        return this.state.value;
    }

    doValidate(){
        return new Promise(resolve=>{
            const {required, name} = this.props,
                errors = [];
            if(required && !this.getValue()){
                errors.push({
                    type: required,
                    value: <FormattedMessage id='form.fieldRequired' values={{name}}/>
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

export default FormElement;
