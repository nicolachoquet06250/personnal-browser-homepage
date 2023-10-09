import {useCallback, useEffect, useState} from 'react';
import {useDate} from './use-date.ts';

export const weatherIcons = {
    'Clear': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAQBJREFUaN7t2csNwyAMBmBGYYSMwhgdgxEYjRW6ARu4HNyqB0CKednElf5b2/hLSALGAICRHKMABSjgUMDdD7xfLifkxByoJOJ33O3/nwHIhVgsKDWKriXhb+0WQD6wJxZegvhlADzrcUDhpeFlpwLyAa5BZ711Na4pgAXFNxFdABw2K4r/R9iRgLiw+N89MQSATxvYFN8F2DB0qkOJCggbi/8m9AASA0AiAXBuA0ziKIDACBAogMgIECkAYBUFKEABzwOIf4yKf5HJnkqIn8wxmk775y5oxC8pj1jUH9FWEd/YOqK1eERz94j2euFqUCF7NzjYbzHpLqUCFKCAJfkAq7RimK7qUtAAAAAASUVORK5CYII=',
    'Partially cloudy': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAdVJREFUaN7tmc1thDAQRimBElwCJVBCSvAxR5fgEiiBEiiBErhyIx24A2cc2WhiAf4ZA1rJkZ4UZZPN9/AwHrON1rr5ZJoqUAWqQBWoAlWgxJf++WaAAGZAAdpD2dfM7zDS/yopAGE6YDoIHMLIdK8KQIAWGIAtQ8Bh/r59bQWQjCBILCkSJIF1XVuAA9Jivm9ROd0ukS0AQTtgA7SH+Vn31EoEBSAMA2YUUAHiJDyWcCtBuidIArZEroJewVEpjQSJjiIgMsMbpHdjf53sCcEWSxEYCQKOyZQhkshZBZYkYEtHeLVPQSGJnHIS0QI2/FIo+L+VILTXOUVA3BD+D3Q/pAqoFIEebUxFQQLJN/Ojo0TEqDG/JgBv1hdgeVNAP4CKPSvkCKiCQc1KSMRs2+x902hO/Z4cYFhgWOQHY8zo9hOKgCCGH71BEXcqHjEBKDft5gowypVH4YeLgKE9ZSO10cxz7z7TFJqxOEUgZxyYbPi+0M4uSRuZPYCnCPBA6TwrYCWWyFbJImo/FTMpM6pAG5CYvDO0LDii7x2JNAtdSGxuQyp41Q87UqkHW8NJzYsbw+8d6Y5Hi+7qbw8IyOIPd9HRVD8qUD8fqAJVoApUgSrwqfwCJ6xaZshM+xMAAAAASUVORK5CYII=',
    'Overcast': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAYxJREFUaN7tmMERgyAQRS2BEizBEizBEiyBEizBEizBEiyB679Zgh1sLpsMIRgRAZOZdeYfNBPY94FdoCKi6p9VCYAACIAACIAAvF5OPgAUgBHACoAsrfxdVQmfpAAAOgCbE7irDUD3cwAA+oPAXXW3AABoAczs5MKuqwDnfSOhigJwsG4gDc9titDA/x8cNbkAPhbmzvcUMiEgwQDslNvJwr9RRvWpAFpP4xOAOjMAfRuJIAArt3vTYQEAEw3Awa8e55WVkeiuUQgBmD2ZQxUM/NVvLIDPeVM4+CQA603OXwZ4uq13MlEpLVah0wDqUADNDdzp/p7Gs5WYflDTvwMQgP4OgM2ey1zRdcSulgCY0gDGKoQTL9CJ3+00vbAO24zdjcY6rzhg78LcOabOKQCGBAAh6bhnwM0poNNVABU5R23V3wI5qAN7/ZszR8rOc4IKFrexXIDvPe22ya5VDq5bngs2dhTbrNcqBwAmUQIYiwNk2EPp0gBNrp2pXO4KgAAIgAAIgAAIgAC86wECCuvGtH3EIQAAAABJRU5ErkJggg==',
    'Rainy': 'data:image/png;base64,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',
    'Sunrise': 'data:image/svg+xml,%3Csvg fill=\'%23000000\' height=\'800px\' width=\'800px\' version=\'1.1\' id=\'Capa_1\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' viewBox=\'0 0 60 60\' xml:space=\'preserve\'%3E%3Cg%3E%3Cpath d=\'M30,11c0.553,0,1-0.447,1-1V4c0-0.553-0.447-1-1-1s-1,0.447-1,1v6C29,10.553,29.447,11,30,11z\'/%3E%3Cpath d=\'M52,33c0,0.553,0.447,1,1,1h6c0.553,0,1-0.447,1-1s-0.447-1-1-1h-6C52.447,32,52,32.447,52,33z\'/%3E%3Cpath d=\'M1,34h6c0.553,0,1-0.447,1-1s-0.447-1-1-1H1c-0.553,0-1,0.447-1,1S0.447,34,1,34z\'/%3E%3Cpath d=\'M46.264,17.736c0.256,0,0.512-0.098,0.707-0.293l5.736-5.736c0.391-0.391,0.391-1.023,0-1.414s-1.023-0.391-1.414,0 l-5.736,5.736c-0.391,0.391-0.391,1.023,0,1.414C45.752,17.639,46.008,17.736,46.264,17.736z\'/%3E%3Cpath d=\'M13.029,17.443c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414 l-5.736-5.736c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L13.029,17.443z\'/%3E%3Cpath d=\'M50.251,24.404c0.162,0.381,0.532,0.609,0.921,0.609c0.131,0,0.264-0.025,0.391-0.079l2.762-1.173 c0.509-0.217,0.746-0.804,0.53-1.312c-0.217-0.509-0.808-0.743-1.312-0.53l-2.762,1.173C50.272,23.31,50.035,23.896,50.251,24.404z \'/%3E%3Cpath d=\'M5.519,24.187L8.3,25.311c0.123,0.05,0.25,0.073,0.375,0.073c0.396,0,0.77-0.236,0.927-0.625 c0.207-0.513-0.04-1.095-0.552-1.302l-2.781-1.124c-0.513-0.207-1.095,0.041-1.302,0.552C4.76,23.397,5.007,23.979,5.519,24.187z\' /%3E%3Cpath d=\'M20.093,12.219c0.162,0.381,0.532,0.609,0.921,0.609c0.131,0,0.264-0.025,0.391-0.079c0.509-0.217,0.746-0.804,0.53-1.312 l-1.173-2.762c-0.217-0.509-0.809-0.744-1.312-0.53c-0.509,0.217-0.746,0.804-0.53,1.312L20.093,12.219z\'/%3E%3Cpath d=\'M38.241,12.602c0.123,0.05,0.25,0.073,0.375,0.073c0.396,0,0.77-0.236,0.927-0.625l1.124-2.781 c0.207-0.513-0.04-1.095-0.552-1.302c-0.512-0.206-1.095,0.04-1.302,0.552L37.689,11.3C37.482,11.813,37.729,12.395,38.241,12.602z \'/%3E%3Cpath d=\'M59,40h-9.23c0.802-2.252,1.23-4.596,1.23-7c0-11.579-9.421-21-21-21S9,21.421,9,33c0,2.404,0.428,4.748,1.23,7H1 c-0.553,0-1,0.447-1,1s0.447,1,1,1h10.021h37.957H59c0.553,0,1-0.447,1-1S59.553,40,59,40z M12.342,40 C11.451,37.763,11,35.411,11,33c0-10.477,8.523-19,19-19s19,8.523,19,19c0,2.411-0.451,4.763-1.342,7H12.342z\'/%3E%3Cpath d=\'M54,45H6c-0.553,0-1,0.447-1,1s0.447,1,1,1h48c0.553,0,1-0.447,1-1S54.553,45,54,45z\'/%3E%3Cpath d=\'M49,50H11c-0.553,0-1,0.447-1,1s0.447,1,1,1h38c0.553,0,1-0.447,1-1S49.553,50,49,50z\'/%3E%3Cpath d=\'M45,55H15c-0.553,0-1,0.447-1,1s0.447,1,1,1h30c0.553,0,1-0.447,1-1S45.553,55,45,55z\'/%3E%3Cpolygon points=\'22.293,27.293 23.707,28.707 29,23.414 29,35 31,35 31,23.414 36.293,28.707 37.707,27.293 30,19.586 \'/%3E%3C/g%3E%3C/svg%3E',
    'Sunset': 'data:image/svg+xml,%3Csvg fill=\'%23000000\' height=\'800px\' width=\'800px\' version=\'1.1\' id=\'Capa_1\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' viewBox=\'0 0 60 60\' xml:space=\'preserve\'%3E%3Cg%3E%3Cpath d=\'M30,11c0.553,0,1-0.447,1-1V4c0-0.553-0.447-1-1-1s-1,0.447-1,1v6C29,10.553,29.447,11,30,11z\'/%3E%3Cpath d=\'M52,33c0,0.553,0.447,1,1,1h6c0.553,0,1-0.447,1-1s-0.447-1-1-1h-6C52.447,32,52,32.447,52,33z\'/%3E%3Cpath d=\'M1,34h6c0.553,0,1-0.447,1-1s-0.447-1-1-1H1c-0.553,0-1,0.447-1,1S0.447,34,1,34z\'/%3E%3Cpath d=\'M46.264,17.736c0.256,0,0.512-0.098,0.707-0.293l5.736-5.736c0.391-0.391,0.391-1.023,0-1.414s-1.023-0.391-1.414,0 l-5.736,5.736c-0.391,0.391-0.391,1.023,0,1.414C45.752,17.639,46.008,17.736,46.264,17.736z\'/%3E%3Cpath d=\'M13.029,17.443c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414 l-5.736-5.736c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L13.029,17.443z\'/%3E%3Cpath d=\'M50.251,24.404c0.162,0.381,0.532,0.609,0.921,0.609c0.131,0,0.264-0.025,0.391-0.079l2.762-1.173 c0.509-0.217,0.746-0.804,0.53-1.312c-0.217-0.509-0.808-0.743-1.312-0.53l-2.762,1.173C50.272,23.31,50.035,23.896,50.251,24.404z \'/%3E%3Cpath d=\'M5.519,24.187L8.3,25.311c0.123,0.05,0.25,0.073,0.375,0.073c0.396,0,0.77-0.236,0.927-0.625 c0.207-0.513-0.04-1.095-0.552-1.302l-2.781-1.124c-0.512-0.207-1.095,0.041-1.302,0.552C4.76,23.397,5.007,23.979,5.519,24.187z\' /%3E%3Cpath d=\'M20.093,12.219c0.162,0.381,0.532,0.609,0.921,0.609c0.131,0,0.264-0.025,0.391-0.079c0.509-0.217,0.746-0.804,0.53-1.312 l-1.173-2.762c-0.217-0.509-0.809-0.744-1.312-0.53c-0.509,0.217-0.746,0.804-0.53,1.312L20.093,12.219z\'/%3E%3Cpath d=\'M38.241,12.602c0.123,0.05,0.25,0.073,0.375,0.073c0.396,0,0.77-0.236,0.927-0.625l1.124-2.781 c0.207-0.513-0.04-1.095-0.552-1.302c-0.513-0.206-1.095,0.04-1.302,0.552L37.689,11.3C37.482,11.813,37.729,12.395,38.241,12.602z \'/%3E%3Cpath d=\'M59,40h-9.23c0.802-2.252,1.23-4.596,1.23-7c0-11.579-9.421-21-21-21S9,21.421,9,33c0,2.404,0.428,4.748,1.23,7H1 c-0.553,0-1,0.447-1,1s0.447,1,1,1h10.021h37.957H59c0.553,0,1-0.447,1-1S59.553,40,59,40z M12.342,40 C11.451,37.763,11,35.411,11,33c0-10.477,8.523-19,19-19s19,8.523,19,19c0,2.411-0.451,4.763-1.342,7H12.342z\'/%3E%3Cpath d=\'M54,45H6c-0.553,0-1,0.447-1,1s0.447,1,1,1h48c0.553,0,1-0.447,1-1S54.553,45,54,45z\'/%3E%3Cpath d=\'M49,50H11c-0.553,0-1,0.447-1,1s0.447,1,1,1h38c0.553,0,1-0.447,1-1S49.553,50,49,50z\'/%3E%3Cpath d=\'M45,55H15c-0.553,0-1,0.447-1,1s0.447,1,1,1h30c0.553,0,1-0.447,1-1S45.553,55,45,55z\'/%3E%3Cpolygon points=\'31,32.586 31,21 29,21 29,32.586 23.707,27.293 22.293,28.707 30,36.414 37.707,28.707 36.293,27.293 \'/%3E%3C/g%3E%3C/svg%3E'
} as const;

