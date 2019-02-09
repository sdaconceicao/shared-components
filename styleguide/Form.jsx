import React, {Component} from 'react';
import {Form, Forms} from '../src';

class FormStyleguide extends Component{

    constructor(props){
        super(props);
        this.state = {
            options: [
                {label: 'Bacon', value: 'bacon' },
                {label: 'Eggs Cracked', value: 'eggs'},
                {label: 'Ham', value: 'ham'}
            ],
            color: '#ff0000',
            textInput: 'text input',
            textArea: 'text area',
            richtText: '<p>Hello World</p>',
            date: new Date(),
            dateTime: new Date(),
            time: new Date(),
            checkbox: true,
            checkboxList: ['eggs'],
            radioList: 'ham',
            select: 'eggs',
            autocomplete: 'eggs'
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(values){
        console.log("VALUES", values);
    }

    render(){
        const {options, checkbox, checkboxList, radioList, textInput, textArea, color, richtText, date, dateTime, time, select, autocomplete} = this.state;
        return (
            <Form onSubmit={this.onSubmit}>
                <Forms.Input id="textinput" name="textInput" type="input" label="Text Input" value={textInput}/>
                <Forms.Textarea id="textarea" name="textArea" type="input" label="Text Area" value={textArea} />
                <Forms.RichTextEditor id="richtext" name="richtext" label="Rich Text Editor" value={richtText}/>
                <Forms.ColorPicker id="color" name="color" label="Color Picker" value={color}/>
                <Forms.DateTimePicker id="dateTimePicker" name="dateTime"  value={dateTime}/>
                <Forms.TimePicker id="timePicker" name="time" value={time} />
                <Forms.DatePicker id="datePicker" name="date" value={date}/>
                <Forms.Checkbox id="checkbox" name="checkbox" checked={checkbox} value="checkbox1" label="Checkbox 1" />
                <Forms.Select id="select-autocomplete" name="autocomplete" add={true} options={options} value={autocomplete}/>
                <Forms.Select id="select-one" name="select" options={options} value={select}/>
                <Forms.CheckboxList id="check-list" name="foods" options={options} label="Checkbox List" value={checkboxList}/>
                <Forms.RadioList id="radio-list" name="foodsOne" options={options} label="Radio List" value={radioList}/>
                <Forms.Button type="submit">Save</Forms.Button>
            </Form>
        )
    }

};

export default FormStyleguide;