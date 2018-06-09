import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Dropdown as DropdownWrapper } from 'reactstrap';

export class Dropdown extends Component{

    constructor(props){
        super(props);
        this.state = {open: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState({open: !this.state.open});
    }

    render(){
        const {className, children} = this.props;
        return (
            <DropdownWrapper isOpen={this.state.open} toggle={this.toggle} className={className}>
                {children}
            </DropdownWrapper>
        )
    }
}

Dropdown.propTypes = {
    className: PropTypes.string,
    children: PropTypes.object
};

Dropdown.defaultProps = {
    className: ''
};

export default Dropdown;