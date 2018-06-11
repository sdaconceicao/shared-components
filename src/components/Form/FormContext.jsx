import React from 'react';

export const FormContext = React.createContext('formContext');

export function withForm(Component) {
    return function FormComponent(props) {
        return (
            <FormContext.Consumer>
                { (context) => {
                    const {onChange} = context;
                    return (
                        <Component {...props}
                                   onChange={onChange}/>
                    )
                }}
            </FormContext.Consumer>
        );
    };
}