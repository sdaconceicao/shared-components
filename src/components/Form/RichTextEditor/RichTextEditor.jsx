import React from 'react';
import PropTypes from "prop-types";
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'

import FormElement from "../FormElement/FormElement";
import {withForm} from "../FormContext";
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

    shouldComponentUpdate(nextProps, nextState){
        const shouldUpdate = super.shouldComponentUpdate(nextProps, nextState);
        if (!shouldUpdate){
            if(this.state.editorState !== nextState.editorState){
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    getValue(){
        const html = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
        return html.trim() === "<p></p>"
            ? null
            : html;
    }

    render() {
        const {id, className, tabIndex, toolbar, disabled} = this.props,
            {editorState, errors} = this.state;
        return (
            <Editor id={id}
                    wrapperClassName={`richTextEditor ${className} ${errors ? 'error' : ''}`}
                    disabled={disabled}
                    tabIndex={tabIndex}
                    editorState={editorState}
                    toolbar={toolbar}
                    onEditorStateChange={this.onChange}/>
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
    required: PropTypes.bool,
    onChange: PropTypes.func
};

RichTextEditor.defaultProps = {
    tabIndex: 1,
    className: '',
    toolbar: {
        options: ['inline', 'fontSize', 'fontFamily', 'blockType', 'list', 'textAlign', 'colorPicker', 'link', 'image'],
        colorPicker: { component: ColorPicker },
        inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough'],
        }
    }

};

export default withForm(RichTextEditor);
