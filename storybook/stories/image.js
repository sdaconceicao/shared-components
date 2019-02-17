import React from 'react';
import {storiesOf} from "@storybook/react";

import {Image} from "../../src/index";

export default storiesOf('Images', module)
    .add('Image', ()=>(
        <Image src={'https://picsum.photos/800/300'}/>
    ))
;
