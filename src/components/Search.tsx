import { useState, ChangeEvent } from "react";

interface Props {
	query: string;
	setQuery: (q: string) => void;
}

const Search = ({ query, setQuery }: Props) => {
	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
		/>
	);
};

export default Search;
