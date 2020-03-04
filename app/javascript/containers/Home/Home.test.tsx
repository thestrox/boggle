import React from 'react';
import { shallow } from 'enzyme';
import {Home} from "./Home"
import Board from '../../components/Board/Board';
import WordList from '../../components/WordList/WordList';
import Countdown from 'react-countdown';
import { Input, Button } from '@material-ui/core';

function setup() {
    const props = {
        board: [
            ["A", "B", "C", "D"],
            ["E", "F", "G", "H"],
            ["I", "J", "K", "L"],
            ["M", "N", "O", "P"]
        ],
        wordScoreMap: {ONE: 3},
        duration: 1000,
        gameStartDate: 1234,
        initializeNewBoard: jest.fn(),
        validateWord: jest.fn(),
        resetBoard: jest.fn()
    };

    const component = shallow<Home>(<Home {...props}/>);
    return {
        props,
        component
    }
}

describe('Home Component', () => {
    it('should render correctly with given props', () => {
        const {component, props} = setup();
        expect(component.find(Board).prop('board')).toBe(props.board);
        expect(component.find(Countdown)).toBeTruthy();
        expect(component.find(Countdown).prop('date')).toBe(2234);
        expect(component.find(WordList).prop('wordScoreMap')).toBe(props.wordScoreMap);
    });

    it('onChange: should update the state.currentWord', () => {
        const {component} = setup();
        const instance = component.instance();
        expect(instance.state.currentWord).toBe('');
        const value = 'NEWWORD';
        const mockedEvent = {target: {value}}
        component.find(Input).simulate('change', mockedEvent);
        expect(instance.state.currentWord).toBe(value);
    
    });

    it('onKeyPress: should call validateWord on "Enter"', () => {
        const {component, props} = setup();
        const instance = component.instance();
        instance.updateCurrentWord('tone');
        component.find(Input).simulate('keypress', {key: 'Enter'});
        expect(props.validateWord).toHaveBeenCalled();
    });

    it('onTileClick: should update the state.currentWord', () => {
        const {component, props} = setup();
        const instance = component.instance();
        expect(instance.state.currentWord).toBe('');
        component.find(Board).props().onTileClick(0,0);
        expect(instance.state.currentWord).toBe(props.board[0][0].toUpperCase());

    })

    it('onSubmitClick: should call props validateWord', () => {
        const {component, props} = setup();
        const instance = component.instance();
        instance.updateCurrentWord('tone');
        component.find(Button).at(0).simulate('click');
        expect(props.validateWord).toHaveBeenCalled();
    })

    it('onSubmitClick: should not call props validateWord', () => {
        const {component, props} = setup();
        const instance = component.instance();
        instance.updateCurrentWord('one');
        component.find(Button).at(0).simulate('click');
        expect(props.validateWord).toHaveBeenCalledTimes(0);
    })

    it('onEndGameClick: should call change state.toResult to true', () => {
        const {component} = setup();
        const instance = component.instance();
        expect(instance.state.toResult).toBe(false);
        component.find(Button).at(1).simulate('click');
        expect(instance.state.toResult).toBe(true);
    })

    it('should call change state.toResult to true on Countdown complete', () => {
        const {component} = setup();
        const instance = component.instance();
        expect(instance.state.toResult).toBe(false);
        component.find(Countdown).props().onComplete(null);
        expect(instance.state.toResult).toBe(true);
    })

    it('onResetClick: should call resetBoard', () => {
        const {component, props} = setup();
        component.find(Button).at(2).simulate('click');
        expect(props.resetBoard).toHaveBeenCalled();
    })

    it('onNewGameClick: should call initializeNewBoard', () => {
        const {component, props} = setup();
        component.find(Button).at(3).simulate('click');
        expect(props.initializeNewBoard).toHaveBeenCalled();
    })

    it('should test snapshot renders', () => {
        const {component} = setup();
        expect(component).toMatchSnapshot();
    });
})