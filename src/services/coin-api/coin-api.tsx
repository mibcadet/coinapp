import { useState, useEffect } from 'react';
import moment from 'moment';
import { Ticker } from '../../models/Ticker';

import CoinpaprikaAPI from '@coinpaprika/api-nodejs-client';

const defaultPaging = 30;

export function useLatestTickers(lastIndex: number = defaultPaging, sorting = false, sortDirection = false): [Ticker[], boolean] {

    const [coins, setCoins] = useState<Ticker[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const client = new CoinpaprikaAPI();

        client.getAllTickers().then((tickers: ApiTicker[]) => {

            const formattedTickers = tickers.slice(lastIndex - defaultPaging, lastIndex).map((ticker: ApiTicker) => ({
                id: ticker.id,
                name: ticker.name,
                price: ticker.quotes.USD.price,
                marketCap: parseFloat(ticker.quotes.USD.market_cap),
                symbol: ticker.symbol,
                historyTickers: []
            }));

            Promise.all(formattedTickers.map(formattedTicker => {
                return client.getAllTickers({
                    coinId: formattedTicker.id,
                    historical: {
                        start: moment().subtract(1, 'days').format('YYYY-MM-DD'),
                        end: moment().format('YYYY-MM-DD'),
                        limit: 24,
                        quote: 'usd',
                        interval: '1h'
                    }
                }).then((historyTickers: ApiHistoryTicker[]) => {
                    formattedTicker.historyTickers = historyTickers
                });
            }))
            .then(() => {
                const unsorted = [...coins, ...formattedTickers]

                if (sorting) {
                    const sorted = unsorted.sort((a,b) => {
                        if (sortDirection)
                            return a.marketCap - b.marketCap
                        else
                            return b.marketCap - a.marketCap
                    });
                    setCoins(sorted);
                } else {
                    setCoins(unsorted);
                }
                setLoading(false);
            });
        });
    }, [lastIndex, sorting, sortDirection]);

    return [coins, isLoading];
}

type ApiTicker = {
    id: string;
    name: string;
    price: string;
    symbol: string;
    historyTickers: ApiHistoryTicker[];
    quotes: {
        USD: {
            price: string;
            market_cap: string;
        }
    },
};

export type ApiHistoryTicker = {
    market_cap: string;
    price: string;
    timestamp: string;
    volume_24h: string;
}
