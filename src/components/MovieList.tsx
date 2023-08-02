import { IMovie } from "../services/movie";
import Movie from "./Movie";

interface Props {
	movies: IMovie[];
	updateSelectedID: (id: string) => void;
}

const MovieList = ({ movies, updateSelectedID }: Props) => {
	return (
		<ul className="list list-movies">
			{movies?.map((movie) => (
				<Movie movie={movie} updateSelectedID={updateSelectedID} key={movie.imdbID} />
			))}
		</ul>
	);
};

export default MovieList;
