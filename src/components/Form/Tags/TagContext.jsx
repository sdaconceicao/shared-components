import React from 'react';

export const TagContext = React.createContext('tagContext');

export function withTags(Component) {
    return function TagComponent(props) {
        return (
            <TagContext.Consumer>
                { (context) => {
                    const {editable, onRemove} = context;
                    return <Component {...props}
                                      editable={editable}
                                      onRemove={onRemove}
                    />
                }}
            </TagContext.Consumer>
        );
    };
}