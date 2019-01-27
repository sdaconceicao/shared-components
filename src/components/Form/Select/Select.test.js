import React from 'react';
import TestUtils from 'react-dom/test-utils';
import {mount} from 'enzyme';
import expect from 'expect';

import Select from './Select';

describe('Select', ()=> {

    function setup(props){
        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
        ];

        return mount(
            <Select {...props} options={options}/>
        )
    }

    it('includes correct default values if not provided', () => {
        const wrapper = setup({id: 'test', name: 'thing', value: 'vanilla'});
        expect(wrapper.prop('tabIndex')).toEqual(1);
    });


});
