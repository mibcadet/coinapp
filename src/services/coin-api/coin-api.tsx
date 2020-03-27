import * as React from 'react';
import { useState, useEffect } from 'react';

import cpApi from 'coinpaprika-js';

export function useCoins(): [any[], boolean] {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        cpApi.coins().then(res => {
            setData(res);
            setLoading(false);
        });
    }, []);

    return [data, isLoading];
}
