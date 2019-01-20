import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {FormContext} from './FormContext';

export class Form extends Component {

    elements = [];

    addFormElement = (element) =>{
        if(this.elements.indexOf(element) === -1) {
            this.elements.push(element);
        }
    };

    removeFormElement = (element) =>{
        const elIndex = this.elements.indexOf(element);
        if (elIndex !== -1) {
            this.elements = this.elements.slice(0, elIndex).concat(this.elements.slice(elIndex + 1));
        }
    };

    onSubmit = (e) =>{
        e.preventDefault();
        const results = {};
        this.elements.map(element=>{
            if(!isNaN(element.props.index)){  //index indicates result is an array
                if (!results[element.props.name]) results[element.props.name] = [];
                results[element.props.name][element.props.index] = element.getValue();
            } else {
                results[element.props.name] = element.getValue();
            }

        });
        this.props.onSubmit(results);
    };

    render (){
        const {children} = this.props;
        return (
            <FormContext.Provider value={{
                    addFormElement: this.addFormElement,
                    removeFormElement: this.removeFormElement
                }}>
                <form onSubmit={this.onSubmit}>
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

