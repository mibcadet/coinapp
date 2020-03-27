import * as React from 'react';
import { Dimensions, View } from 'react-native';

import {
    List, Spinner, Text,
} from '@ui-kitten/components';

import { useCoins } from '../../services/coin-api';
import { CoinDetails } from './coin-details.component';
import { useEffect } from 'react';

const SCREEN_DIMENSIONS = Dimensions.get('screen');
const SCREEN_WIDTH = SCREEN_DIMENSIONS.width;
const SCREEN_HEIGHT = SCREEN_DIMENSIONS.height;

export const CoinsList = () => {

    const [coins, loading] = useCoins();

    return (
        <View style={{flex: 1}}>
            <Text>Coins</Text>
            {
            loading ? <Spinner /> :
            <List data={coins}
                renderItem={CoinDetails}
                style={{flex: 1, borderWidth: 2, borderColor: "#f00"}} />
            }
        </View>
    );
};
