import React from 'react';

import {FormElementWrapper} from './FormElement';

export const FormContext = React.createContext('formContext');

export function withForm(Component) {
    return function FormComponent(props) {
        return (
            <FormContext.Consumer>
                { (context) => {
                    const {addFormElement, removeFormElement} = context;
                    if(props.wrapper) {
                        return (
                            <FormElementWrapper id={props.id} label={props.label} required={props.required}>
                                <Component {...props}
                                       addFormElement={addFormElement}
                                       removeFormElement={removeFormElement}/>
                            </FormElementWrapper>
                        )
                    } else {
                        return <Component {...props}
                                   addFormElement={addFormElement}
                                   removeFormElement={removeFormElement}
                        />
                    }
                }}
            </FormContext.Consumer>
        );
    };
}