import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {FormContext} from './FormContext';

export class Form extends Component {

    state = {};

    componentDidMount(){
        let childProps = {};
        this.props.children && this.props.children.map(child=>{
            if (child.props.name) {
                childProps[child.props.name] = {...child.props};
            }
        });

        this.setState(childProps);
    }

    onChange = (e, target) =>{
        const value = e.value === null
            ? null
            : e.value;
        this.setState((previousState) => {
            previousState[target].value = value;
            if (e.checked !== undefined) previousState[target].checked = e.checked;
            return previousState;
        });
    };

    onSubmit = (e) =>{
        e.preventDefault();
        const results = [];
        Object.keys(this.state).map(key => {
            results[key] = this.state[key].value;
        });

        this.props.onSubmit(results);
    };

    render (){
        const {children} = this.props;
        return (
            <FormContext.Provider value={{onChange: this.onChange}}>
                <form>
                    {children.map((child, index)=>{
                        return child.props.type === 'submit'
                        ? React.cloneElement(child, {
                                key: child.props.id ||  child.props.name ||  index,
                                onClick: this.onSubmit
                            })
                        :  React.cloneElement(child, {
                                key: child.props.id ||  child.props.name ||  index,
                                value: this.state[child.props.name] ? this.state[child.props.name].value : ''
                            })
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

