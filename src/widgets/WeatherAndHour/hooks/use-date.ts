import {useCallback, useEffect, useState} from 'react';

const days = [
    'dimanche',
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
    'samedi',
] as const;
const lightDays = [
    'dim.',
    'lun.',
    'mar.',
    'mer.',
    'jeu.',
    'ven.',
    'sam.',
] as const;
const months = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
] as const;

type DayNumber = `${number}${number|''}`;
type MonthNumber = `${number}${number|''}`;
type FullYear = `${number}${number}${number}${number}`;
type Days = Exclude<typeof days[keyof typeof days], number|object>;
type LightDays = Exclude<typeof days[keyof typeof days], number|object>;
type Months = Exclude<typeof months[keyof typeof months], number|object>;
type StrDateUsFormat = `${FullYear}-${DayNumber}-${MonthNumber}` | string;
type StrDateFrFormat = `${Days} ${DayNumber} ${Months} ${FullYear}`;

type Formats = {
    US: StrDateUsFormat,
    FR: StrDateFrFormat,
    FRLight: `${DayNumber} ${Months}`,
    FRUltraLight: `${DayNumber}/${MonthNumber}`
    FRLightDayName: `${LightDays}`
}

type SetDateFrom = (f: StrDateUsFormat) => void;
type GetDateDirectFrom = <
    OutFormat extends keyof Formats,
    RealOutFormat = Formats[OutFormat]
>(format: StrDateUsFormat, outFormat: OutFormat) => RealOutFormat;

type UseDate = () => [
    strDate: Formats['FR']|'',
    setDateFrom: SetDateFrom,
    getDateDirectFrom: GetDateDirectFrom,
    currentDate: Formats['US']
];

const getCurrentDate = () => {
    const date = new Date();

    return `${date.getFullYear()}-${date.getMonth() + 1 <= 9 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() <= 9 ? '0' : ''}${date.getDate()}` as Formats['US'];
}

export const useDate: UseDate = () => {
    const [strDate, setDate] = useState<StrDateFrFormat|''>('');

    const setStrDate = useCallback((from: StrDateUsFormat|null = null) => {
        const date = from === null ? new Date() : new Date(from);

        const strDate = `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}` as StrDateFrFormat;

        setDate(strDate);
    }, []);

    useEffect(() => {
        setStrDate();

        setInterval(setStrDate, 60_000);
    }, [setStrDate]);

    const setDateFrom = useCallback<SetDateFrom>(from =>
        setStrDate(from), [setStrDate]);

    const getDateDirectFrom = useCallback((from, outFormat) => {
        const date = from === null ? new Date() : new Date(from);

        switch (outFormat) {
            case "FR":
                return `${days[date.getDay()]} ${date.getDate() <= 9 ? '0' : ''}${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}` as Formats['FR'];
            case "FRLight":
                return `${date.getDate() <= 9 ? '0' : ''}${date.getDate()} ${months[date.getMonth()]}` as Formats['FRLight'];
            case "FRUltraLight":
                return `${date.getDate() <= 9 ? '0' : ''}${date.getDate()}/${date.getMonth() <= 9 ? '0' : ''}${date.getMonth()}` as Formats['FRUltraLight'];
            case "FRLightDayName":
                return lightDays[date.getDay()] as Formats['FRLightDayName'];
        }

        return from as Formats['US'];
    }, []) as GetDateDirectFrom;

    return [strDate, setDateFrom, getDateDirectFrom, getCurrentDate()];
};
