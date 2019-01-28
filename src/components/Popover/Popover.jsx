import React, {Component} from 'react';
import { Popover as PopoverWrapper, PopoverHeader, PopoverBody } from 'reactstrap';
import PropTypes from "prop-types";

export default class Popover extends Component {

    state = {
        open: false
    };

    toggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    render() {
        const {title, children, target, position, className} = this.props,
            {open} = this.state;
        return (
            <PopoverWrapper className={className} placement={position} isOpen={open} target={target} toggle={this.toggle} trigger="legacy">
                {title && <PopoverHeader>{title}</PopoverHeader>}
                <PopoverBody>{children}</PopoverBody>
            </PopoverWrapper>
        );
    }
}

Popover.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: PropTypes.object.isRequired,
    target: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    className: PropTypes.string
};

Popover.defaultProps = {
    className: '',
    position: 'auto'
};