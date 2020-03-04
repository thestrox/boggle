import React from 'react';
import { shallow } from 'enzyme';
import {Result} from "./Result"
import WordList from '../../components/WordList/WordList';
import { Button } from '@material-ui/core';

function setup() {
    const props = {
        wordScoreMap: {ONE: 3, TWO: 3},
        gameStartDate: 1234,
        resetBoard: jest.fn()
    };

    const component = shallow<Result>(<Result {...props}/>);
    return {
        props,
        component
    }
}

describe('Result Component', () => {
    it('should render correctly with given props', () => {
        spyOn(Date, "now").and.returnValue(1234);
        const {component, props} = setup();
        expect(component.find('div').at(0).hasClass('result-container')).toBe(true);
        expect(component.find('span').at(0).text()).toBe('Your Result');
        expect(component.find(WordList).prop('wordScoreMap')).toBe(props.wordScoreMap);
        expect(component.find('span').at(2).text()).toBe("6");
        expect(component.find('span').at(4).text()).toBe('00:00');
    });

    it('should call props resetBoard on Home button click and change state.toHome to true', () => {
        const {component, props} = setup();
        const instance = component.instance();
        expect(instance.state.toHome).toBeFalsy();
        expect(component.find(Button).simulate('click'));
        expect(props.resetBoard).toHaveBeenCalled(); 
        expect(instance.state.toHome).toBeTruthy();
    });

    it('should have the initial state.toHome to true when gameStartDate prop is null', () => {
        const props = {
            wordScoreMap: {ONE: 3, TWO: 3},
            gameStartDate: null,
            resetBoard: jest.fn()
        };
        const component = shallow<Result>(<Result {...props}/>);
        expect(component.instance().state.toHome).toBeTruthy();

    });

    it('should test snapshot renders', () => {
        spyOn(Date, "now").and.returnValue(1234);
        const {component} = setup();
        expect(component).toMatchSnapshot();
    });
})