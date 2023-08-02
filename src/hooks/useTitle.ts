import { useEffect, useState } from "react";

const useTitle = (text: string = "Dash Game") => {
	const [title, setTitle] = useState<string>(text);

	useEffect(() => {
		document.title = title;
	}, [title]);

	return { setTitle };
};

export default useTitle;
