import React from 'react';
import TestUtils from 'react-dom/test-utils';
import {shallow} from 'enzyme';
import expect from 'expect';

import ColorPicker from './ColorPicker';

describe('ColorPicker', ()=> {

    function setup(props){
        return shallow(
            <ColorPicker {...props}/>
        )
    }

    it('defaults to white if no initial color provided', () => {
        const wrapper = setup({ name:"test", id:"test"});
        expect(wrapper.find('.color-dropdown__indicator').prop('style')).toEqual({backgroundColor: '#ffffff'});
    });

    it('mounts in a closed state', () => {
        const wrapper = setup({ name:"test", id:"test"});
        expect(wrapper.find('.dropdown-menu').length).toEqual(0);
    });


});
