import { useEffect, useRef } from "react";

interface Props {
	query: string;
	setQuery: (q: string) => void;
}

const Search = ({ query, setQuery }: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const event = (e: KeyboardEvent) => {
			if (e.code !== "Enter") return;
			if (document.activeElement === inputRef.current) return;
			if (inputRef.current) {
				setQuery("");
				inputRef.current.focus();
			}
		};

		window.addEventListener("keypress", event);

		return () => window.removeEventListener("keypress", event);
	}, [setQuery]);

	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			ref={inputRef}
		/>
	);
};

export default Search;
