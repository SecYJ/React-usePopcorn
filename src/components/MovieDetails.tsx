import { useEffect, useState } from "react";
import { IWatchMovie } from "../services/watch-movie";
import Loader from "./Loader";
import StarRating from "./StarRating";

interface Props {
	selectedID: string;
	watchedList: IWatchMovie[];
	onCloseMovie: () => void;
	onAddWatched: (movie: IWatchMovie) => void;
}

interface Movie extends Record<Lowercase<string>, string | number> {
	Title: string;
	Year: string;
	Poster: string;
	Runtime: string;
	imdbRating: number;
	Plot: string;
	Released: number;
	Actors: string;
	Director: string;
	Genre: string;
	UserRating: number;
}

const MovieDetails = ({ selectedID, onCloseMovie, onAddWatched, watchedList }: Props) => {
	const [movie, setMovie] = useState({} as Movie);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [rating, setRating] = useState<number>(0);

	const isWatched: IWatchMovie | undefined = watchedList.find((watch) => watch.imdbID === selectedID);

	const {
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
		Title: title,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Year: year,
	} = movie;

	const handleAdd = (): void => {
		if (!rating) return;

		const newWatchedMovie: IWatchMovie = {
			released,
			actors,
			director,
			genre,
			title,
			poster,
			imdbRating,
			plot,
			year,
			imdbID: selectedID,
			userRating: rating,
			runtime: Number(runtime.split(" ")[0]),
		};

		onAddWatched(newWatchedMovie);
		onCloseMovie();
	};

	useEffect(() => {
		if (!selectedID) return;

		const event = (e: KeyboardEvent) => {
			if (e.key === "Escape") onCloseMovie();
		};

		window.addEventListener("keydown", event);

		return () => window.removeEventListener("keydown", event);
	}, [selectedID]);

	useEffect(() => {
		const controller = new AbortController();

		setIsLoading(true);

		const getMovie = async () => {
			try {
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&i=${selectedID}`,
					{ signal: controller.signal }
				);
				if (!res.ok) throw new Error("Something went wrong!");
				const data = await res.json();
				setMovie(data);
			} catch (error) {
			} finally {
				setIsLoading(false);
			}
		};

		getMovie();

		return () => controller.abort();
	}, [selectedID]);

	return (
		<div className="details">
			{isLoading ? (
				<Loader />
			) : (
				<>
					<header>
						<button className="btn-back" onClick={onCloseMovie}>
							&larr;
						</button>
						<img src={poster} alt={`Poster of ${movie} movie`} />
						<div className="details-overview">
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐️</span>
								{imdbRating} IMDb rating
							</p>
						</div>
					</header>
					<section>
						{/* <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={ }
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div> */}
						<div className="rating">
							{isWatched ? (
								<p>
									You rated with {isWatched.userRating}
									<span>⭐</span>
								</p>
							) : (
								<StarRating maxRating={10} size={24} onSetRating={setRating} />
							)}
						</div>

						{rating > 0 && (
							<button className="btn-add" onClick={handleAdd}>
								+ Add to list
							</button>
						)}
						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors}</p>
						<p>Directed by {director}</p>
					</section>
				</>
			)}
		</div>
	);
};

export default MovieDetails;
