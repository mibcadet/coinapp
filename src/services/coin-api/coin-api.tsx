import { useState, useEffect } from 'react';
import moment from 'moment';

import CoinpaprikaAPI from '@coinpaprika/api-nodejs-client';

export function useCoins(): [any[], boolean] {

    const client = new CoinpaprikaAPI();

    const [data, setData] = useState<any[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        client.getAllTickers().then((tickers: any) => {
            const formattedTickers = tickers.map((ticker) => ({
                id: ticker.id,
                name: ticker.name,
                price: ticker.quotes.USD.price,
                symbol: ticker.symbol
            }));
            setData(formattedTickers);
            setLoading(false);
        });
    }, []);

    return [data, isLoading];
}

export function useAllTickers(coinId: string): [any[], boolean] {

    const client = new CoinpaprikaAPI();

    const [tickers, setTickers] = useState<any[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        client.getAllTickers({
            coinId: coinId,
            historical: {
                start: moment().subtract(1, 'days').format('YYYY-MM-DD'),
                end: moment().format('YYYY-MM-DD'),
                limit: 24,
                quote: 'usd',
                interval: '60m'
            }
        }).then((tickers) => {
            setTickers(tickers);
        }).catch(console.error)
    }, []);

    return [tickers, isLoading];
}
