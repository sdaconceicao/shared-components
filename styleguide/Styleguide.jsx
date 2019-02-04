import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import * as enMessage from '../src/translations/en.json';
import 'bootstrap/scss/bootstrap.scss';
import '../src/styles/themes/default/index.scss';

import Form from './Form';



ReactDOM.render(
    <IntlProvider locale="en"  messages={enMessage}>
        <Form/>
    </IntlProvider>
    , document.getElementById('root'));