import React from 'react';
import { shallow } from 'enzyme';
import App from "./App"
import { Route } from 'react-router-dom';
import Result from "../Result/Result";
import NotFound from "../NotFound/NotFound";
import Home from "../Home/Home";

function setup() {
    return {
        component: shallow(<App/>)
    }
}

describe('App Component', () => {
    it('should render correctly', () => {
        const {component} = setup();
        expect(component.find('div').hasClass('root-container')).toBe(true);
        let routeNode = component.find(Route);
        expect(routeNode.at(0).prop('path')).toBe('/result');
        expect(routeNode.at(1).prop('path')).toBe('/');
    });

    it('should test snapshot renders', () => {
        const {component} = setup();
        expect(component).toMatchSnapshot();
    });
})