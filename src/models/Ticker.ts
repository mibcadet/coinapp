import { ApiHistoryTicker } from "services/coin-api/coin-api";

export type Ticker = {
    id: string;
    name: string;
    symbol: string;
    price: string;
    marketCap: number;
    historyTickers: ApiHistoryTicker[];
};
