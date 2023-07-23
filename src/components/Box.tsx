import { ReactNode, useState } from "react";

const Box = ({ children }: { children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState<Boolean>(true);
	return (
		<div className="box">
			<button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
				{isOpen ? "-" : "+"}
			</button>
			{isOpen && children}
		</div>
	);
};

export default Box;
