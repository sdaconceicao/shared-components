import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

export class Fieldset extends Component {

    render (){
        const {children, handleAdd, handleRemove, addText} = this.props;
        return (
            <fieldset>
                {children.map((child, index)=>{
                    return child.props && child.props.name
                        ? <Fragment>
                            {child}
                            {handleRemove && <Button onClick={()=>handleRemove(index)}>X</Button>}
                        </Fragment>
                        : child
                })}
                {handleAdd &&
                    <Button onClick={handleAdd}>{addText}</Button>
                }
            </fieldset>
        )
    }
}

Fieldset.propTypes = {
    addText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: PropTypes.array.isRequired,
    handleRemove: PropTypes.func,
    handleAdd: PropTypes.func
};

export default Fieldset;

