import MoviesContainer from "./components/container/MoviesContainer";
import MovieDetailsPreview from "./components/preview/MovieDetailsPreview";
import { MovieInfoType, MovieInfoResponseType } from "./types";
import { useEffect, useRef, useState } from "react";
import { MovieSelectHandlerContext } from "./contexts/MovieSelectHandlerContext";

const MOVIE_API_ENDPOINT_URL = 'http://localhost:3000/movies';

const movieResponseTypeToMovieInfoTypeHandler = (movie: MovieInfoResponseType) => ({
	id: movie._id,
	title: movie.title,
	thumbnail: movie.poster,
	fullPlot: movie.fullplot,
	year: movie.year,
	runtime: movie.runtime,
	imdb: movie.imdb,
	languages: movie.languages,
	wishlisted: movie.wishlisted
});

function App() {
	const [selectedMovie, setSelectedMovie] = useState<MovieInfoType | undefined>(undefined);
	const [moviesList, setMoviesList] = useState<MovieInfoType[] | []>([]);
	const [pageNumber, setPageNumber] = useState<number>(0);

	const moviesListReachedEnd = useRef(false);

	const documentScrollEventHandler = () => {
		const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
		if (scrollTop + clientHeight >= scrollHeight)
		{
			if (!moviesListReachedEnd.current)
				setPageNumber(pageNumber + 1);
		}
	};

	useEffect(() => {
		const fetchListOfMovies = async () => {
			const response = await fetch(`${MOVIE_API_ENDPOINT_URL}?page=${pageNumber}`);
			const jsonResponse = await response.json();

			const movies: MovieInfoType[] = jsonResponse.data.map(movieResponseTypeToMovieInfoTypeHandler);
			setMoviesList([...moviesList, ...movies]);

			if (!selectedMovie && movies.length) {
				setSelectedMovie(movies[0]);
			}
			
			if (movies.length == 0)
				moviesListReachedEnd.current = true;
		};

		fetchListOfMovies();

		document.addEventListener('scroll', documentScrollEventHandler);

		return () => {
			document.removeEventListener('scroll', documentScrollEventHandler);
		}
	}, [pageNumber]);

	const movieSelectHandler = (movie: MovieInfoType) => {
		setSelectedMovie(movie);
	};

	return (
		<div className="app">
			<MovieSelectHandlerContext.Provider value={{ movieSelectHandler }}>
				<MoviesContainer moviesList={moviesList} />
			</MovieSelectHandlerContext.Provider>

			{selectedMovie && <MovieDetailsPreview movie={selectedMovie} />}
		</div>
	)
}

export default App
