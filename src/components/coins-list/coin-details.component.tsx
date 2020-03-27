import * as React from 'react';

import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {
    ListItem, Spinner
} from '@ui-kitten/components';

import {
    LineChart
} from "react-native-chart-kit";

import { useAllTickers } from '../../services/coin-api';

const SCREEN_DIMENSIONS = Dimensions.get('screen');
const SCREEN_WIDTH = SCREEN_DIMENSIONS.width;

interface IChartProps {
    coinId: string;
}

const Chart: React.FC<IChartProps> = ({coinId}) => {

    const [data, loading] = useAllTickers(coinId);

    return (
        <>
            {/* { loading ? <Spinner /> :
                <LineChart
                width={100}
                height={100}
                chartConfig={{
                labelColor: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                }}
                data={{
                labels: data.map((ticker, index) => index.toString()),
                datasets: [{
                data
                }],
                }} />
                } */}
        </>
    );
};

export const CoinDetails = ({item, index}) => {

    //temp data example
    /* "id": "mx-mx-token",
     * "is_active": true,
     * "is_new": false,
     * "name": "MX Token",
     * "rank": 175,
     * "symbol": "MX",
     * "type": "token", */

    return (
        <ListItem>
            <View style={styles.row}>
                <View style={styles.cell}>
                    <Text>{item.symbol}</Text>
                    <Text>{index}</Text>
                </View>
                <View style={styles.cell}>
                    <Text>{item.symbol}</Text>
                    <Text>{item.name}</Text>
                </View>
                <View style={styles.cell}>
                    <Chart coinId={item.id} />
                </View>
                <View style={styles.cell}>
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
        width: (SCREEN_WIDTH * 0.9) / 4,
        height: 50,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: "#f0f"
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
