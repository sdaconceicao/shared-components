import React, {Fragment} from 'react';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {stateToHTML} from 'draft-js-export-html';

import FormElement from "../FormElement";
import {withForm} from "../FormContext";

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from "prop-types";
import Label from "../Label";

export class RichTextEditor extends FormElement {

    state = {
        editorState: EditorState.createWithContent(
            ContentState.createFromBlockArray(convertFromHTML(this.props.value))
        )
    };

    onChange = (editorState) => {
        this.setState({editorState});
        this.props.onChange && this.props.onChange({
            value: stateToHTML(this.state.editorState.getCurrentContent()),
            name: this.props.name
        });
    };

    getValue(){
        return stateToHTML(this.state.editorState.getCurrentContent());
    }

    render() {
        const {id, label, required, className, tabIndex} = this.props,
            {editorState} = this.state;
        return (
            <Fragment>
                {label && <Label htmlFor={id} required={required}>{label}</Label>}
                <Editor id={id}
                        className={className}
                        tabIndex={tabIndex}
                        editorState={editorState}
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
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    required: PropTypes.bool,
    onChange: PropTypes.func
};

RichTextEditor.defaultProps = {
    tabIndex: 1,
    className: ''
};


export default withForm(RichTextEditor);
