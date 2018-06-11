import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {FormContext} from './FormContext';

export class Form extends Component {

    render (){
        const {children, onChange} = this.props;
        return (
            <FormContext.Provider value={{onChange}}>
                <form>
                    {children}
                </form>
            </FormContext.Provider>
        )
    }
}

Form.propTypes = {
    children: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Form;

