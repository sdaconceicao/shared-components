import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {FormContext} from './FormContext';

import "./Form.scss";

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
            const {name, index} = element.props;
            if(!isNaN(index)){  //index indicates result is an array

                if(name.indexOf('.') !== -1){
                    const object = name.split('.'),
                        parent = object[0],
                        value = object[1];

                    if (!results[parent]) results[parent] = [];
                    if (!results[parent][index]) results[parent][index] = {};
                    results[parent][index][value] = element.getValue();
                } else {
                    if (!results[name]) results[name] = [];
                    results[name][index] = element.getValue();
                }

            } else {
                results[name] = element.getValue();
            }

        });
        this.props.onSubmit(results);
    };

    render (){
        const {children, className} = this.props;
        return (
            <FormContext.Provider value={{
                    addFormElement: this.addFormElement,
                    removeFormElement: this.removeFormElement
                }}>
                <form onSubmit={this.onSubmit} className={`form ${className}`}>
                    {children}
                </form>
            </FormContext.Provider>
        )
    }
}

Form.propTypes = {
    children: PropTypes.array.isRequired,
    className: PropTypes.string,
    onSubmit: PropTypes.func.isRequired
};

export default Form;

