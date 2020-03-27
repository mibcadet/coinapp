import { useState, useEffect } from 'react';
import moment from 'moment';

import CoinpaprikaAPI from '@coinpaprika/api-nodejs-client';

export function useCoins(): [any[], boolean] {

    const client = new CoinpaprikaAPI();

    const [data, setData] = useState<any[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        client.getCoins().then((res: any) => {
            setData(res);
            setLoading(false);
        });
    }, []);

    return [data, isLoading];
}

export function useAllTickers(coinId: string): [any[], boolean] {

    const client = new CoinpaprikaAPI();

    const [data, setData] = useState<any[]>([]);
    const [tickers, setTickers] = useState<any[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        client.getAllTickers({
            coinId: coinId,
            historical: {
                start: moment().subtract(1, 'days').format('YYYY-MM-DD'),
                end: moment().format('YYYY-MM-DD'),
                limit: 2000,
                quote: 'usd',
                interval: '30m'
            }
        }).then((tickers) => {
            setTickers(tickers);
        }).catch(console.error)
    }, []);

    useEffect(() => {

        if (tickers instanceof Array) {
            const sorted = [...tickers];
            sorted.sort((a, b) => a.timestamp - b.timestamp);

            const res = sorted.reduce((acc, elem) => {
                acc += elem.price;
                return acc;
            }, []);

            setData(res);
            setLoading(false);
        }

    }, [tickers]);

    return [data, isLoading];
}
