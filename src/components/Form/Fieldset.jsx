import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Fieldset extends Component {

    state = {};

    componentDidMount(){
        let childProps = {};
        this.props.children && this.props.children.map(child=>{
            if (child.props && child.props.name) {
                childProps[child.props.name] = {...child.props};
            }
        });

        this.setState(childProps);
    }



    render (){
        const {children} = this.props;
        return (
            <fieldset>
                {children.map((child, index)=>{
                    return child.props
                        ? React.cloneElement(child, {
                            key: child.props.id ||  child.props.name ||  index,
                            value: this.state[child.props.name] ? this.state[child.props.name].value : ''
                        })
                        : child
                })}
            </fieldset>
        )
    }
}

Fieldset.propTypes = {
    children: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default Fieldset;

