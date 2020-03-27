import * as React from 'react';
import { useEffect } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import {
    ListItem, Spinner, Icon
} from '@ui-kitten/components';

import {
    LineChart
} from "react-native-chart-kit";

import { useHistoryTickers } from '../../services/coin-api';
import { Ticker } from 'models/Ticker';

interface IChartProps {
    coinId: string;
}

const Chart: React.FC<IChartProps> = ({coinId}) => {

    const [data, loading, hasErrors] = useHistoryTickers(coinId);

    return (
        <View style={{height: 50, width: 100, backgroundColor: "#FF0"}}>
            {
                !loading && !hasErrors && data instanceof Array && data.map(ticker => {
                    <Text>#{ticker.price}#</Text>
                })
            }
            {
                loading ? <Spinner /> : <Text style={{position: 'absolute', width: 80, height: 30}}>some chart</Text>
            }
        </View>
    );
};

export const CoinDetails: React.FC<{item:Ticker, index: number}> = ({item, index}) => {

    return (
        <ListItem>
            <View style={styles.row}>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <View style={{width: 30, display: 'flex', flexDirection: 'column'}}>
                        <Icon name="globe" width={16} height={16} />
                        <Text style={{width: 16}}>{index}</Text>
                    </View>
                    <View style={{width: 80, display: 'flex', flexDirection: 'column'}}>
                        <Text>{item.symbol}</Text>
                        <Text>{ellipsis(item.name)}</Text>
                    </View>
                </View>
                <View style={styles.cell}>
                    <Chart coinId={item.id} />
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
    if (text.length > 10)
        return text.split('').slice(0, text.length - 3).join('') + '...';
    return text;
}
