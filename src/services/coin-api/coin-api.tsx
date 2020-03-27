import { useState, useEffect } from 'react';
import moment from 'moment';
import { Ticker } from '../../models/Ticker';

import CoinpaprikaAPI from '@coinpaprika/api-nodejs-client';

export function useLatestTickers(lastIndex: number = 30): [Ticker[], boolean] {

    const client = new CoinpaprikaAPI();

    const [data, setData] = useState<Ticker[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        client.getAllTickers().then((tickers: ApiTicker[]) => {
            const formattedTickers = tickers.map((ticker: ApiTicker) => ({
                id: ticker.id,
                name: ticker.name,
                price: ticker.quotes.USD.price,
                marketCap: parseFloat(ticker.quotes.USD.market_cap),
                symbol: ticker.symbol
            }));
            setData(formattedTickers.slice(0, lastIndex));
            setLoading(false);
        });
    }, [lastIndex]);

    return [data, isLoading];
}

export function useHistoryTickers(coinId: string): [Ticker[], boolean, boolean] {

    const client = new CoinpaprikaAPI();

    const [tickers, setTickers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasErrors, setHasErrors] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        client.getAllTickers({
            coinId: coinId,
            historical: {
                start: moment().subtract(1, 'days').format('YYYY-MM-DD'),
                end: moment().format('YYYY-MM-DD'),
                limit: 24,
                quote: 'usd',
                interval: '1h'
            }
        }).then((tickers: ApiHistoryTicker[]) => {
            setTickers(tickers);
            setIsLoading(false);
        }).catch(() => {
            setHasErrors(true);
        });
    }, []);

    return [tickers, isLoading, hasErrors];
}

type ApiTicker = {
    id: string;
    name: string;
    price: string;
    symbol: string;
    quotes: {
        USD: {
            price: string;
            market_cap: string;
        }
    },
};

type ApiHistoryTicker = {
    market_cap: string;
    price: string;
    timestamp: string;
    volume_24h: string;
}


const sortings = {
    byMarketCapAsc: (a: Ticker, b: Ticker) => a.marketCap > b.marketCap,
    byMarketCapDesc: (a: Ticker, b: Ticker) => b.marketCap < a.marketCap
}
