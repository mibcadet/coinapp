import * as React from 'react';
import { useEffect, useState } from 'react';

import {
    List, Spinner, Text,
} from '@ui-kitten/components';

import { useLatestTickers } from '../../services/coin-api';
import { CoinDetails } from './coin-details.component';
import { View } from 'react-native';

export const CoinsList: React.FC = () => {

    const [lastIndex, setLastIndex] = useState<number>(30);
    const [coins, loading] = useLatestTickers(lastIndex);

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <Text>Coins</Text>
            <List data={coins}
                renderItem={CoinDetails}
                onEndReached={() => {
                    setLastIndex(lastIndex => lastIndex + 30);
                }}
                onEndReachedThreshold={30}
                style={{flex: 1, borderWidth: 2, borderColor: "#f00"}} />
            { loading && <Spinner size="giant" />}
        </View>
    );
};
