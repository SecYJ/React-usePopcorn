import { ReactNode } from "react";

const MovieColumn = ({ children }: { children: ReactNode }) => {
	return <div className="box">{children}</div>;
};

export default MovieColumn;
