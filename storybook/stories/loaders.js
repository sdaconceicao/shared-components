import React from 'react';
import {storiesOf} from "@storybook/react";
import {withInfo} from "@storybook/addon-info";
import { withKnobs, select} from '@storybook/addon-knobs';

import {Spinner} from "../../src/index";

const options = {
    XS: 'xs',
    SM: 'xs',
    MD: 'md',
    LG: 'lg',
    XL: 'xl'
};

export default storiesOf('Loader', module)
    .addDecorator(withInfo)
    .addDecorator(withKnobs)
    .add('Spinner', ()=>(
        <Spinner size={select('Size', options, 'md')}/>
    ))
;
