import React from 'react';
import {mount, shallow} from 'enzyme';
import App from "../App";

describe('App()', () => {
    const component = mount(<App/>);

    it('sets the component up', () => {
        const divs = component.find("div");

        expect(divs.length).toBeGreaterThan(0);
    });

    it('builds boxes for third display', () => {
        const boxes = component.find("BoxFrame");
        const box = component.find("Box");

        expect(boxes.length).toBe(2);
        expect(box.length).toBe(1);
    });

    it('passes id and src to box type', () => {
        const pipeline1 = component.find("BoxFrame");

        expect(pipeline1.first().props().src).not.toBeNull();
        expect(pipeline1.first().props().id).not.toBeNull();
    });

    it('builds for third displays by passing half true', () => {
        const pipeline2 = component.find("BoxFrame");
        const tracker = component.find("Box");

        expect(pipeline2.last().props().class).toContain('quarter');
        expect(tracker.first().props().class).toContain('quarter');
    });

    it('passes id to non framed boxes', () => {
        const nonBox = component.find("Box");

        expect(nonBox.first().props().id).not.toBe(undefined);
        expect(nonBox.first().props().src).toBe(undefined);
    });

    describe('magnifcation', () => {
        const shallowRend = shallow(<App/>);

        it('displays one box if hasFocus', () => {
            shallowRend.setState({hasFocus: {}});
            const boxes = shallowRend.find("BoxFrame");

            expect(boxes.length).toEqual(1);
        });
    });
});