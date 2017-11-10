import React from 'react';
import {mount, shallow} from 'enzyme';
import App from "../App";

describe('App()', () => {
    describe('main app', () => {
        beforeEach(() => {
            fetch.mockResponse(JSON.stringify([]));
            fetch.resetMocks();
        });

        it('sets the component up', () => {
            const component = mount(<App currentEnv={{loader: 'http://test.com'}}/>);
            const divs = component.find("div");

            expect(divs.length).toBeGreaterThan(0);
        });

        it('displays an input box if not input selected for all', () => {
            const shallowRend = mount(<App currentEnv={{loader: 'http://test.com'}}/>);

            expect(shallowRend.find('InputBox').length).toBe(3);
            expect(shallowRend.find('InputBox').first().props().callback).not.toBe(undefined);
            expect(shallowRend.find('InputBox').first().props().position).not.toBe(undefined);
        });

        it('sets box level when callback is triggered', () => {
            const wrapper = mount(<App currentEnv={{loader: 'http://test.com'}}/>);
            wrapper.instance().setBoxState('topLeft', 'BoxFrame', {});
            wrapper.update();

            expect(wrapper.find('BoxFrame').length).toBe(1);
        });

        describe('has been set', () => {
            const component = shallow(<App currentEnv={{loader: 'http://test.com'}}/>);
            component.setState({topLeft: {type: 'BoxFrame'},
                bottomLeft: {type: 'BoxFrame'},
                bottomRight: {type: 'Box'}});

            it('builds boxes for third display', () => {
                const boxes = component.find("BoxFrame");
                const box = component.find("Box");

                expect(boxes.length).toBe(2);
                expect(box.length).toBe(1);
            });
        });
    });

    describe('magnification', () => {
        beforeEach(() => {
            fetch.mockResponse(JSON.stringify([{"finished_build": {"status": "failed"}}]));
            fetch.resetMocks();
        });
        
        it('displays one box if hasFocus', () => {
            const shallowRend = mount(<App currentEnv={{loader: 'http://test.com'}}/>);
            shallowRend.setState({hasFocus: {}});
            const boxes = shallowRend.find("BoxFrame");

            expect(boxes.length).toEqual(1);
        });

        it('sets state if failed is in finished_build of concourse pipeline', () => {

            const wrapper = mount(<App currentEnv={{loader: 'http://test.com'}}/>);
            return wrapper.instance().checkForError().then(() => {
                expect(wrapper.state().hasFocus).not.toBe(undefined);
            });
        });
    });
});