import React from 'react';
import TestUtils from 'react-dom/test-utils';
import {mount} from 'enzyme';
import expect from 'expect';

import Slider from './Slider';

describe('Slider', ()=> {

    function setup(props){
        return mount(
            <Slider {...props}/>
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

});
