import React from "react";

export const getFormElementsFromNode = (node, childProps = {}) =>{
    Array.isArray(node) && node.map(child=>{
        if(child.props){
            if (child.props.name) {
                childProps[child.props.name] = {...child.props};
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