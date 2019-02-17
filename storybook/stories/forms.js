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
        <Forms.Input id="input" name="input"
                     disabled={boolean("Disabled", false)}
                     label="Text Input" wrapper={true} required={true}/>
    ))
    .add('Textarea', ()=>(
        <Forms.Textarea id="textarea" name="textarea"
                        disabled={boolean("Disabled", false)}
                        maxLength={number("Max", 100)}
                        label="Textarea"  wrapper={true} required={true}/>
    ))
    .add('Rich Text Editor', ()=>(
        <Forms.RichTextEditor id="richtexteditor" name="richtexteditor"
                              disabled={boolean("Disabled", false)}
                              label="Rich Text Editor" wrapper={true} required={true}/>
    ))
    .add('Select', ()=>(
        <Forms.Select id="select" name="select"
            options={options}
            disabled={boolean("Disabled", false)}
            add={boolean('Add', true)} label="Select" wrapper={true} required={true}/>
    ))
    .add('Date Picker', ()=>(
        <Forms.DatePicker id="datepicker" name="datepicker"
            disabled={boolean("Disabled", false)}
            label="Date Picker" wrapper={true} required={true}/>
    ))
    .add('Time Picker', ()=>(
        <Forms.TimePicker id="timepicker" name="timepicker"
            disabled={boolean("Disabled", false)}
            label="Date Picker" wrapper={true} required={true}/>
    ))
    .add('Date/Time Picker', ()=>(
        <Forms.DateTimePicker id="datetimepicker" name="datetimepicker"
            disabled={boolean("Disabled", false)}
            label="Date Picker" wrapper={true} required={true}/>
    ))
    .add('File Picker', ()=>(
        <Forms.FilePicker  id="filepicker" name="filepicker"
                            disabled={boolean("Disabled", false)}
                            label="File Picker" wrapper={true} required={true}/>
    ))
    .add('Image Picker', ()=>(
        <Forms.ImagePicker  id="imagepicker" name="imagepicker"
                            disabled={boolean("Disabled", false)}
                            label="Image Picker" wrapper={true} required={true}/>
    ))
    .add('Color Picker', ()=>(
        <Forms.ColorPicker  id="colorpicker" name="colorpicker"
                            disabled={boolean("Disabled", false)}
                            label="Color Picker" wrapper={true} required={true}/>
    ))
    .add('Checkbox List', ()=>(
        <Forms.CheckboxList id="checkboxlist" name="checkboxlist"
                            options={options}
                            disabled={boolean("Disabled", false)}
                            label="Checkbox List" wrapper={true} required={true}/>
    ))
    .add('Radio List', ()=>(
        <Forms.RadioList id="radiolist" name="radiolist"
                         options={options}
                         disabled={boolean("Disabled", false)}
                         label="Radio List" wrapper={true} required={true}/>
    ))
;

export default stories;
