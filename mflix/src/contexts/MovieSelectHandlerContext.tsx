import { createContext } from "react";
import { MovieInfoType } from "../types";

interface MovieSelectHandlerContextProps {
    movieSelectHandler: (movie: MovieInfoType) => void
};

export const MovieSelectHandlerContext = createContext<MovieSelectHandlerContextProps>(null!);