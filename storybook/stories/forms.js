import React from 'react';
import {storiesOf} from "@storybook/react";

import {Forms} from "../../src/index";

const options = [
    {label: "Bacon", value: "bacon" },
    {label: "Eggs", value: "eggs"},
    {label: "Ham", value: "ham"}
];

export default storiesOf('Form', module)
    .add('Input', ()=>(
        <Forms.Input label="Text Input" wrapper={true} required={true}/>
    ))
    .add('Textarea', ()=>(
        <Forms.Textarea label="Textarea" wrapper={true} required={true}/>
    ))
    .add('Rich Text Editor', ()=>(
        <Forms.RichTextEditor label="Rich Text Editor" wrapper={true} required={true}/>
    ))
    .add('Select', ()=>(
        <Forms.Select options={options} label="Select" wrapper={true} required={true}/>
    ))
    .add('Select with Add', ()=>(
        <Forms.Select options={options} add={true} label="Select" wrapper={true} required={true}/>
    ))
    .add('Date Picker', ()=>(
        <Forms.DatePicker label="Date Picker" wrapper={true} required={true}/>
    ))
    .add('Checkbox List', ()=>(
        <Forms.CheckboxList options={options} label="Checkbox Listr" wrapper={true} required={true}/>
    ))
    .add('Radio List', ()=>(
        <Forms.RadioList options={options} label="Radio List" wrapper={true} required={true}/>
    ))
;
