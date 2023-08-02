import { useEffect, useState } from "react";
import Box from "./components/Box";
import Logo from "./components/Logo";
import Main from "./components/Main";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";
import NumResults from "./components/NumResults";
import Search from "./components/Search";
import { IMovie } from "./services/movie";
import { IWatchMovie } from "./services/watch-movie";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import useTitle from "./hooks/useTitle";

interface Response {
	Search: IMovie[];
	totalResults: number;
	Response: string;
	Error: string;
}

type LocalStorageData = IWatchMovie[] | [];

export default function App() {
	const [movies, setMovies] = useState<IMovie[]>([]);
	const [watched, setWatched] = useState<LocalStorageData>(() => {
		const stored = localStorage.getItem("watched");
		return stored ? (JSON.parse(stored) as LocalStorageData) : [];
	});
	const [query, setQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [selectedID, setSelectedID] = useState<string | null>(null);

	useTitle("usePopcorn");

	const updateSelectedID = (id: string) => setSelectedID(id);

	const closeMovie = () => setSelectedID(null);

	const handleAddWatched = (movie: IWatchMovie) => {
		setWatched((watchedMovies) => [movie, ...watchedMovies]);
		localStorage.setItem("watched", JSON.stringify(movie));
	};

	const handleDeleteWatched = (id: string) => setWatched((watched) => watched.filter((w) => w.imdbID !== id));

	useEffect(() => {
		const controller = new AbortController();

		setIsLoading(true);
		setError("");

		const getMovieData = async () => {
			try {
				const res = await fetch(
					`http://www.omdbapi.com/?i=tt3896198&apikey=${import.meta.env.VITE_API_KEY}&s=${query}`,
					{
						signal: controller.signal,
					}
				);
				if (!res.ok) throw new Error("Something went wrong, please try again!");
				const data: Response = await res.json();

				if (data.Response === "False") throw new Error(data.Error);
				setMovies(data.Search);
			} catch (error) {
				// if (error instanceof Error) setError(error.message);
				if (error instanceof DOMException && error.name === "AbortError") setError("");
			} finally {
				setIsLoading(false);
			}
		};

		if (query.length < 3) {
			setMovies([]);
			setError("");
			setIsLoading(false);
			return;
		}

		getMovieData();

		return () => controller.abort();
	}, [query]);

	useEffect(() => {
		localStorage.setItem("watched", JSON.stringify(watched));
	}, [watched]);

	return (
		<>
			<Navbar>
				<Logo />
				<Search query={query} setQuery={setQuery} />
				<NumResults count={movies.length} />
			</Navbar>
			<Main>
				<Box>
					{!isLoading && !error && <MovieList updateSelectedID={updateSelectedID} movies={movies} />}
					{error && <ErrorMessage msg={error} />}
					{isLoading && <Loader />}
				</Box>
				<Box>
					{selectedID ? (
						<MovieDetails
							selectedID={selectedID}
							onCloseMovie={closeMovie}
							onAddWatched={handleAddWatched}
							watchedList={watched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMoviesList onDeleteWatched={handleDeleteWatched} watched={watched} />
						</>
					)}
				</Box>
			</Main>
		</>
	);
}
