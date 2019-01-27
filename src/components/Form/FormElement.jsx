import {Component} from 'react';

/** Abstract FormElement class used to setup forms for usage within Form component */
export class FormElement extends Component {

    state = {
        value: this.props.value
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

    onChange(e){
        this.setState({value: e && e.value});
        this.props.onChange && this.props.onChange({
            value: e.value,
            name: this.props.name
        });
    }

    getValue(){
        return this.state.value;
    }

};

export default FormElement;
