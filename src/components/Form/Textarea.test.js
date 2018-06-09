import React from 'react';
import TestUtils from 'react-dom/test-utils';
import {mount} from 'enzyme';
import expect from 'expect';

import Textarea from './Textarea';

describe('Textarea', ()=> {

    function setup(props){
        return mount(
            <Textarea {...props}/>
        )
    }

    it('includes correct default values if not provided', () => {
        const wrapper = setup({value: 'value', name:"test", id:"test"});
        expect(wrapper.find('textarea').prop('tabIndex')).toEqual(1);
        expect(wrapper.find('textarea').prop('placeholder')).toEqual('');
    });

});
