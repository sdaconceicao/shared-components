import React from 'react';
import {storiesOf} from "@storybook/react";
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import { withDocs } from 'storybook-readme';
import { withInfo } from '@storybook/addon-info';

import {Form, Button, Input as FormInput,
    UncontrolledInput as Input, UncontrolledTextarea as Textarea,
    UncontrolledRichTextEditor as RichTextEditor, UncontrolledSelect as Select,
    UncontrolledCheckboxList as CheckboxList, UncontrolledRadioList as RadioList,
    UncontrolledImagePicker as ImagePicker, UncontrolledFilePicker as FilePicker,
    UncontrolledColorPicker as ColorPicker, UncontrolledDatePicker as DatePicker,
    UncontrolledDateTimePicker as DateTimePicker, UncontrolledTimePicker as TimePicker,
    UncontrolledTags as Tags, UncontrolledDuration as Duration
} from "../../src/index";

import FormReadme from '../../src/components/Form/README.md';

export const formStories = storiesOf('Form');
export const elementStories = storiesOf('Form/Elements');

const options = [
    {label: "Bacon", value: "bacon" },
    {label: "Eggs", value: "eggs"},
    {label: "Ham", value: "ham"}
];

const tags = [{id: 1, value: 'breakfast'}, {id: 2, value: 'tasty'}],
    duration = 5;

const withCustomPreview = withDocs({
    PreviewComponent: ({ children }) => (
        <div style={{
            padding: '0'
        }}>{children}</div>
    )
});

formStories
    .addDecorator(withKnobs)
    .addDecorator(withInfo)
    .addDecorator(withCustomPreview(FormReadme))
    .add('Introduction', () => (
        <Form onSubmit={(results)=>{console.log("Returned", results)}}>
            <FormInput id="input" name="input"
                         disabled={boolean("Disabled", false)}
                         label="Text Input" wrapper={true} required={true}/>
            <Tags id="tags" name="tags"
                  value={tags}
                  editable={true}
                  disabled={boolean("Disabled", false)}
                  label="Tags" wrapper={true} required={true}/>
            <Button type="submit">Save</Button>
        </Form>
    ));

elementStories
    .addDecorator(withKnobs)
    .addDecorator(withInfo)
    .add('Input', ()=>(
        <div className="form-element">
            <Input id="input" name="input"
                     disabled={boolean("Disabled", false)}
                     label="Text Input" wrapper={true} required={true}/>
        </div>
    ))
    .add('Textarea', ()=>(
        <div className="form-element">
            <Textarea id="textarea" name="textarea"
                        disabled={boolean("Disabled", false)}
                        maxLength={number("Max", 100)}
                        label="Textarea"  wrapper={true} required={true}/>
        </div>
    ))
    .add('Rich Text Editor', ()=>(
        <div className="form-element">
            <RichTextEditor id="richtexteditor" name="richtexteditor"
                              disabled={boolean("Disabled", false)}
                              label="Rich Text Editor" wrapper={true} required={true}/>
        </div>
    ))
    .add('Select', ()=>(
        <div className="form-element">
            <Select id="select" name="select"
                options={options}
                disabled={boolean("Disabled", false)}
                add={boolean('Add', true)} label="Select" wrapper={true} required={true}/>
        </div>
    ))
    .add('Date Picker', ()=>(
        <div className="form-element">
            <DatePicker id="datepicker" name="datepicker"
            disabled={boolean("Disabled", false)}
            label="Date Picker" wrapper={true} required={true}/>
        </div>
    ))
    .add('Time Picker', ()=>(
        <div className="form-element">
            <TimePicker id="timepicker" name="timepicker"
                disabled={boolean("Disabled", false)}
                label="Date Picker" wrapper={true} required={true}/>
        </div>
    ))
    .add('Date/Time Picker', ()=>(
        <div className="form-element">
            <DateTimePicker id="datetimepicker" name="datetimepicker"
                disabled={boolean("Disabled", false)}
                label="Date Picker" wrapper={true} required={true}/>
        </div>
    ))
    .add('Duration', ()=>(
        <div className="form-element">
            <Duration id="duration" name="duration"
                  value={duration}
                  disabled={boolean("Disabled", false)}
                  label="Duration" wrapper={true} required={true}/>
        </div>
    ))
    .add('File Picker', ()=>(
        <div className="form-element">
            <FilePicker  id="filepicker" name="filepicker"
                            disabled={boolean("Disabled", false)}
                            label="File Picker" wrapper={true} required={true}/>
        </div>
    ))
    .add('Image Picker', ()=>(
        <div className="form-element">
            <ImagePicker  id="imagepicker" name="imagepicker"
                            disabled={boolean("Disabled", false)}
                            label="Image Picker" wrapper={true} required={true}/>
        </div>
    ))
    .add('Color Picker', ()=>(
        <div className="form-element">
            <ColorPicker  id="colorpicker" name="colorpicker"
                            disabled={boolean("Disabled", false)}
                            label="Color Picker" wrapper={true} required={true}/>
        </div>
    ))
    .add('Checkbox List', ()=>(
        <div className="form-element">
            <CheckboxList id="checkboxlist" name="checkboxlist"
                            options={options}
                            disabled={boolean("Disabled", false)}
                            label="Checkbox List" wrapper={true} required={true}/>
        </div>
    ))
    .add('Radio List', ()=>(
        <div className="form-element">
            <RadioList id="radiolist" name="radiolist"
                         options={options}
                         disabled={boolean("Disabled", false)}
                         label="Radio List" wrapper={true} required={true}/>
        </div>
    ))
    .add('Tags', ()=>(
        <div className="form-element">
            <Tags id="tags" name="tags"
                       value={tags}
                       editable={true}
                       disabled={boolean("Disabled", false)}
                       label="Tags" wrapper={true} required={true}/>
        </div>
    ))
;
