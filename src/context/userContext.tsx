import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

type userType = {
	_id: string;
	name: string;
	email: string;
	avatar: string;
	role: string;
	bio: string;
	token: string;
	createdAt: string;
	updatedAt: string;
};

type userContextType = {
	user: userType | null;
	loading: boolean;
	updateUser: (userData: userType) => void;
	signout: () => void;
};

export const UserContext = createContext<userContextType | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<userType | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (user) return;

		const accessToken = localStorage.getItem("token");
		if (!accessToken) {
			setLoading(false);
			return;
		}

		const fetchUser = async () => {
			try {
				const response = await axiosInstance.get(API_PATHS.AUTH.GET_ME);
				setUser(response.data);
			} catch (error) {
				console.error("User not authenticated", error);
			} finally {
				setLoading(false);
			}
		};
		fetchUser();
	}, [user]);

	const updateUser = (userData: userType) => {
		setUser(userData);
		localStorage.setItem("token", userData.token);
		setLoading(false);
	};

	const signout = () => {
		setUser(null);
		localStorage.removeItem("token");
		setLoading(false);
	};

	return (
		<UserContext.Provider value={{ user, loading, updateUser, signout }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
