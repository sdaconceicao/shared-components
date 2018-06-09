import React from 'react';
import {Form} from '../src';

export const FormStyleguide = () => {

    const options = [
            { value: 'bacon', label: 'Bacon' },
            { value: 'eggs', label: 'Eggs' },
            { value: 'ham', label: 'Ham' }
    ];

    return (
        <form>
            <Form.TextInput id="textinput" name="textinput" type="text" label="Text Input"/>
            <Form.Textarea id="textarea" name="textarea" type="input" label="Text Area"/>
            <Form.DateTimePicker id="dateTimePicker" name="dateTimePicker" onChange={(e)=>{
                console.log("Date / time:", e.value);
            }}
            />
            <Form.TimePicker id="timePicker" name="timePicker" onChange={(e)=>{
                console.log("Time:", e.value);
            }}
            />
            <Form.DatePicker id="datePicker" name="datePicker" onChange={(e)=>{
                console.log("Date:", e.value);
            }}
            />
            <Form.Checkbox id="checkbox" name="checkbox" value={true} onChange={(e)=>{
                console.log("Checkbox:", e.checked);
            }}>Save</Form.Checkbox>
            <Form.Select id="select-autocomplete" name="autocomplete" add={true} options={options}>Save</Form.Select>
            <Form.Select id="select-one" name="select" options={options}>Save</Form.Select>
            <Form.Button type="submit">Save</Form.Button>
        </form>
    )
};

export default FormStyleguide;