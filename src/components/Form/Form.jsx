import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {FormContext} from './FormContext';
import {getFormElementsFromNode, getNumberOfItems, renderChildren} from './Form.util';

export class Form extends Component {

    state = {};

    componentDidMount(){
        const childProps = getFormElementsFromNode(this.props.children, this.state);
        this.setState(childProps);
    }

    componentDidUpdate(prevProps){

        const numberElements = getNumberOfItems(getFormElementsFromNode(this.props.children, {})),
            existingElements = getNumberOfItems(getFormElementsFromNode(prevProps.children, {}));
        if(numberElements !== existingElements){ //Add new state objects for dynamically added form elements
            const childProps = getFormElementsFromNode(this.props.children, this.state);
            this.setState(childProps);
        }

    }

    onChange = (e, target, index) =>{
        const value = e.value === null
            ? null
            : e.value;

        this.setState((previousState) => {
            if(!isNaN(index)){
                previousState[target][index].value = value;
            } else {
                previousState[target].value = value;
            }
            if (e.checked !== undefined) previousState[target].checked = e.checked;
            return previousState;
        });
    };

    onSubmit = (e) =>{
        e.preventDefault();
        const results = [];
        Object.keys(this.state).map(key => {
            if (Array.isArray(this.state[key])) {
               results[key] = this.state[key].map(element => element.value);
            } else {
                results[key] = this.state[key].value && this.state[key].value.value
                    ? this.state[key].value.value
                    : this.state[key].value;
            }
        });

        this.props.onSubmit(results);
    };

    render (){
        const {children} = this.props;
        return (
            <FormContext.Provider value={{onChange: this.onChange}}>
                <form>
                    {renderChildren(children, this.onSubmit, this.state)}
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

