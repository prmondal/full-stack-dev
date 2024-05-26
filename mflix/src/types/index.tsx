export interface MovieInfoType {
    id: string;
    title: string;
    thumbnail?: string;
    fullPlot?: string;
    year: number;
    runtime: number;
    imdb: {
        rating: number
    },
    languages?: string[],
    wishlisted?: boolean
};

export interface MovieInfoResponseType {
    _id: string;
    title: string;
    poster?: string;
    fullplot?: string;
    year: number;
    runtime: number;
    imdb: {
        rating: number
    },
    languages?: string[],
    wishlisted?: boolean
};

export type MovieListType = MovieInfoType[];