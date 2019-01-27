import React from 'react';
import TestUtils from 'react-dom/test-utils';
import {mount} from 'enzyme';
import expect from 'expect';

import Label from './Label';

describe('Labels', ()=> {

    function setup(props){
        return mount(
            <Label {...props}>{props.children}</Label>
        )
    }

    it('renders without required flag by default', () => {
        const wrapper = setup({children: 'label text'});
        expect(wrapper.find('.label-required').length).toEqual(0);
    });

    it('renders required if provided', () => {
        const wrapper = setup({children: 'label text', required: true});
        expect(wrapper.find('.label-required').length).toEqual(1);
    });
});
