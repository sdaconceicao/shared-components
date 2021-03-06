import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import {FormattedMessage} from 'react-intl';

import Button from '../Form/Button';

import './Modal.scss';

/** Modal confirm component with promise response */
export class ModalConfirm extends Component {

    state = {modal: true};

    onConfirm = () =>{
        this.props.resolve(true);
        this.setState({modal: false});
    };

    onCancel = () =>{
        this.props.resolve(false);
        this.setState({modal: false});
    };

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
                    <ModalFooter className="modal-confirm-footer">
                        <Button className="modal-cancel" onClick={this.onCancel}>{cancelText}</Button>
                        <Button className="modal-confirm primary" onClick={this.onConfirm}>{confirmText}</Button>
                    </ModalFooter>
                </ModalBody>
            </Modal>
        );
    }
}

ModalConfirm.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: PropTypes.object.isRequired,
    cancelText: PropTypes.object,
    confirmText: PropTypes.object,
    resolve: PropTypes.func.isRequired
};

ModalConfirm.defaultProps = {
    cancelText: <FormattedMessage id="common.cancel"/>,
    confirmText: <FormattedMessage id="common.ok"/>
};

export default ModalConfirm;