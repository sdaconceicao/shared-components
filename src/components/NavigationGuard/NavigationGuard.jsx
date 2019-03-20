import React, {Component, Fragment} from 'react';
import {Prompt} from 'react-router-dom';
import PropTypes from 'prop-types';

import {ModalConfirm} from '../Modal';

export class NavigationGuard extends Component {

    state = {
        show: false,
        lastLocation: null,
        confirmed: false,
    };

    showModal = (location) => this.setState({
        show: true,
        lastLocation: location,
    });

    closeModal = (callback) => this.setState({
        show: false
    }, callback);

    handleBlockedNavigation = (nextLocation) => {
        const {confirmed} = this.state,
            {when} = this.props;

        if (!confirmed && when){
            this.showModal(nextLocation);
            return false
        }

        return true
    };

    handleConfirmNavigation = (response) => this.closeModal(() => {
        const {history} = this.props,
            {lastLocation} = this.state;
        if(response && lastLocation){
            this.setState({confirmed: true}, () => {
                history.push(lastLocation.pathname)
            });
        }
    });

    render() {
        const {when, message} = this.props,
            {show} = this.state;
        return (
            <Fragment>
                <Prompt
                    when={when}
                    message={this.handleBlockedNavigation}/>
                {show &&
                    <ModalConfirm title={message}
                                  resolve={this.handleConfirmNavigation}/>
                }
            </Fragment>
        )
    }
}

NavigationGuard.propTypes = {
    when: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired
};

export default NavigationGuard;