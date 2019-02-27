import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import moment from 'moment';

import {getMetaDataFromImage} from "./Image.util";

import './ImageMeta.scss';

export class ImageMeta extends Component{

    state = {
        meta: this.props.meta
    };

    componentDidMount(){
        this.props.image && getMetaDataFromImage(this.props.image).then((meta)=>{
           this.setState({meta});
        });
    }

    render() {
        const {className} = this.props,
            {meta} = this.state;
        if (!meta) return null;
        return (
            <ul className={`image-meta list-style--none ${className}`}>
                <li className="image-meta__list-item">
                    <label className="image-meta__label"><FormattedMessage id="image.dimensions"/></label>
                    {meta.width} x {meta.height}
                </li>
                {meta.Make &&
                    <li className="image-meta__list-item">
                        <label className="image-meta__label"><FormattedMessage id="image.make"/></label>
                        {meta.Make}
                    </li>
                }
                {meta.Model &&
                    <li className="image-meta__list-item">
                        <label className="image-meta__label"><FormattedMessage id="image.model"/></label>
                        {meta.Model}
                    </li>
                }
                {meta.dateTaken &&
                    <li className="image-meta__list-item">
                        <label className="image-meta__label"><FormattedMessage id="image.dateTaken"/></label>
                        {moment(meta.dateTaken).format('MMM Do YYYY, h:mm A') }
                    </li>
                }
            </ul>
        );
    }
}

ImageMeta.propTypes = {
    className: PropTypes.string,
    image: PropTypes.object,
    meta: PropTypes.object
};

ImageMeta.defaultProps = {
    className: ''
};

export default ImageMeta;