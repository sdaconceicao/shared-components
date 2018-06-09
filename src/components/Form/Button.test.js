
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import {mount} from 'enzyme';
import expect from 'expect';

import Button from './Button';

describe('Button', ()=> {

    function setup(props){
        return mount(
            <Button {...props}>{props.children}</Button>
        )
    }

    it('includes correct default values if not provided', () => {
        const wrapper = setup({value: 'value', name:"test", id:"test", onClick:()=>{}});
        expect(wrapper.find('button').prop('type')).toEqual("button");
        expect(wrapper.find('button').prop('disabled')).toEqual(false);
        expect(wrapper.find('button').hasClass('btn')).toEqual(true);
    });
});
