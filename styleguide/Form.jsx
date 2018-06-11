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
            <form>
                <Form.TextInput id="textinput" name="textInput" type="text" label="Text Input" value={textInput} onChange={this.onChange}/>
                <Form.Textarea id="textarea" name="textArea" type="input" label="Text Area" value={textArea} onChange={this.onChange}/>
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
    }

};

export default FormStyleguide;