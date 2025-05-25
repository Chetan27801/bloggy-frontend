import { UserContext } from "@/context/userContext";
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
	allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error("UserContext not found");
	}

	const { user } = context;

	if (!user) {
		return <Navigate to="/login" />;
	}

	if (allowedRoles.includes(user.role)) {
		return <Outlet />;
	}

	return <Navigate to="/login" />;
};

export default PrivateRoute;
