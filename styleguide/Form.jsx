import React, {Component} from 'react';
import {Form} from '../src';

class FormStyleguide extends Component{

    constructor(props){
        super(props);
        this.state = {
            options: [
                {value: 'bacon', label: 'Bacon'},
                {value: 'eggs', label: 'Eggs'},
                {value: 'ham', label: 'Ham'}
            ],
            textInput: 'text input',
            textArea: 'text area',
            checkbox: true,
        };
    }

    render(){
        const {options, checkbox, textInput, textArea} = this.state;
        return (
            <Form.Form onChange={this.onChange}>
                <Form.TextInput id="textinput" name="textInput" type="input" label="Text Input" value={textInput}/>
                <Form.Textarea id="textarea" name="textArea" type="input" label="Text Area" value={textArea}/>
                <Form.DateTimePicker id="dateTimePicker" name="dateTimePicker"/>
                <Form.TimePicker id="timePicker" name="timePicker" />
                <Form.DatePicker id="datePicker" name="datePicker"/>
                <Form.Checkbox id="checkbox" name="checkbox" checked={checkbox} value="checkbox1" label="Checkbox 1" />
                <Form.Select id="select-autocomplete" name="autocomplete" add={true} options={options}/>
                <Form.Select id="select-one" name="select" options={options}/>
                <Form.Button type="submit">Save</Form.Button>
            </Form.Form>
        )
    }

};

export default FormStyleguide;