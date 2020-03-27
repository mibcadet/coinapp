import * as React from 'react';

import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {
    ListItem
} from '@ui-kitten/components';

const SCREEN_DIMENSIONS = Dimensions.get('screen');
const SCREEN_WIDTH = SCREEN_DIMENSIONS.width;

export const CoinDetails = ({item}) => {

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
            <View style={{width: SCREEN_WIDTH * 0.9, height: 100, backgroundColor: "#f0f"}}>
                <View style={styles.cell}>
                </View>
                <View>
                    <Text>{item.name}</Text>
                </View>
                <View>
                </View>
                <View>
                </View>
            </View>
        </ListItem>
    );
};

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    }
});
