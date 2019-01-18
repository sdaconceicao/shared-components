import React from "react";

export const getFormElementsFromNode = (node, childProps) =>{
    Array.isArray(node) && node.map(child=>{
        if(child.props){
            if (child.props.name ) {
                if (!isNaN(child.props.index)){
                    if ( !childProps[child.props.name]) childProps[child.props.name] = [];
                    childProps[child.props.name][child.props.index] = {...child.props};
                } else {
                    childProps[child.props.name] = {...child.props};
                }
            } else {
                childProps = getFormElementsFromNode(child.props.children, childProps);
            }
        } else if (Array.isArray(child)){
            childProps = getFormElementsFromNode(child, childProps);
        }
    });
    if (node && node.props && node.props.name) {
        childProps[node.props.name] = {...node.props};
    }
    return childProps;
};

export const getNumberOfItems = (state) =>{
    let entries = 0;
    for (const p in state) {
        if( state.hasOwnProperty(p) ) {
            if (Array.isArray(state[p])){
                entries = entries + state[p].length;
            } else {
                entries = entries + 1;
            }
        }
    }
    return entries;
};

export const renderChildren = (children, onSubmit, state) =>{
    if ( Array.isArray(children)){
        return children.map((child, index)=>{
            if (Array.isArray(child)){
                return child.map(element=>{
                    return renderElement(element, onSubmit, state, index);
                })
            } else {
                return renderElement(child, onSubmit, state, index);
            }
        });
    } else {
        return renderElement(children, onSubmit, state);
    }
};

export const renderElement = (element, onSubmit, state, index) => {
    if(element.props) {
        if (element.props.type === 'submit'){  //Adds special onSubmit wrapper that cleans state
            return React.cloneElement(element, {
                key: element.props.id ||  element.props.name ||  index,
                onClick: onSubmit
            })
        } else if(element.props.name){  //A form component, needs form state added to it
            return React.cloneElement(element, {
                key:  element.props.id ||  element.props.name ||  index,
                value: state[element.props.name] ?
                            !isNaN(element.props.index) && state[element.props.name][index]
                                ? state[element.props.name][index].value
                                : state[element.props.name].value
                                    : ''
            })
        } else if(element.props.children){ //Children to iterate over
            return React.cloneElement(element, {
                children: renderChildren(element.props.children, onSubmit, state)
            });
        } else { //A plain element that can just be returned untouched
            return element;
        }
    } else { //A plain element that can just be returned untouched
        return element;
    }
};
