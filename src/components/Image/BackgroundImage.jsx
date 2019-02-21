import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import * as placeholder from './placeholder.png';

export class BackgroundImage extends Component {

    state = {
        loading: true
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
        const {className, src, alt, style, children} = this.props,
            {orientation, loading} = this.state;
        console.log("SRC",loading, placeholder);
        return (
            <Fragment>
                <div className={`background-image ${orientation} ${loading ? 'placeholder' : ''} ${className}`}
                    style={{backgroundImage: `url(${loading ? placeholder : src})`}}>{children}</div>
                {loading && src &&
                    <img className={loading ? 'd-none' : ''}
                         onLoad={this.onLoad}
                         ref={this.loadedImage}
                         src={src}
                         style={style}
                         alt={alt}/>
                }
            </Fragment>
        );
    }
}

BackgroundImage.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    onLoad: PropTypes.func,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.bool])
};

BackgroundImage.defaultProps = {
    className: ''
};

export default BackgroundImage;