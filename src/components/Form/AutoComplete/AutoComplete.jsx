import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import {injectIntl} from 'react-intl';
import escapeRegExp from 'lodash/escapeRegExp';

import {withForm} from '../FormContext';
import FormElement from '../FormElement';

import './AutoComplete.scss';

export class AutoComplete extends FormElement {

    state = {
        inputValue: this.props.value || '',
        suggestions: [],
        selected: null
    };

    componentDidUpdate(prevProps){
        if(this.props.value !== prevProps.value){
            this.setState({inputValue: this.props.value});
        }
    }

    getSuggestions = (searchTerm) => {
        const escapedValue = escapeRegExp(searchTerm.trim()),
            regex = new RegExp(escapedValue, 'i'),
            suggestionFilter = (suggestion => regex.test(this.props.getSearchText(suggestion)));

        if (escapedValue === '') {
            return [];
        }

        if (this.props.multiSection) {
            return this.props.data
                .map(section => {
                    return {
                        [this.props.sectionTitleProp]: section[this.props.sectionTitleProp],
                        [this.props.sectionDataProp]: section[this.props.sectionDataProp].filter(suggestionFilter)
                    };
                })
                .filter(section => section[this.props.sectionDataProp].length > 0);
        } else {
            return this.props.data.filter(suggestionFilter);
        }
    };
    
    // This is the input value when a selection is chosen.
    getSuggestionValue = (suggestion) => {
        return this.props.getSearchText(suggestion);
    };

    onChangeWrapper = (e, {newValue, method}) => {
        e.persist();

        const {getSearchText} = this.props,
            noMatch = this.state.selected && newValue !== getSearchText(this.state.selected),
            selectedValue = noMatch ? null : this.state.value,  // reset value if input no longer matches selected
            params = {
                selected: noMatch ? null : this.state.selected, // reset selected if input no longer matches selected
                inputValue: newValue
            };
        this.setState(params, ()=>{
            this.onFormElementChange(selectedValue);
        });

    };

    onBlurWrapper = (e, { highlightedSuggestion }) => {
        if (highlightedSuggestion && this.state.inputValue === this.props.getSearchText(highlightedSuggestion)) {
            this.onSuggestionSelected(e, {suggestion: highlightedSuggestion})
        }
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({suggestions: this.getSuggestions(value)});
    };

    onSuggestionsClearRequested = () => {
        this.setState({suggestions: []});
    };

    onSuggestionSelected = (e, {suggestion}) => {
        this.setState({selected: suggestion});
        this.onFormElementChange(suggestion);
    };

    onSuggestionHighlighted = ({ suggestion }) => {
        if (suggestion && this.state.inputValue === this.props.getSearchText(suggestion)) {
            this.onSuggestionSelected({}, {suggestion})
        }
    };

    renderSectionTitle = (section) => {
        return section[this.props.sectionTitleProp];
    };

    getSectionSuggestions = (section) => {
        return section[this.props.sectionDataProp];
    };

    renderSuggestion = (suggestion, { query }) => {
        return this.props.renderSuggestion(suggestion, this.props.getSearchText, query);
    };

    clearSuggestion = () => {
        this.setState({inputValue: ''});
    };

    render() {
        const {inputValue, suggestions} = this.state,
            {multiSection, placeholder, intl, id, name, type, className, highlightFirstSuggestion} = this.props;
        // Autosuggest will pass through these props to the input.
        const inputProps = {
            id,
            name,
            type,
            className: `form-control ${className}`,
            placeholder: placeholder && intl ? intl.formatMessage(placeholder.def, placeholder.values) : '',
            value: inputValue,
            onChange: this.onChangeWrapper,
            onBlur: this.onBlurWrapper
        };

        return (
            <div className="auto-complete">
                <Autosuggest
                    multiSection={multiSection}
                    highlightFirstSuggestion={highlightFirstSuggestion}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={this.onSuggestionSelected}
                    onSuggestionHighlighted={this.onSuggestionHighlighted}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    renderSectionTitle={this.renderSectionTitle}
                    getSectionSuggestions={this.getSectionSuggestions}
                    inputProps={inputProps} />
            </div>
        );
    }
}

AutoComplete.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.object,
    data: PropTypes.array.isRequired,
    idProp: PropTypes.string,
    getSearchText: PropTypes.func.isRequired,
    multiSection: PropTypes.bool.isRequired,
    sectionTitleProp: PropTypes.string.isRequired,
    sectionDataProp: PropTypes.string.isRequired,
    highlightFirstSuggestion: PropTypes.bool.isRequired,
    renderSuggestion: PropTypes.func
};

AutoComplete.defaultProps = {
    className: '',
    type: 'search',
    data: [],
    idProp: 'id',
    multiSection: false,
    sectionTitleProp: 'title',
    sectionDataProp: 'data',
    highlightFirstSuggestion: false,
    renderSuggestion: (suggestion, getSearchText, query) =>{
        const regex = new RegExp(`(${query})`, 'i'),
            suggestionText = getSearchText(suggestion),
            parts = suggestionText.split(regex).filter(Boolean);
        return parts.map((part, index) => (
            <span className={part.toLowerCase() === query.toLowerCase() ? 'auto-complete__highlight' : ''} key={index}>{part}</span>
        ))
    }
};

export const UncontrolledAutoComplete = AutoComplete;
export default injectIntl(withForm(AutoComplete));