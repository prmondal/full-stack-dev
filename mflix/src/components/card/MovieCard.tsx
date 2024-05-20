import { MovieInfoType } from "../../types";
import { MovieSelectHandlerContext } from "../../contexts/MovieSelectHandlerContext";
import { useContext } from "react";

const MovieCard = ({ movieInfo }: {movieInfo: MovieInfoType}) => {
    const { movieSelectHandler } = useContext(MovieSelectHandlerContext);
    
    const clickHanlder = () => {
        movieSelectHandler(movieInfo);
    };

    return (
        <div className = 'movie-card'>
            <div className='thumbnail' onClick={clickHanlder}>
                <img decoding="async" src={movieInfo.thumbnail} />
            </div>
        </div>
    )
}

export default MovieCard;