export const weatherWording = {
    'Clear': 'Temps clair',
    'Partially cloudy': 'Nuageux',
    'Overcast': 'Couvert',
    'Rainy': 'Pluvieux',
    'Sunrise': 'Levé de soleil',
    'Sunset': 'Couché de soleil',
} as const;

type WeatherDayHour = {
    datetime: string,
    datetimeEpoch: number,
    temp: number,
    feelslike: number,
    humidity: number,
    dew: number,
    precip: number,
    precipprob: number,
    snow: number,
    snowdepth: number,
    preciptype: string|number|null,
    windgust: number,
    windspeed: number,
    winddir: number,
    pressure: number,
    visibility: number,
    cloudcover: number,
    solarradiation: number,
    solarenergy: number,
    uvindex: number,
    severerisk: number,
    conditions: keyof typeof weatherIcons,
    icon: string,
    stations: string[],
    "source": string
};

type WeatherDay = {
    "datetime": string,
    "datetimeEpoch": number,
    "tempmax": number,
    "tempmin": number,
    "temp": number,
    "feelslikemax": number,
    "feelslikemin": number,
    "feelslike": number,
    "dew": number,
    "humidity": number,
    "precip": number,
    "precipprob": number,
    "precipcover": number,
    "preciptype": number|string|null,
    "snow": number,
    "snowdepth": number,
    "windgust": number,
    "windspeed": number,
    "winddir": number,
    "pressure": number,
    "cloudcover": number,
    "visibility": number,
    "solarradiation": number,
    "solarenergy": number,
    "uvindex": number,
    "severerisk": number,
    "sunrise": string,
    "sunriseEpoch": number,
    "sunset": string,
    "sunsetEpoch": number,
    "moonphase": number,
    "conditions": keyof typeof weatherIcons,
    "description": string,
    "icon": string,
    "stations": string[],
    "source": string,
    "hours": WeatherDayHour[]
};

