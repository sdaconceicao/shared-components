import React from 'react';

export const FormContext = React.createContext('formContext');

export function withForm(Component) {
    return function FormComponent(props) {
        return (
            <FormContext.Consumer>
                { (context) => {
                    const {addFormElement, removeFormElement} = context;
                    return (
                        <Component {...props}
                                   addFormElement={addFormElement}
                                   removeFormElement={removeFormElement}
                        />
                    )
                }}
            </FormContext.Consumer>
        );
    };
}