import * as React from 'react';
import renderer from 'react-test-renderer';

import { light as lightTheme, mapping } from '@eva-design/eva';
import { ApplicationProvider, List, ListItem } from '@ui-kitten/components';

import { CoinsList } from '../coins-list.component';
import { CoinDetails } from '../coin-details.component';

function app(component) {
    return (
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
            {component}
        </ApplicationProvider>
    );
}

describe('<CoinsList />', () => {
    it('renders properly', () => {
        const testRenderer = renderer.create(app(<CoinsList />));
        expect(testRenderer.root).toBeTruthy();
    });

    it('contains List', () => {
        const testRenderer = renderer.create(app(<CoinsList />));
        expect(testRenderer.root.findByType(List)).toBeTruthy();
    });

    it('renders coin details properly', () => {
        const testRenderer = renderer.create(app(<CoinDetails item={{name: 'testTitleOfItem'}} />));
        expect(testRenderer.root.findByType(ListItem)).toBeTruthy();
    });
});
