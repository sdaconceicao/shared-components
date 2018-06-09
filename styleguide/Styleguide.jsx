import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import * as enMessage from '../src/translations/en.json';

import Form from './Form';

import 'bootstrap/scss/bootstrap.scss';

ReactDOM.render(
    <IntlProvider locale="en"  messages={enMessage}>
        <Form/>
    </IntlProvider>
    , document.getElementById('root'));