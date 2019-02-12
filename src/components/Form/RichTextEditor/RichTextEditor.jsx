import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'

import FormElement from "../FormElement";
import {withForm} from "../FormContext";
import Label from "../Label";
import {ColorPicker} from "../ColorPicker";

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './RichTextEditor.scss';

export class RichTextEditor extends FormElement {

    state = {
        editorState: this.props.value
            ? EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(this.props.value)))
            : EditorState.createEmpty()
    };

    onChange = (editorState) => {
        this.setState({editorState});
        this.props.onChange && this.props.onChange({
            value: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
            name: this.props.name
        });
    };

    getValue(){
        return  draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    }

    render() {
        const {id, label, required, className, tabIndex, toolbar} = this.props,
            {editorState} = this.state;
        return (
            <Fragment>
                {label && <Label htmlFor={id} required={required}>{label}</Label>}
                <Editor id={id}
                        wrapperClassName={`richTextEditor ${className}`}
                        tabIndex={tabIndex}
                        editorState={editorState}
                        toolbar={toolbar}
                        onEditorStateChange={this.onChange}/>
            </Fragment>
        )
    }
}

RichTextEditor.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number.isRequired,
    toolbar: PropTypes.object,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    required: PropTypes.bool,
    onChange: PropTypes.func
};

RichTextEditor.defaultProps = {
    tabIndex: 1,
    className: '',
    toolbar: {
        options: ['fontSize', 'fontFamily', 'blockType', 'list', 'textAlign', 'colorPicker', 'link', 'image'],
        colorPicker: { component: ColorPicker },
    }

};


export default withForm(RichTextEditor);
