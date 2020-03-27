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

    useEffect(() => {}, []);

    return (
        <View style={{flex: 1}}>
            <Text>Coins</Text>
            {
                loading ? <Spinner /> :
                <List data={coins}
                    renderItem={CoinDetails}
                    onEndReached={() => {
                        setLastIndex(lastIndex => lastIndex + 30);
                    }}
                    onEndReachedThreshold={10}
                    style={{flex: 1, borderWidth: 2, borderColor: "#f00"}} />
            }
        </View>
    );
};
