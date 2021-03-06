import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';

import PlaceholderImage from './PlaceholderImage';

export class Image extends PureComponent {

    state = {
        loading: this.props.src ? true : false
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
        const {className, src, alt, style, placeholder} = this.props,
            {orientation, loading} = this.state;

        return (
            <Fragment>
                {(loading || !src)  && <PlaceholderImage alt={alt} src={placeholder} className={className}/>}
                <img className={`${className} ${orientation} ${loading || !src ? 'd-none' : ''}`}
                     onLoad={this.onLoad}
                     ref={this.loadedImage}
                     src={src}
                     style={style}
                     alt={alt}/>
            </Fragment>
        );
    }
}

Image.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    onLoad: PropTypes.func,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

Image.defaultProps = {
    className: '',
};

export default Image;