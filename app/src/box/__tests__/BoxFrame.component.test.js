import React from 'react';
import {mount, shallow} from 'enzyme';
import {BoxFrame} from "../BoxFrame.component";

describe('BoxFrame()', () => {
    const component = mount(<BoxFrame src="dogs.com" id="1" class="turds" />);

    it('sets the component up', () => {
        const divs = component.find("div");

        expect(divs.length).toBeGreaterThan(0);
    });

    it('builds iframe object from passed props', () => {
        const frame = component.find("iframe");

        expect(frame.first().props().src).toEqual("dogs.com");
        expect(frame.first().props().title).toEqual("1");
    });

    it('sets classname from incoming props', () => {
        const div = component.find("div");

        expect(div.first().props().className).toEqual("turds");
        expect(div.first().props().id).toEqual("1");
    });
});