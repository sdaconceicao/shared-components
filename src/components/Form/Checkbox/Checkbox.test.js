import React from 'react';
import TestUtils from 'react-dom/test-utils';
import {mount} from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';

import Checkbox from './Checkbox';

describe('Checkbox', ()=> {

    function setup(props){
        return mount(
            <Checkbox {...props}/>
        )
    }

    it('includes correct default values if not provided', () => {
        const wrapper = setup({name:"test", id:"test"});
        expect(wrapper.find('input').prop('tabIndex')).toEqual(1);
        expect(wrapper.find('input').prop('disabled')).toEqual(false);
    });

    it('returns a change object on change', () =>{
        const onChange = sinon.spy();
        const wrapper = setup({name:"test", id:"test", onChange:onChange, label:'test label'}),
            input = wrapper.find('input');
        input.simulate('change', { target: { checked: true } });
        expect(onChange.called).toEqual(true);
    });

});
