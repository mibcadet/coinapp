import * as React from 'react';
import { useState, useEffect } from 'react';

import { Dimensions, View } from 'react-native';
import {
    List,
    ListItem
} from '@ui-kitten/components';

import { useCoins } from '../../services/coin-api';
import { CoinDetails } from './coin-details.component';

const SCREEN_DIMENSIONS = Dimensions.get('screen');
const SCREEN_WIDTH = SCREEN_DIMENSIONS.width;
const SCREEN_HEIGHT = SCREEN_DIMENSIONS.height;

export const CoinsList = () => {

    const [coins, loading] = useCoins();

    return (
        <List data={coins}
              renderItem={CoinDetails}
              style={{flex: 1, borderWidth: 2, borderColor: "#f00"}} />
    );
};
