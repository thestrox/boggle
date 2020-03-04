import Board from './Board';
import React from 'react';
import { shallow } from 'enzyme';
import Tile from '../Tile/Tile';

function setup() {
    const props = {
        board: [
            ["a", "b", "c", "d"],
            ["e", "f", "g", "h"],
            ["i", "j", "k", "l"],
            ["m", "n", "o", "p"]
        ],
        className: "test-class",
        onTileClick: jest.fn()
    };

    const component = shallow(<Board {...props}/>);
    return {
        props,
        component
    }
}

describe('Board Component', () => {
    it('should render correctly with given props', () => {
        const {component, props} = setup();

        component.find('div').forEach((node, index) => {
            if(index === 0) {
                expect(node.hasClass('board')).toBe(true);
                expect(node.hasClass(props.className)).toBe(true);
            } else {
                expect(node.hasClass('board-row')).toBe(true);
            }
        });
        
        let letters: string[] = [].concat(...props.board);
        component.find(Tile).forEach((node, index) => {
            expect(node.prop('letter')).toEqual(letters[index]);
        });
    });

    it('should call onTileClick', () => {
        const {component, props} = setup();
        component.find(Tile).forEach(node => {
            node.props().onClick();
        });
        expect(props.onTileClick.mock.calls.length).toBe(16); 
    });

    it('should test snapshot renders', () => {
        const {component} = setup();
        expect(component).toMatchSnapshot();
    });
})