/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_GOOGLE_SEARCH_API_KEY: string
    VITE_WEATHER_API_KEY: string
}

interface ImportMeta {
    readonly env: Readonly<ImportMetaEnv>
}