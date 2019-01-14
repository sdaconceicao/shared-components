import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {FormContext} from './FormContext';
import {getFormElementsFromNode} from './Form.util';

export class Form extends Component {

    state = {};

    componentDidMount(){
        const childProps = getFormElementsFromNode(this.props.children);
        this.setState(childProps);
    }

    componentDidUpdate(prevProps){

    }

    onChange = (e, target) =>{
        const value = e.value === null
            ? null
            : e.value;
        this.setState((previousState) => {
            console.log("SETTING", target, value)
            previousState[target].value = value;
            if (e.checked !== undefined) previousState[target].checked = e.checked;
            return previousState;
        });
    };

    onSubmit = (e) =>{
        e.preventDefault();
        const results = [];
        Object.keys(this.state).map(key => {
            results[key] = this.state[key].value  && this.state[key].value.value
                ? this.state[key].value.value
                : this.state[key].value;
        });

        this.props.onSubmit(results);
    };

    render (){
        const {children} = this.props;
        return (
            <FormContext.Provider value={{onChange: this.onChange}}>
                <form>
                    {children.map((child, index)=>{
                        return child.props && child.props.type === 'submit'
                        ? React.cloneElement(child, {
                                key: child.props.id ||  child.props.name ||  index,
                                onClick: this.onSubmit
                            })
                        : child.props
                            ? React.cloneElement(child, {
                                key: child.props.id ||  child.props.name ||  index,
                                value: this.state[child.props.name] ? this.state[child.props.name].value : ''
                            })
                            : child
                    })}
                </form>
            </FormContext.Provider>
        )
    }
}

Form.propTypes = {
    children: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default Form;

