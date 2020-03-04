import WordList from "./WordList";
import React from 'react';
import { shallow } from 'enzyme';
import { List, ListItem } from "@material-ui/core";

function setup() {
    const props = {
        wordScoreMap: {abc: 3},
        className: 'test-class'
    };

    const component = shallow(<WordList {...props}/>);
    return {
        props,
        component
    };
}

describe('WordList Component', () => {
    it('should render correctly with given props', () => {
        const {component, props} = setup();
        const listNode = component.find(List);
        expect(listNode.hasClass('wordlist')).toBe(true);
        expect(listNode.hasClass(props.className)).toBe(true);
        
        expect(component.find(ListItem).hasClass('wordlist-item')).toBe(true);

        const spanNodes = component.find('span');
        expect(spanNodes.at(0).text()).toBe(Object.keys(props.wordScoreMap)[0] + ':');
        expect(spanNodes.at(1).text()).toBe(props.wordScoreMap.abc.toString());

    });

    it('should test snapshot renders', () => {
        const {component} = setup();
        expect(component).toMatchSnapshot();
    });
})
