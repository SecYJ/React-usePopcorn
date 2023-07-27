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
// import StarRating from "./components/StarRating";

const tempMovieData = [
	{
		imdbID: "tt1375666",
		Title: "Inception",
		Year: "2010",
		Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
	},
	{
		imdbID: "tt0133093",
		Title: "The Matrix",
		Year: "1999",
		Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
	},
	{
		imdbID: "tt6751668",
		Title: "Parasite",
		Year: "2019",
		Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
	},
];

const tempWatchedData = [
	{
		imdbID: "tt1375666",
		Title: "Inception",
		Year: "2010",
		Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
		runtime: 148,
		imdbRating: 8.8,
		userRating: 10,
	},
	{
		imdbID: "tt0088763",
		Title: "Back to the Future",
		Year: "1985",
		Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
		runtime: 116,
		imdbRating: 8.5,
		userRating: 9,
	},
];

const KEY = "5b02a5e0";

interface Response {
	Search: IMovie[];
	totalResults: number;
	Response: string;
	Error: string;
}

export default function App() {
	const [movies, setMovies] = useState<IMovie[]>([]);
	const [watched, setWatched] = useState<IWatchMovie[]>([]);
	const [query, setQuery] = useState<string>("");
	// const [movies, setMovies] = useState<IMovie[]>(tempMovieData);
	// const [watched, setWatched] = useState<IWatchMovie[]>(tempWatchedData);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		setIsLoading(true);
		setError("");

		const getMovieData = async () => {
			try {
				const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`);
				if (!res.ok) throw new Error("Something went wrong, please try again!");
				const data: Response = await res.json();
				// console.log(data);

				if (data.Response === "False") throw new Error(data.Error);
				setMovies(data.Search);
			} catch (error) {
				if (error instanceof Error) setError(error.message);
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
	}, [query]);

	return (
		<>
			<Navbar>
				<Logo />
				<Search query={query} setQuery={setQuery} />
				<NumResults count={movies.length} />
			</Navbar>
			<Main>
				<Box>
					{!isLoading && !error && <MovieList movies={movies} />}
					{error && <ErrorMessage msg={error} />}
					{isLoading && <Loader />}
				</Box>
				<Box>
					<WatchedSummary watched={watched} />
					<WatchedMoviesList watched={watched} />
				</Box>
			</Main>
			{/* <StarRating /> */}
		</>
	);
}
