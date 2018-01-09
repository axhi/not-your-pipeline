import React from 'react';
import {mount, shallow} from 'enzyme';
import {ProdPush} from "../../prodPush/ProdPush.component";

describe('Box()', () => {
    let prodPushComponent;
    const mockCallback = jest.fn();

    beforeEach(() => {
        prodPushComponent = mount(<ProdPush callback={mockCallback} number={1}/>);
    });

    it('sends reset to callback', () => {
        prodPushComponent.instance().reset();

        expect(mockCallback.mock.calls[0][0]).toBe(1);
        expect(mockCallback.mock.calls[0][1]).toBe(null);
    });
});