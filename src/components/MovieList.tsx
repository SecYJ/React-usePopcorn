import { IMovie } from "../services/movie";
import Movie from "./Movie";

const MovieList = ({ movies }: { movies: IMovie[] }) => {
	return (
		<ul className="list">
			{movies?.map((movie) => (
				<Movie movie={movie} key={movie.imdbID} />
			))}
		</ul>
	);
};

export default MovieList;
