import MovieCard from "../card/MovieCard";
import { MovieListType } from "../../types";

const MoviesContainer = ({ moviesList} : { moviesList: MovieListType}) => {
    return (
        <div className = 'movies-container'>
            {
                moviesList.map((movie) => movie.thumbnail && (
                    <MovieCard key={movie.id} movieInfo={movie}/>
                ))
            }
        </div>
    )
}

export default MoviesContainer;