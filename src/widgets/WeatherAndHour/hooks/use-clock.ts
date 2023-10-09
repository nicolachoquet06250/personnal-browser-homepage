import {useCallback, useEffect, useState} from 'react';

type Clock = {
    hours: string,
    minutes: string,
    seconds: string
};

type UseClock = () => Clock;

export const useClock: UseClock = () => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const setClock = useCallback(() => {
        const date = new Date();
        setHours(date.getHours());
        setMinutes(date.getMinutes());
        setSeconds(date.getSeconds());
    }, []);

    useEffect(() => {
        setClock();

        setInterval(setClock, 1000);
    }, [setClock]);

    return {
        hours: `${hours <= 9 ? '0' : ''}${hours}`,
        minutes: `${minutes <= 9 ? '0' : ''}${minutes}`,
        seconds: `${seconds <= 9 ? '0' : ''}${seconds}`
    }
};