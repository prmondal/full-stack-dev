export interface MovieInfoType {
    id: string;
    title: string;
    thumbnail?: string;
    fullPlot?: string;
    year: Number;
    runtime: Number;
    imdb: {
        rating: Number
    },
    languages?: string[]
};

export type MovieListType = MovieInfoType[];