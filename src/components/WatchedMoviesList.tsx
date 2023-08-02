import { IWatchMovie } from "../services/watch-movie";
import WatchedMovie from "./WatchedMovie";

interface Props {
	watched: IWatchMovie[];
	onDeleteWatched: (id: string) => void;
}

const WatchedMoviesList = ({ watched, onDeleteWatched }: Props) => {
	return (
		<ul className="list">
			{watched.map((movie) => (
				<WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched} />
			))}
		</ul>
	);
};

export default WatchedMoviesList;
