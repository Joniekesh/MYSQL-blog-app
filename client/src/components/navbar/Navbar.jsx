import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ setOpenOverLay }) => {
	const { currentUser, dispatch } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
		localStorage.removeItem("currentUser");
		navigate("/");
	};

	return (
		<div className="navbar">
			<div className="navbarLeft">
				<Link to="/" style={{ textDecoration: "none", color: "white" }}>
					<h1 className="logo" onClick={()=>setOpenOverLay(false)}>jonieBlog</h1>
				</Link>
			</div>
			<div className="navbarRight">
				<ul className="list">
					<Link
						to="/?cat=sports"
						style={{ textDecoration: "none", color: "white" }}
					>
						<li className="item">SPORTS</li>
					</Link>
					<Link
						to="/?cat=entertainment"
						style={{ textDecoration: "none", color: "white" }}
					>
						<li className="item">ENTERTAINMENT</li>
					</Link>

					<Link
						to="/?cat=technology"
						style={{ textDecoration: "none", color: "white" }}
					>
						<li className="item">TECHNOLOGY</li>
					</Link>

					<Link
						to="/?cat=education"
						style={{ textDecoration: "none", color: "white" }}
					>
						<li className="item">EDUCATION</li>
					</Link>

					<Link
						to="/?cat=science"
						style={{ textDecoration: "none", color: "white" }}
					>
						<li className="item">SCIENCE</li>
					</Link>

					<Link
						to="/?cat=art"
						style={{ textDecoration: "none", color: "white" }}
					>
						<li className="item">ART</li>
					</Link>

					<Link
						to="/?cat=food"
						style={{ textDecoration: "none", color: "white" }}
					>
						<li className="item">FOOD</li>
					</Link>
					{currentUser ? (
						<div className="userInfo">
							<span>{currentUser.user.fullname}</span>
							<span onClick={handleLogout}>Logout</span>
						</div>
					) : (
						<Link to="/auth" style={{ textDecoration: "none", color: "white" }}>
							<li className="item">Login</li>
						</Link>
					)}
					<Link to="/write" style={{ textDecoration: "none", color: "white" }}>
						<li className="item">Write</li>
					</Link>
					<li className="hamburger" onClick={() => setOpenOverLay(true)}>
						<GiHamburgerMenu />
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
