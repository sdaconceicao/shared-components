import React, {Component} from 'react';
import {Form, Forms} from '../src';

class FormStyleguide extends Component{

    constructor(props){
        super(props);
        this.state = {
            options: [
                {value: 'bacon', label: 'Bacon'},
                {value: 'eggs', label: 'Eggs Cracked'},
                {value: 'ham', label: 'Ham'}
            ],
            textInput: 'text input',
            textArea: 'text area',
            date: new Date(),
            dateTime: new Date(),
            time: new Date(),
            checkbox: true,
            checkboxList: ['eggs']
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(values){
        console.log("VALUES", values);
    }

    render(){
        const {options, checkbox, checkboxList, textInput, textArea, date, dateTime, time} = this.state;
        return (
            <Form onSubmit={this.onSubmit}>
                <Forms.Input id="textinput" name="textInput" type="input" label="Text Input" value={textInput}/>
                <Forms.Textarea id="textarea" name="textArea" type="input" label="Text Area" value={textArea}/>
                <Forms.DateTimePicker id="dateTimePicker" name="dateTime"  value={dateTime}/>
                <Forms.TimePicker id="timePicker" name="time" value={time} />
                <Forms.DatePicker id="datePicker" name="date" value={date}/>
                <Forms.Checkbox id="checkbox" name="checkbox" checked={checkbox} value="checkbox1" label="Checkbox 1" />
                <Forms.Select id="select-autocomplete" name="autocomplete" add={true} options={options}/>
                <Forms.Select id="select-one" name="select" options={options}/>
                <Forms.CheckboxList id="select-one" name="foods" options={options} label="Checkbox List" value={checkboxList}/>
                <Forms.Button type="submit">Save</Forms.Button>
            </Form>
        )
    }

};

export default FormStyleguide;