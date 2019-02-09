import React from 'react';
import TestUtils from 'react-dom/test-utils';
import {mount} from 'enzyme';
import expect from 'expect';

import Input from './Input';

describe('Input', ()=> {

    function setup(props){
        return mount(
            <Input {...props}/>
        )
    }

    it('includes correct default values if not provided', () => {
        const wrapper = setup({value: 'value', name:"test", id:"test"});
        expect(wrapper.find('input').prop('tabIndex')).toEqual(1);
        expect(wrapper.find('input').prop('autoCapitalize')).toEqual('none');
        expect(wrapper.find('input').prop('type')).toEqual('text');
        expect(wrapper.find('input').prop('placeholder')).toEqual('');
    });

});
