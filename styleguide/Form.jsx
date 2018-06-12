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
            date: null,
            dateTime: new Date(),
            time: new Date(),
            checkbox: true,
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(values){
        console.log("VALUES", values);
    }

    render(){
        const {options, checkbox, textInput, textArea, date, dateTime, time} = this.state;
        return (
            <Form.Form onSubmit={this.onSubmit}>
                <Form.TextInput id="textinput" name="textInput" type="input" label="Text Input" value={textInput}/>
                <Form.Textarea id="textarea" name="textArea" type="input" label="Text Area" value={textArea}/>
                <Form.DateTimePicker id="dateTimePicker" name="dateTime"  value={dateTime}/>
                <Form.TimePicker id="timePicker" name="time" value={time} />
                <Form.DatePicker id="datePicker" name="date" value={date}/>
                <Form.Checkbox id="checkbox" name="checkbox" checked={checkbox} value="checkbox1" label="Checkbox 1" />
                <Form.Select id="select-autocomplete" name="autocomplete" add={true} options={options}/>
                <Form.Select id="select-one" name="select" options={options}/>
                <Form.Button type="submit">Save</Form.Button>
            </Form.Form>
        )
    }

};

export default FormStyleguide;