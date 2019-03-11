import React from 'react';
import {storiesOf} from "@storybook/react";
import {withInfo} from "@storybook/addon-info";
import { withKnobs} from '@storybook/addon-knobs';

import {Alert} from "../../src/index";

export const messageStories = storiesOf('Messages', module);
const alertStories = storiesOf('Messages/Alerts');

messageStories
    .addDecorator(withInfo)
    .addDecorator(withKnobs)
;

alertStories.add('Error', ()=>(
        <Alert type="error">
            Error Message
        </Alert>
    ))
    .add('Warning', ()=>(
        <Alert type="warning">
            Warning Message
        </Alert>
    ))
    .add('Success', ()=>(
        <Alert type="success">
            Success Message
        </Alert>
    ))
    .add('Info', ()=>(
        <Alert type="info">
            Info Message
        </Alert>
    ))
    .add('Branded', ()=>(
        <Alert type="branded">
            Branded Message
        </Alert>
    ));