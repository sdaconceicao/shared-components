import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {FormContext} from './FormContext';

export class Form extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        let childProps = {};
        this.props.children.map(child=>{
            if (child.props.name) {
                childProps[child.props.name] = {...child.props};
            }
        });

        this.setState(childProps);
    }

    onChange(e, target){
        const value = e.value === null ? null : e.value;
        this.setState((previousState) => {
            console.log("IS", previousState[target], target);
            previousState[target].value = value;
            if (e.checked !== undefined) previousState[target].checked = e.checked;
            return previousState;
        });
    }

    render (){
        const {children, onSubmit} = this.props;
        return (
            <FormContext.Provider value={{onChange: this.onChange}}>
                <form>
                    {children.map(child=>{
                        if (child.props.type === 'submit'){
                            return (
                                React.cloneElement(child, {
                                    onClick: (e)=>{e.preventDefault(); onSubmit(this.state);}
                                })
                            )
                        } else {
                            return(
                                React.cloneElement(child, {
                                    value: this.state[child.props.name] ? this.state[child.props.name].value : null
                                })
                            )
                        }


                    })}
                </form>
            </FormContext.Provider>
        )
    }
}

Form.propTypes = {
    children: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default Form;

