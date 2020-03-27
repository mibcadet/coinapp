import * as React from 'react';
import renderer from 'react-test-renderer';

import { light as lightTheme, mapping } from '@eva-design/eva';
import { ApplicationProvider, List, ListItem, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { CoinsList } from '../coins-list.component';
import { CoinDetails } from '../coin-details.component';

function app(component) {
    return (
        <>
            <IconRegistry icons={EvaIconsPack}/>
            <ApplicationProvider mapping={mapping} theme={lightTheme}>
                {component}
            </ApplicationProvider>
        </>
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
        const testRenderer = renderer.create(app(<CoinDetails item={coinDetails} index={0} />));
        expect(testRenderer.root.findByType(ListItem)).toBeTruthy();
    });
});

const coinDetails = {
    id: 'btc-bitcoin',
    price: '6779',
    name: 'Bitcoin',
    symbol: 'BTC',
    marketCap: 123123123123,
    historyTickers: [],
}
