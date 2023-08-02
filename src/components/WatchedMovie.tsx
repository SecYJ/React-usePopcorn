import { IWatchMovie } from "../services/watch-movie";

interface Props {
	movie: IWatchMovie;
	onDeleteWatched: (id: string) => void;
}

const WatchedMovie = ({ movie, onDeleteWatched }: Props) => {
	return (
		<li key={movie.imdbID}>
			<img src={movie.poster} alt={`${movie.title} poster`} />
			<h3>{movie.title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span>{movie.imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{movie.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{movie.runtime}</span>
				</p>
				<button type="button" className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>
					X
				</button>
			</div>
		</li>
	);
};

export default WatchedMovie;
