import React from 'react';
import {mount, shallow} from 'enzyme';
import {Box} from "../Box.component";

describe('Box()', () => {
    fetch.mockResponse({});
    const component = mount(<Box id="1" class="turds" />);

    it('sets the component up', () => {
        fetch.mockResponse({});

        const divs = component.find("div");

        expect(divs.length).toBeGreaterThan(0);
    });

    it('sets classname from incoming props', () => {
        fetch.mockResponse({
            "stories_accepted": 5,
            "bugs_created": 0,
            "cycle_time": 8845000,
            "rejection_rate": 0
        });
        const div = component.find("div");

        expect(div.first().props().className).toEqual("turds");
        expect(div.first().props().id).toEqual("1");
    });

    describe('tracker pull', () => {
        it('displays content received from fetch', () => {
            fetch.mockResponse({
                "stories_accepted": 5,
                "bugs_created": 0,
                "cycle_time": 8845000,
                "rejection_rate": 0
            });

            const wrapper = mount(<Box id="1" class="turds" apiKey='1234' projectId='1' />);
            wrapper.instance().getMetrics()
                .then(() => {
                    expect(wrapper.find('.stories').first().innerText).toEqual(5);
                });
        });
    });
});