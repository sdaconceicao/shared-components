import React from 'react';
import {storiesOf} from "@storybook/react";
import { withKnobs, boolean, number } from '@storybook/addon-knobs';

import {Forms} from "../../src/index";

const stories = storiesOf('Form', module);

const options = [
    {label: "Bacon", value: "bacon" },
    {label: "Eggs", value: "eggs"},
    {label: "Ham", value: "ham"}
];

stories
    .addDecorator(withKnobs)
    .add('Input', ()=>(
        <Forms.Input disabled={boolean("Disabled", false)}
                     label="Text Input" wrapper={true} required={true}/>
    ))
    .add('Textarea', ()=>(
        <Forms.Textarea disabled={boolean("Disabled", false)}
                        maxLength={number("Max", 100)}
                        label="Textarea"  wrapper={true} required={true}/>
    ))
    .add('Rich Text Editor', ()=>(
        <Forms.RichTextEditor disabled={boolean("Disabled", false)}
                        label="Rich Text Editor" wrapper={true} required={true}/>
    ))
    .add('Select', ()=>(
        <Forms.Select
            options={options}
            disabled={boolean("Disabled", false)}
            add={boolean('Add', true)} label="Select" wrapper={true} required={true}/>
    ))
    .add('Date Picker', ()=>(
        <Forms.DatePicker
            disabled={boolean("Disabled", false)}
            label="Date Picker" wrapper={true} required={true}/>
    ))
    .add('Checkbox List', ()=>(
        <Forms.CheckboxList options={options}
                            disabled={boolean("Disabled", false)}
                            label="Checkbox List" wrapper={true} required={true}/>
    ))
    .add('Radio List', ()=>(
        <Forms.RadioList options={options}
                         disabled={boolean("Disabled", false)}
                         label="Radio List" wrapper={true} required={true}/>
    ))
;

export default stories;
