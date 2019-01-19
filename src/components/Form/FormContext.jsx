import React from 'react';

export const FormContext = React.createContext('formContext');

export function withForm(Component) {
    return function FormComponent(props) {
        return (
            <FormContext.Consumer>
                { (context) => {
                    const {onSubmit, addFormElement, removeFormElement} = context;
                    return (
                        <Component {...props}
                                   onSubmit={onSubmit}
                                   addFormElement={addFormElement}
                                   removeFormElement={removeFormElement}
                        />
                    )
                }}
            </FormContext.Consumer>
        );
    };
}