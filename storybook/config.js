import React from 'react';
import { IntlProvider } from 'react-intl';
import { setDefaults } from '@storybook/addon-info';
import { configure, addDecorator } from '@storybook/react';
import * as enMessage from "../src/translations/en";

const loadStories = () => {
    require('./stories/index.js')
};

const IntlDecorator = (storyFn) => (
    <IntlProvider locale="en" messages={enMessage}>
        { storyFn() }
    </IntlProvider>
);

setDefaults({
    header: false,
    inline: true
});

addDecorator(IntlDecorator);
configure(loadStories, module);