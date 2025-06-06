import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const MainLayout: React.FC = () => {
	return (
		<div className="min-h-screen bg-background">
			<Navbar />
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
