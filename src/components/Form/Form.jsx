import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import {FormContext} from './FormContext';
import {Alert} from '../Messages';

import "./Form.scss";

export class Form extends Component {

    elements = [];
    state = {};

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

    onSubmit = async (e) =>{
        e.preventDefault();
        const results = {},
            errors = [];
        const getValues = this.elements.map(async element=>{
            const {name, index} = element.props,
                validated = await element.doValidate();
            if(validated){
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
            } else {

                errors.push(...element.state.errors);
            }
        });
        Promise.all(getValues).then(()=> {
            if (errors.length > 0) {
                this.setState({errors});
            } else {
                this.setState({errors: null});
                this.props.onSubmit(results);
            }
        });
    };

    render (){
        const {children, className} = this.props,
            {errors} = this.state;
        return (
            <FormContext.Provider value={{
                    addFormElement: this.addFormElement,
                    removeFormElement: this.removeFormElement
                }}>
                <form onSubmit={this.onSubmit} className={`form ${className}`}>
                    <Fragment>
                        {errors && errors.length > 0 &&
                            <Alert type="error">
                                <ul className="alert__list">
                                {errors.map((error, index)=>(
                                    <li className="alert__list-item" key={index}>{error.value}</li>
                                ))}
                                </ul>
                            </Alert>
                        }
                        {children}
                    </Fragment>
                </form>
            </FormContext.Provider>
        )
    }
}

Form.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    className: PropTypes.string,
    onSubmit: PropTypes.func.isRequired
};

export default Form;

