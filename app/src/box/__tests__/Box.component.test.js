import React from 'react';
import {mount, shallow} from 'enzyme';
import {Box} from "../Box.component";

describe('Box()', () => {
    let component;

    beforeEach(() => {
        fetch.mockResponse(JSON.stringify({}));
        component = mount(<Box id="1" class="turds"/>);
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

    describe('tracker pull', () => {
        let wrapper;
        beforeEach(() => {
            fetch.mockResponse(JSON.stringify({
                "stories_accepted": 5,
                "bugs_created": 0,
                "cycle_time": 8845000,
                "rejection_rate": 0,
                "start": "2017-11-06T08:00:00Z",
                "finish": "2017-11-07T08:00:00Z",
            }));
            wrapper = mount(<Box id="1" class="turds" apiKey='1234' projectId='1'/>);
        });

        it('formats cycle time', () => {
            return wrapper.instance().getMetrics()
                .then(() => {
                    expect(wrapper.state().cycleTime).toEqual("2 hours");
                });
        });

        it('formats start finish objects', () => {
            return wrapper.instance().getMetrics()
                .then(() => {
                    expect(wrapper.state().start).toEqual("11/6/2017");
                    expect(wrapper.state().finish).toEqual("11/7/2017");
                });
        });
    });
});