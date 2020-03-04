import React from 'react';
import { shallow } from 'enzyme';
import NotFound from "./NotFound"

function setup() {
    return {
        component: shallow(<NotFound/>)
    }
}

describe('Tile Component', () => {
    it('should render correctly', () => {
        const {component} = setup();
        expect(component.find('h1').text()).toBe('404');
        expect(component.find('h3').text()).toBe('Page not found');
    });

    it('should test snapshot renders', () => {
        const {component} = setup();
        expect(component).toMatchSnapshot();
    });
})