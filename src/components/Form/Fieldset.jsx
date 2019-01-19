import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Fieldset extends Component {

    render (){
        const {children} = this.props;
        return (
            <fieldset>
                {children}
            </fieldset>
        )
    }
}

Fieldset.propTypes = {
    children: PropTypes.array.isRequired
};

export default Fieldset;

