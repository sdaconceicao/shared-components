
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import {mount} from 'enzyme';
import expect from 'expect';

import SliderDropdown from './SliderDropdown';

describe('SliderDropdown', ()=> {

    function setup(props){
        return mount(
            <SliderDropdown{...props}/>
        )
    }

    it('defaults to enabled', () => {
        const wrapper = setup({ name:"test", id:"test"});
        expect(wrapper.find('.rc-slider-handle').at(1).prop('aria-disabled')).toEqual(false);
    });

    it('accepts disabled prop', () => {
        const wrapper = setup({ name:"test", id:"test", disabled:true});
        expect(wrapper.find('.rc-slider-handle').at(1).prop('aria-disabled')).toEqual(true);
    });

    it('displays value when value given', () => {
        const wrapper = setup({ name:"test", id:"test", value: 45});
        expect(wrapper.find('.slider-dropdown__input').at(1).prop('value')).toEqual('45');
    });

    it('displays ? when no value given', () => {
        const wrapper = setup({ name:"test", id:"test"});
        expect(wrapper.find('.slider-dropdown__input').at(1).prop('value')).toEqual('?');
    });

    xit('closes the dropdown when clicking the button', ()=>{ //Disabled for now because jsdom can't handle popper.js computedStyle
        const wrapper = setup({ name:"test", id:"test"});
        wrapper.find('.dropdown-toggle').at(1).simulate('click', { preventDefault() {} });
        wrapper.find('.dropdown-toggle').at(1).simulate('click', { preventDefault() {} });
        expect(wrapper.find('.dropdown-menu').length).toEqual(0);
    });

});
