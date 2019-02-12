import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import * as spinner from './spinner.gif';
import * as image from './placeholder.png';

export class PlaceholderImage extends Component {

    state = {
        loading: true,
        placeholderSrc: this.props.placeholder === 'spinner' ? spinner.default : image.default
    };

    loadedImage = React.createRef();

    onLoad = () => {
        this.setState({
            loading: false,
            src: this.props.src,
            width: this.loadedImage.current.naturalWidth,
            height: this.loadedImage.current.naturalHeight,
            orientation: this.loadedImage.current.naturalWidth > this.loadedImage.current.naturalHeight
                ? 'landscape'
                : 'portrait'
        });
        if (this.props.onLoad) {
            this.props.onLoad(this.loadedImage.current);
        }
    };

    componentDidUpdate(prevProps){
        if (prevProps.src !== this.props.src){
            this.setState({loading: true});
        }
    };

    render() {
        const {className, src, alt, style} = this.props,
            {orientation, loading, placeholderSrc} = this.state;

        return (
            <Fragment>
                {loading &&
                    <img key={this.state.src} className={`${className}`} src={placeholderSrc} alt={alt}/>
                }
                <img className={`${className} ${orientation} ${loading ? 'd-none' : ''}`}
                     onLoad={this.onLoad}
                     ref={this.loadedImage}
                     src={src}
                     style={style}
                     alt={alt}/>
            </Fragment>
        );
    }
}

PlaceholderImage.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    onLoad: PropTypes.func
};

PlaceholderImage.defaultProps = {
    className: ''
};

export default PlaceholderImage;