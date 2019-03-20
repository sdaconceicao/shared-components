import React from 'react';

import {FormElementWrapper} from './FormElement';

export const FormContext = React.createContext('formContext');

export function withForm(Component) {
    const componentRef = React.createRef();
    return function FormComponent(props) {
        return (
            <FormContext.Consumer>
                { (context) => {
                    const errors = componentRef.current
                            ? componentRef.current.state.errors
                            : null;

                    if(props.wrapper !== false && (props.label || props.wrapper)) {
                        return (
                            <FormElementWrapper id={props.id}
                                                label={props.label}
                                                required={props.required}
                                                errors={errors}>
                                <Component {...props}
                                           {...context}
                                       ref={componentRef}/>
                            </FormElementWrapper>
                        )
                    } else {
                        return <Component {...props}
                                          {...context}/>
                    }
                }}
            </FormContext.Consumer>
        );
    };
}