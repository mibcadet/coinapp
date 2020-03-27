import * as React from 'react';
import { useEffect } from 'react';

import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {
    ListItem, Spinner, Icon
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
        <View style={{height: 50, width: 100, backgroundColor: "#FF0"}}>
            {/* { loading && data.length > 0 ? <Spinner /> :
                <LineChart
                width={500}
                height={400}
                chartConfig={{
                labelColor: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                }}
                data={{
                //labels: data.map((ticker, index) => index.toString()),
                labels: [1,2,3,4,5,6,7].map(e => e.toString()),
                datasets: [{
                //data,
                color: (opacity = 1) => `rgba(255, 255, 146, ${opacity})`,
                data: [0.1,0.0002,0.00003,4.0000,5,6,7]
                }],
                }} />
                } */}
        </View>
    );
};

export const CoinDetails = ({item, index}) => {

    return (
        <ListItem>
            <View style={styles.row}>
                <View style={styles.cell}>
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <Icon name="globe" width={16} height={16} />
                            <Text style={{width: 16}}>{index}</Text>
                        </View>
                        <View>
                            <Text>{item.symbol}</Text>
                            <Text>{item.name}</Text>
                        </View>
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
        backgroundColor: "#f0f",
        borderWidth: 2,
        borderColor: "#00F"
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: "#000"
    }
});

function usdFormat(price: string): string {
    return parseFloat(price).toFixed(2);
}
