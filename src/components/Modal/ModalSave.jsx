import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import {FormattedMessage} from 'react-intl';

import Button from '../Form/Button';

import './Modal.scss';

/** Modal confirm component with promise response */
export class ModalSave extends Component {
    constructor(props, context) {
        super(props, context);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {modal: true};
    }

     onSave(){
        this.props.resolve(this.props.params);
        this.setState({modal: false});
    }

    onCancel(){
        this.props.resolve(false);
        this.setState({modal: false});
    }

    render () {
        const {title, confirmText, cancelText, children} = this.props;
        return (
            <Modal autoFocus={false} isOpen={this.state.modal} className="modal-confirm-container" backdrop="static">
                <ModalBody>
                    {title &&
                    <ModalHeader>
                        {title}
                    </ModalHeader>
                    }
                    <div className="modal-content-body">
                        {children}
                    </div>
                    <ModalFooter>
                        <Button className="modal-save" onClick={this.onSave}>{confirmText}</Button>
                        <Button className="modal-cancel" onClick={this.onCancel}>{cancelText}</Button>
                    </ModalFooter>
                </ModalBody>
            </Modal>
        );
    }
}

ModalSave.propTypes = {
    title: PropTypes.string,
    children: PropTypes.object.isRequired,
    params: PropTypes.object,
    cancelText: PropTypes.object,
    confirmText: PropTypes.object
};

ModalSave.defaultProps = {
    cancelText: <FormattedMessage id="common.cancel"/>,
    confirmText: <FormattedMessage id="common.ok"/>
};

export default ModalSave;