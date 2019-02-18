import React from 'react';
import {storiesOf} from "@storybook/react";
import {withInfo} from "@storybook/addon-info";

import {Image} from "../../src/index";

export default storiesOf('Images', module)
    .addDecorator(withInfo)
    .add('Image', ()=>(
        <Image src={'https://picsum.photos/800/300'}/>
    ))
;