type WeatherStation = {
    "distance": number,
    "latitude": number,
    "longitude": number,
    "useCount": number,
    "id": string,
    "name": string,
    "quality": number,
    "contribution": number
};

type WeatherCurrentConditions = {
    "datetime": string,
    "datetimeEpoch": number,
    "temp": number,
    "feelslike": number,
    "humidity": number,
    "dew": number,
    "precip": number|string|null,
    "precipprob": number,
    "snow": number,
    "snowdepth": number,
    "preciptype": number|string|null,
    "windgust": number,
    "windspeed": number,
    "winddir": number,
    "pressure": number,
    "visibility": number,
    "cloudcover": number,
    "solarradiation": number,
    "solarenergy": number,
    "uvindex": number,
    "conditions": keyof typeof weatherIcons,
    "icon": string,
    "stations": string[],
    "source": string,
    "sunrise": string,
    "sunriseEpoch": number,
    "sunset": string,
    "sunsetEpoch": number,
    "moonphase": number
};

type Weather = {
    queryCost: number,
    latitude: number,
    longitude: number,
    resolvedAddress: string,
    address: string,
    timezone: string,
    tzoffset: number,
    description: string,
    days: WeatherDay[],
    alerts: [],
    stations: Record<string, WeatherStation>,
    currentConditions: WeatherCurrentConditions
};

