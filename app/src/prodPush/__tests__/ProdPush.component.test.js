import React from 'react';
import {mount, shallow} from 'enzyme';
import {ProdPush} from "../ProdPush.component";

describe('ProdPush()', () => {
    let component;

    beforeEach(() => {
        component = mount(<ProdPush id="1" class="turds" prodDate={'2017-01-01'}/>);
    });

    it('sets the component up', () => {
        const divs = component.find("div");

        expect(divs.length).toBeGreaterThan(0);
    });

    it('sets classname from incoming props', () => {
        const div = component.find("div");

        expect(div.first().props().className).toEqual("turds");
        expect(div.first().props().id).toEqual("1");
    });

    it('sets daysSinceLastPush', () => {
        expect(component.state().daysSinceLastPush).toBeGreaterThan(100);
    })
});