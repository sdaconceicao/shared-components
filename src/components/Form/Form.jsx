import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {FormContext} from './FormContext';

export class Form extends Component {

    elements = [];

    addFormElement = (elements) =>{
        if(this.elements.indexOf(elements) === -1) {
            this.elements.push(elements);
        }
    };

    removeFormElement = (elements) =>{
        const elIndex = this.elements.indexOf(elements);
        if (elIndex !== -1) {
            this.elements = this.elements.slice(0, elIndex).concat(this.elements.slice(elIndex + 1));
        }
    };

    onSubmit = (e) =>{
        e.preventDefault();
        const results = {};
        this.elements.map(element=>{
            if(!isNaN(element.props.index)){
                if (!results[element.props.name]) results[element.props.name] = []; //index indicates result is an array
                results[element.props.name][element.props.index] = element.state.value;
            } else {
                results[element.props.name] = element.state.value;
            }

        });

        this.props.onSubmit(results);
    };

    render (){
        const {children} = this.props;
        return (
            <FormContext.Provider value={{
                    onSubmit: this.onSubmit,
                    addFormElement: this.addFormElement,
                    removeFormElement: this.removeFormElement
                }}>
                <form>
                    {children}
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

