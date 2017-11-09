import React from 'react';
import {mount, shallow} from 'enzyme';
import {Box} from "../Box.component";

describe('Box()', () => {
    const component = mount(<Box id="1" class="turds" />);

    it('sets the component up', () => {
        const divs = component.find("div");

        expect(divs.length).toBeGreaterThan(0);
    });

    it('sets classname from incoming props', () => {
        const div = component.find("div");

        expect(div.first().props().className).toEqual("turds");
        expect(div.first().props().id).toEqual("1");
    });
});