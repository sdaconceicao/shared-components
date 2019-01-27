import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Fieldset extends Component {

    render (){
        const {children, legend, required} = this.props;
        return (
            <fieldset>
                {legend && <legend>{legend}{required && <span>*</span>}</legend>}
                {children}
            </fieldset>
        )
    }
}

Fieldset.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};

export default Fieldset;

