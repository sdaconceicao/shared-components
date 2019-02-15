import React from "react";
import Label from "../Label";

export const FormElementWrapper = ({children, label, id, required}) => (
    <div className={'form-element'}>
        {label && <Label htmlFor={id} required={required}>{label}</Label>}
        {children}
    </div>
);

export default FormElementWrapper;