type UseWeather = () => {
    weather: Weather,
    loading: boolean,
    error: string|null
};

export const useWeather: UseWeather = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);
    const [weather, setWeather] = useState<Partial<Weather>>({});

    const [,,, currentDate] = useDate();

    const getStartDate = useCallback(() => currentDate, [currentDate]);
    const getEndDate = useCallback(() => {
        const date = new Date(currentDate);
        date.setDate(date.getDate() + 7);

        return `${date.getFullYear()}-${date.getMonth() + 1 <= 9 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() <= 9 ? '0' : ''}${date.getDate()}`;
    }, [currentDate]);

    useEffect(() => {
        const weather_location = encodeURI('Biot, France');
        const api_token = import.meta.env.VITE_WEATHER_API_KEY;
        const start_date = getStartDate();
        const end_date = getEndDate();
        const api_url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weather_location}/${start_date}/${end_date}?unitGroup=metric&contentType=json`;
        const complete_url = `${api_url}&key=${api_token}`;

        /*
         * Le cache expire tous les jours.
         */
        if (!localStorage.getItem('weather_api_cache_creation_date') || localStorage.getItem('weather_api_cache_creation_date') !== currentDate) {
            setLoading(true);
            fetch(complete_url)
                .then(r => {
                    if (r.status === 429) throw new Error("Too Many Requests");
                    return r.json()
                })
                .then(json => {
                    setWeather(json);
                    setError(null);
                    localStorage.setItem('weather_api_result', JSON.stringify(json));
                    localStorage.setItem('weather_api_cache_creation_date', currentDate);
                    localStorage.setItem('weather_api_cache_creation_timestamp', new Date().getTime().toString());
                })
                .catch(err => {
                    setError(err.message);
                    setWeather({});
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
            setWeather(JSON.parse(localStorage.getItem('weather_api_result') ?? '{}'))
        }
    }, [currentDate, getEndDate, getStartDate]);

    return {
        weather: weather as Required<Weather>,
        loading,
        error
    };
};