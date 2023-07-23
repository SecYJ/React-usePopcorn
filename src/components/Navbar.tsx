import { ReactNode } from "react";

const Navbar = ({ children }: { children: ReactNode }) => {
	return <nav className="nav-bar">{children}</nav>;
};

export default Navbar;
