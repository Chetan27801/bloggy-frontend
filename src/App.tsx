import {
	BrowserRouter as Router,
	Routes,
	Route,
	Outlet,
	Navigate,
} from "react-router-dom";
// import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import UserProvider, { UserContext } from "./context/userContext";
import { useContext } from "react";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AuthorDashboard from "./pages/Author/AuthorDashboard";
import UserDashboard from "./pages/User/UserDashboard";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
	return (
		<UserProvider>
			<Router>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<SignUp />} />

					{/* Adimn Routes */}
					<Route element={<PrivateRoute allowedRoles={["admin"]} />}>
						<Route path="/admin/dashboard" element={<AdminDashboard />} />
					</Route>

					{/* Author Routes */}
					<Route element={<PrivateRoute allowedRoles={["author"]} />}>
						<Route path="/author/dashboard" element={<AuthorDashboard />} />
						{/* <Route path="/author/create-post" element={<CreatePost />} /> */}
						{/* <Route path="author/posts" element={<AuthorPosts />} /> */}
					</Route>

					{/* User Routes */}
					<Route element={<PrivateRoute allowedRoles={["user"]} />}>
						<Route path="/user/dashboard" element={<UserDashboard />} />
					</Route>

					{/* Public Routes */}
					<Route path="/" element={<RootPage />} />
				</Routes>
			</Router>
		</UserProvider>
	);
}

export default App;

const RootPage = () => {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error("UserContext not found");
	}

	const { user, loading } = context;

	if (loading) {
		return <Outlet />;
	}

	if (!user) {
		return <Navigate to="/login" />;
	}

	if (user.role === "admin") {
		return <Navigate to="/admin/dashboard" />;
	} else if (user.role === "author") {
		return <Navigate to="/author/dashboard" />;
	} else {
		return <Navigate to="/reader/dashboard" />;
	}
};
