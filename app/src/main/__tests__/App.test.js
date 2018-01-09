import React from 'react';
import {mount, shallow} from 'enzyme';
import App from "../App";

describe('App()', () => {
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem.mockReset();
    });

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
            wrapper.instance().setBoxState(0, 'BoxFrame', {});
            wrapper.update();

            expect(wrapper.find('BoxFrame').length).toBe(1);
        });

        describe('has been set', () => {
            const component = shallow(<App currentEnv={{loader: 'http://test.com'}}/>);
            component.setState({
                0: {type: 'BoxFrame', data: {}},
                1: {type: 'BoxFrame', data: {}},
                2: {type: 'TrackerMetrics', data: {}}
            });

            it('builds boxes for third display', () => {
                const boxes = component.find("BoxFrame");
                const box = component.find("TrackerMetrics");

                expect(boxes.length).toBe(2);
                expect(box.length).toBe(1);
            });
        });

        describe('has been reset', () => {
            it('resets function', () => {
                const component = shallow(<App currentEnv={{loader: 'http://test.com'}}/>);

                component.setState({0: {type: 'BoxFrame', data: {}}, hasFocus: {src: 'as', id: 0}});
                component.instance().setBoxState(0, null, null);

                expect(component.state()["0"]).toBe(null);
                expect(component.state()["hasFocus"]).toBe(null);
            });
        });

        describe('settings cached', () => {
            let component;
            beforeEach(() => {
                component = shallow(<App currentEnv={{loader: 'http://test.com'}}/>);
            });

            it('sets state if in cache', () => {
                expect(component.state()).toEqual({"0": null, "1": null, "2": null, "hasFocus": null});
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
            shallowRend.setState({
                hasFocus: {src: 'http://test.com', id: 0},
                0: {type: 'BoxFrame', data: {}}
            });

            const boxes = shallowRend.find("BoxFrame");

            expect(boxes.length).toEqual(1);
        });

        it('sets state if failed is in finished_build of concourse pipeline', () => {
            const wrapper = mount(<App currentEnv={{loader: 'http://test.com'}}/>);

            return wrapper.instance().fetchPipelineErrors().then(() => {
                expect(wrapper.state().hasFocus).not.toBe(undefined);
            });
        });

        it('magnifies non frame boxes', () => {
            const wrapper = mount(<App currentEnv={{loader: 'http://test.com'}}/>);
            wrapper.setState({
                1: {
                    type: 'ProdPush', data: {
                        id: 'prodPush-1',
                        class: 'box-element',
                        prodDate: '2017-01-01'
                    }
                }
            });

            const val = wrapper.instance().fetchProdPushErrors();
            expect(val).toEqual({id: 1});
        });
    });
});