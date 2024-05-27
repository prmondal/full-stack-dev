import { MovieInfoType } from "../../types";

const MovieDetailsPreview = ({ movie} : { movie: MovieInfoType }) => {
    return (
        <div className='movie-preview'>
            <div className='movie-preview-container'>
                <div className='title'>{movie.title}</div>
                <div className='thumbnail'>
                    <img decoding="async" loading="lazy" src={movie.thumbnail} />
                </div>
                <div className='metadata'>
                    <div>{`Released: ${movie.year.toString()}`}</div>
                    <div>{`Runtime: ${movie.runtime} mins`}</div>
                    {movie.languages && movie.languages.length && <div>{`Language: ${movie.languages[0]}`}</div>}
                    <div>{`IMDb: ${movie.imdb.rating}`}</div>
                </div>
                <div className='plot'><p>{movie.fullPlot}</p></div>
            </div>
        </div>
    )
}

export default MovieDetailsPreview;