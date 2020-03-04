import React from 'react';
import { shallow } from 'enzyme';
import Tile from "./Tile"

function setup() {
    const props = {
        letter: "A",
        onClick: jest.fn()
    };

    const component = shallow(<Tile {...props}/>);
    return {
        props,
        component
    }
}

describe('Tile Component', () => {
    it('should render correctly with given props', () => {
        const {component, props} = setup();
        expect(component.find('div').hasClass('tile-container')).toBe(true);
        let spanNode = component.find('span');
        expect(spanNode.hasClass('letter-span')).toBe(true);
        expect(spanNode.text()).toBe(props.letter);
    });

    it('should call onClick', () => {
        const {component, props} = setup();
        expect(component.find('div').simulate('click'));
        expect(props.onClick).toHaveBeenCalled(); 
    });

    it('should test snapshot renders', () => {
        const {component} = setup();
        expect(component).toMatchSnapshot();
    });
})