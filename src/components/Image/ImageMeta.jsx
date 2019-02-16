import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import {getMetaDataFromImage} from "./Image.util";

import './ImageMeta.scss';

export class ImageMeta extends Component{

    state = {};

    componentDidMount(){
        getMetaDataFromImage(this.props.image).then((meta)=>{
           this.setState({meta});
        });
    }

    render() {
        const {className} = this.props,
            {meta} = this.state;
        if (!meta) return null;
        return (
            <ul className={`image-meta ${className}`}>
                {meta.Make &&
                    <li>
                        <label><FormattedMessage id="image.make"/></label>
                        {meta.Make}
                    </li>
                }
                {meta.Model &&
                <li>
                    <label><FormattedMessage id="image.model"/></label>
                    {meta.Model}
                </li>
                }
                {meta.DateTime &&
                    <li>
                        <label><FormattedMessage id="image.date"/></label>
                        {meta.DateTime}
                    </li>
                }
                <li>
                    <label><FormattedMessage id="image.dimensions"/></label>
                    {meta.width} x {meta.height}
                </li>
            </ul>
        );
    }
}

ImageMeta.propTypes = {
    className: PropTypes.string,
    image: PropTypes.object
};

ImageMeta.defaultProps = {
    className: ''
};

export default ImageMeta;