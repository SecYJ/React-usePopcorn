const NumResults = ({ count }: { count: number }) => {
	return (
		<p className="num-results">
			Found <strong>{count}</strong> results
		</p>
	);
};

export default NumResults;
