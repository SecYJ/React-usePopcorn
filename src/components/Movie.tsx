import useTitle from "../hooks/useTitle";
import { IMovie } from "../services/movie";

interface Props {
	movie: IMovie;
	updateSelectedID: (id: string) => void;
}

const Movie = ({ movie, updateSelectedID }: Props) => {
	const { setTitle } = useTitle();

	const newMovie = Object.fromEntries(Object.entries(movie).map((m) => [m[0].toLowerCase(), m[1]]));

	const onSelect = () => {
		updateSelectedID(movie.imdbID);
		setTitle(`Movie: ${movie.Title}`);
	};

	return (
		<li key={newMovie.imdbID} onClick={onSelect}>
			<img src={newMovie.poster} alt={`${newMovie.title} poster`} />
			<h3>{newMovie.title}</h3>
			<div>
				<p>
					<span>🗓</span>
					<span>{newMovie.year}</span>
				</p>
			</div>
		</li>
		// <li key={movie.imdbID} onClick={onSelect}>
		// 	<img src={movie.Poster} alt={`${movie.Title} poster`} />
		// 	<h3>{movie.Title}</h3>
		// 	<div>
		// 		<p>
		// 			<span>🗓</span>
		// 			<span>{movie.Year}</span>
		// 		</p>
		// 	</div>
		// </li>
	);
};

export default Movie;
