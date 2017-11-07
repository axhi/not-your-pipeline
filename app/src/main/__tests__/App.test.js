import React from 'react';
import {shallow} from 'enzyme';
import App from "../App";

describe('App()', () => {
    const component = shallow(<App/>);

    it('sets the component up', () => {
        const divs = component.find("div");

        expect(divs.length).toBeGreaterThan(0);
    });

    it('builds two divs side by each', () => {
        const eachDivs = component.find(".box-element");

        expect(eachDivs.length).toBe(2);
    });

    it('builds iframes inside of each existing div', () => {
        const iframes = component.find("Iframe");

        expect(iframes.length).toBe(2);
    });

    it('hardcodes pipeline endpoints', () => {
        const iframes = component.find("Iframe");

        expect(iframes.first().props().url).toContain("not-your-pipeline")
        expect(iframes.last().props().url).toContain("not-your-pipeline")
    });
});