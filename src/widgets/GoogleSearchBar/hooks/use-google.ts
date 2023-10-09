import {useCallback, useEffect, useState} from 'react';
import type {Dispatch, SetStateAction} from 'react';

type GoogleSearchResultItem = {
    "title": string,
    "htmlTitle": string,
    "link": string,
    "displayLink": string,
    "snippet": string,
    "htmlSnippet": string,
    "cacheId": string,
    "formattedUrl": string,
    "labels": {
        "name": string,
        "displayName": string,
        "label_with_op": string
    }[]
};
type GoogleSearchRequest = {
    count: number,
    cx: string,
    disableCnTwTranslation: string,
    filter: string,
    hl: string,
    inputEncoding: string,
    searchTerms: string,
    startIndex: number,
    title: string,
    totalResults: string
};
type GoogleSearchResult = {
    items: GoogleSearchResultItem[],
    queries: {
        nextPage: GoogleSearchRequest[],
        request: GoogleSearchRequest[]
    }
};
type GoogleSearchRequestTuple = [
    key: keyof GoogleSearchRequest,
    val: GoogleSearchRequest[keyof GoogleSearchRequest]
];

type UseGoogle = () => {
    search: string;
    loading: boolean;
    error: string | null;
    getNextPageUrl: () => string;
    clearResults: () => void;
    doSearch: () => void;
    setSearch: Dispatch<SetStateAction<string>>;
    setUrl: Dispatch<SetStateAction<string | null>>;
    results: GoogleSearchResult | Partial<GoogleSearchResult>;
    searchResultList: GoogleSearchResultItem[];
};

const googleSearchBaseUrl = `https://customsearch.googleapis.com/customsearch/v1`;
const urlParameters = {
    key: import.meta.env.VITE_GOOGLE_SEARCH_API_KEY,
    c2coff: '1',
    filter: '1',
    hl: 'fr-FR',
    cx: '83442d841f63e4fcf',
};

const finalQueryString = (q: string) =>
    `?${Object.entries({...urlParameters, q})
        .map(([key, val]: [k: string, v: string]) =>
            `${key}=${encodeURI(val)}`)
        .join('&')}`;

export const useGoogle: UseGoogle = () => {
    const [
        search,
        setSearch
    ] = useState<string>('');
    const [
        results,
        setResults
    ] = useState<GoogleSearchResult|Partial<GoogleSearchResult>>({});
    const [
        searchResultList,
        setSearchResultList
    ] = useState<GoogleSearchResultItem[]>([]);
    const [
        error,
        setError
    ] = useState<string | null>(null);
    const [
        loading,
        setLoading
    ] = useState<boolean>(false);
    const [
        url,
        setUrl
    ] = useState<string | null>(null);

    const doSearch = useCallback(() => {
        if (search.length > 0) {
            setUrl(`${googleSearchBaseUrl}${finalQueryString(search)}`);
        }
    }, [search]);

    const getNextPageUrl = useCallback(
        () => `${googleSearchBaseUrl}?${(Object.entries({...(results.queries?.nextPage[0] ?? {}), key: urlParameters.key}) as GoogleSearchRequestTuple[])
            .map(([k, v]) => `${k === 'searchTerms' ? 'q' : k === 'startIndex' ? 'start' : k}=${encodeURI(`${v}`)}`)
            .join('&')}`,
        [results]
    );

    const clearResults = useCallback(() => {
        setResults({});
        setSearchResultList([]);
        setError(null);
    }, []);

    useEffect(() => {
        if (search.length === 0) {
            clearResults();
        }
    }, [clearResults, search]);

    useEffect(() => {
        if (url && search.length > 0) {
            setLoading(true);
            fetch(url, {
                headers: {
                    Accept: 'application/json'
                }
            })
                .then(r => r.json())
                .then((json: GoogleSearchResult) => {
                    setResults(json);
                    setSearchResultList(v => [
                        ...v,
                        ...(json.items ?? [])
                    ]);
                })
                .catch(err => setError(err.message))
                .finally(() => setLoading(false));
        }
    }, [search, url]);

    return {
        loading, search, results,
        searchResultList, error,
        setSearch, setUrl,
        doSearch, clearResults,
        getNextPageUrl
    }
};