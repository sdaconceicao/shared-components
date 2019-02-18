import React from 'react';
import { IntlProvider } from 'react-intl';
import { setDefaults } from '@storybook/addon-info';
import { withOptions } from '@storybook/addon-options';
import { configure, addDecorator } from '@storybook/react';
import { themes } from '@storybook/components';

import * as enMessage from "../src/translations/en";

const loadStories = () => {
    require('./stories/index.js');
    require('./styles.scss');
};

const IntlDecorator = (storyFn) => (
    <IntlProvider locale="en" messages={enMessage.default}>
        { storyFn() }
    </IntlProvider>
);

setDefaults({
    header: false,
    inline: true
});

addDecorator(IntlDecorator);
addDecorator(
    withOptions({
        name: 'Stephen Andrew Designs',
        theme: themes.dark,
    })
);
configure(loadStories, module);

