import * as React from 'react';
import { useEffect } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import {
    ListItem, Icon
} from '@ui-kitten/components';

import {
    LineChart
} from "react-native-chart-kit";

import { Ticker } from 'models/Ticker';
import { ApiHistoryTicker } from 'services/coin-api/coin-api';

interface IChartProps {
    historyTickers: ApiHistoryTicker[];
}

const Chart: React.FC<IChartProps> = ({historyTickers}) => {

    useEffect(() => {
        console.log(historyTickers);
    }, [historyTickers]);

    return (
        <View style={{height: 50, width: 100, backgroundColor: "#FF0"}}>
            {
                historyTickers instanceof Array && historyTickers.map(ticker => {
                    <Text>#{ticker.price}#</Text>
                })
            }
        </View>
    );
};

interface ICoinDetailsProps {
    item: Ticker;
    index: number;
}

export const CoinDetails: React.FC<ICoinDetailsProps> = ({item, index}) => {

    useEffect(() => {}, [item]);

    return (
        <ListItem>
            <View style={styles.row}>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <View style={{width: 36, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Icon name="globe" width={16} height={16} />
                        <Text>{index}</Text>
                    </View>
                    <View style={{width: 80, display: 'flex', flexDirection: 'column'}}>
                        <Text>{item.symbol}</Text>
                        <Text>{ellipsis(item.name)}</Text>
                    </View>
                </View>
                <View style={styles.cell}>
                    <Chart historyTickers={item.historyTickers} />
                </View>
                <View style={styles.cell}>
                    <Text>$ {usdFormat(item.price)}</Text>
                </View>
            </View>
        </ListItem>
    );
};

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

function usdFormat(price: string): string {
    const currentPrice = parseFloat(price);
    if (currentPrice < 0.001)
        return 0.001.toFixed(3);
    return parseFloat(price).toFixed(2);
}

function ellipsis(text: string) {
    if (text && text.length > 10)
        return text.split('').slice(0, text.length - 3).join('') + '...';
    return text || '';
}
