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
            textArea: 'text area'
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e, target){
        this.setState(JSON.parse(`{"${target}": "${e.value}"}`));
    }

    render(){
        const {options, textInput, textArea} = this.state;
        return (
            <Form.Form onChange={this.onChange}>
                <Form.TextInput id="textinput" name="textInput" type="input" label="Text Input" value={textInput}/>
                <Form.Textarea id="textarea" name="textArea" type="input" label="Text Area" value={textArea}/>
                <Form.DateTimePicker id="dateTimePicker" name="dateTimePicker"/>
                <Form.TimePicker id="timePicker" name="timePicker" />
                <Form.DatePicker id="datePicker" name="datePicker"/>
                <Form.Checkbox id="checkbox" name="checkbox" value={true}>Save</Form.Checkbox>
                <Form.Select id="select-autocomplete" name="autocomplete" add={true} options={options}>Save</Form.Select>
                <Form.Select id="select-one" name="select" options={options}>Save</Form.Select>
                <Form.Button type="submit">Save</Form.Button>
            </Form.Form>
        )
    }

};

export default FormStyleguide;