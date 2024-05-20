import MoviesContainer from "./components/container/MoviesContainer";
import MovieDetailsPreview from "./components/preview/MovieDetailsPreview";
import { default as MovieListData } from '../data/MflixData';
import { MovieInfoType } from "./types";
import { useMemo, useState } from "react";
import { MovieSelectHandlerContext } from "./contexts/MovieSelectHandlerContext";

function App() {
	const moviesList: MovieInfoType[] = useMemo(() => {
		return MovieListData.map((movie) => ({
			id: movie._id,
			title: movie.title,
			thumbnail: movie.poster,
			fullPlot: movie.fullplot,
			year: movie.year,
			runtime: movie.runtime,
			imdb: movie.imdb,
			languages: movie.languages
		}));
	}, []);

	const [selectedMovie, setSelectedMovie] = useState<MovieInfoType>(moviesList[20]);

	const movieSelectHandler = (movie: MovieInfoType) => {
		setSelectedMovie(movie);
	};

	return (
		<div className="app">
			<MovieSelectHandlerContext.Provider value={{ movieSelectHandler }}>
				<MoviesContainer moviesList={moviesList} />
			</MovieSelectHandlerContext.Provider>

			<MovieDetailsPreview movie={selectedMovie} />
		</div>
	)
}

export default App
