import { useState } from "react";
import { IWatchMovie } from "../services/watch-movie";
import WatchedMovie from "./WatchedMovie";

interface Props {
	watched: IWatchMovie[];
}

const WatchedMoviesList = ({ watched }: Props) => {
	const [isOpen2, setIsOpen2] = useState<Boolean>(true);

	return (
		<>
			<button className="btn-toggle" onClick={() => setIsOpen2((open) => !open)}>
				{isOpen2 ? "–" : "+"}
			</button>
			<ul className="list">
				{watched.map((movie) => (
					<WatchedMovie movie={movie} key={movie.imdbID} />
				))}
			</ul>
		</>
	);
};

export default WatchedMoviesList;
