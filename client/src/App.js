import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Write from "./pages/write/Write";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import SinglePost from "./pages/singlePost/SinglePost";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/loader/Loader";
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import PostEdit from "./pages/postEdit/PostEdit";
import Menu from "./components/menu/Menu";
import OverLay from "./components/overLay/OverLay";

const App = () => {
	const { currentUser, loading } = useContext(AuthContext);
	const [openOverLay, setOpenOverLay] = useState(false);

	const PrivateRoute = ({ children }) => {
		return !loading && currentUser ? children : <Navigate to="/auth" />;
	};

	return (
		<BrowserRouter>
			<div>
				<ToastContainer />
			</div>
			<Loader />
			<Navbar setOpenOverLay={setOpenOverLay} />
			<OverLay openOverLay={openOverLay} setOpenOverLay={setOpenOverLay} />
			<Menu setOpenOverLay={setOpenOverLay} openOverLay={openOverLay} />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/posts/:id" element={<SinglePost />}></Route>
				<Route path="/auth" element={<Auth />}></Route>
				<Route
					path="/write"
					element={
						<PrivateRoute>
							<Write />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/posts/:id/edit"
					element={
						<PrivateRoute>
							<PostEdit />
						</PrivateRoute>
					}
				></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
