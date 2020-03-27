import * as React from 'react';
import { useEffect, useState } from 'react';

import {
    List, Spinner, Text, Toggle, Select,
} from '@ui-kitten/components';

import { useLatestTickers } from '../../services/coin-api';
import { CoinDetails } from './coin-details.component';
import { View, InteractionManager } from 'react-native';

export const CoinsList: React.FC = () => {

    const [sortingMode, setSorting] = useState<boolean>(false);
    const [sortingDirection, setSortingDirection] = useState(false);
    const [lastIndex, setLastIndex] = useState<number>(30);
    const [coins, loading] = useLatestTickers(lastIndex, sortingMode, sortingDirection);

    const toggleSorting = (isChecked: boolean) => {
        InteractionManager.runAfterInteractions(() => {
            setSorting(isChecked);
        });
    }
    const toggleSortingDirection = (isChecked: boolean) => {
        InteractionManager.runAfterInteractions(() => {
            setSortingDirection(isChecked);
        });
    };

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            {(() => {console.log(coins); return true})() && <Text>Coins</Text>}
            <View style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Text>Sort:</Text>
                <Toggle checked={sortingMode} onChange={toggleSorting} />
                <Text>{sortingDirection ? 'Desc' : 'Asc'}</Text>
                <Toggle checked={sortingDirection} onChange={toggleSortingDirection} disabled={!sortingMode}/>
            </View>
            <List data={coins}
                renderItem={({item}) => <CoinDetails item={item} index={item.id} />}
                refreshing={loading}
                onEndReached={() => {
                    setLastIndex(lastIndex => lastIndex + 30);
                }}
                onEndReachedThreshold={30}
                style={{flex: 1}} />
            { loading &&
              <View style={{padding: 24}}>
                <Spinner size="giant" />
              </View>
            }
        </View>
    );
};
