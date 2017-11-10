import React from 'react';
import {mount, shallow} from 'enzyme';
import {InputBox} from "../InputBox.component";

describe('InputBox()', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(<InputBox position={'topLeft'}
                                      callback={mockCallback}/>);
    it('executes callback on button click', () => {
        wrapper.find('form').simulate('submit', {preventDefault: ()=>{}});

        expect(mockCallback.mock.calls.length).toBe(1);
    });

    it('shows url box when concourse selected', () => {
        wrapper.find('select').simulate('change', {target: {value: 'pipeline'}});

        expect(wrapper.find('#src-box').length).toEqual(1);
    });

    it('shows tracker key when tracker is selected', () => {
        wrapper.find('select').simulate('change', {target: {value: 'tracker'}});

        expect(wrapper.find('#api-box').length).toEqual(1);
    });

    it('disables submit button if box is not set', () => {
        expect(wrapper.find('input').last().props().disabled).toBe('true');
    });

    it('enables submit when correct selection', () => {
        wrapper.find('select').simulate('change', {target: {value: 'pipeline'}});
        wrapper.find('input').first().simulate('change', {target: {value: 'asdf'}});

        expect(wrapper.find('input').last().props().disabled).toBe('');
    });

    describe('handleSubmit()', () => {
        it('sends concourse boxframe', () => {
            wrapper.find('input').first().simulate('change', {target: {value: 'asdf'}});
            wrapper.find('form').first().simulate('submit', {preventDefault: ()=>{}});

            expect(mockCallback.mock.calls[0][0]).toEqual('topLeft');
            expect(mockCallback.mock.calls[0][1]).toEqual('BoxFrame');
            expect(mockCallback.mock.calls[0][2]).toEqual({
                "apiKey": "",
                "class": "box-element",
                "half": undefined,
                "id": "pipeline-1",
                "projectId": "",
                "src": ""});
        });
    });
});