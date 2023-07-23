import { useState } from "react";
import { IWatchMovie } from "../services/watch-movie";
import WatchedMovie from "./WatchedMovie";

interface Props {
	watched: IWatchMovie[];
}

const WatchedMoviesList = ({ watched }: Props) => {
	return (
		<ul className="list">
			{watched.map((movie) => (
				<WatchedMovie movie={movie} key={movie.imdbID} />
			))}
		</ul>
	);
};

export default WatchedMoviesList;
