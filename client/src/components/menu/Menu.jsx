import "./menu.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
	MdCancel,
	MdSportsHandball,
	MdCastForEducation,
	MdOutlineScience,
	MdEmojiFoodBeverage,
	MdComputer,
} from "react-icons/md";
import { SiBytedance } from "react-icons/si";
import { GiHumanPyramid } from "react-icons/gi";
import { useContext } from "react";

const Menu = ({ openOverLay, setOpenOverLay }) => {
	const { currentUser } = useContext(AuthContext);
	const user = currentUser?.user;

	const handleClose = () => {
		setOpenOverLay(false);
	};

	return (
		openOverLay && (
			<div className="menu">
				<div className="container">
					<span onClick={handleClose} className="close">
						<MdCancel />
					</span>
					<div className="content">
						<Link
							to="/"
							style={{
								textDecoration: "none",
								color: "white",
							}}
						>
							<h1 className="title" onClick={handleClose}>
								jonieBlog
							</h1>
						</Link>
						<div className="top">
							<Link
								to="/write"
								style={{
									textDecoration: "none",
									color: "white",
								}}
							>
								<span className="writeSide" onClick={handleClose}>
									Write
								</span>
							</Link>
							{user ? (
								<span style={{ fontSize: "18px", fontWeight: "700" }}>
									{user.fullname}
								</span>
							) : (
								<Link
									to="/auth"
									style={{
										textDecoration: "none",
										color: "white",
									}}
								>
									<span className="login" onClick={handleClose}>
										Login
									</span>
								</Link>
							)}
						</div>
						<ul className="list">
							<Link
								to="/?cat=sports"
								style={{
									textDecoration: "none",
									color: "white",
								}}
							>
								<li className="listItem" onClick={handleClose}>
									<span className="icon">
										<MdSportsHandball />
									</span>
									<span>SPORTS</span>
								</li>
							</Link>

							<Link
								to="/?cat=entertainment"
								style={{
									textDecoration: "none",
									color: "white",
								}}
							>
								<li className="listItem" onClick={handleClose}>
									<span className="icon">
										<SiBytedance />
									</span>
									<span>ENTERTAINMENT</span>
								</li>
							</Link>
							<Link
								to="/?cat=technology"
								style={{
									textDecoration: "none",
									color: "white",
								}}
							>
								<li className="listItem" onClick={handleClose}>
									<span className="icon">
										<MdComputer />
									</span>
									<span>TECHNOLOGY</span>
								</li>
							</Link>
							<Link
								to="/?cat=education"
								style={{
									textDecoration: "none",
									color: "white",
								}}
							>
								<li className="listItem" onClick={handleClose}>
									<span className="icon">
										<MdCastForEducation />
									</span>
									<span>EDUCATION</span>
								</li>
							</Link>
							<Link
								to="/?cat=science"
								style={{
									textDecoration: "none",
									color: "white",
								}}
							>
								<li className="listItem" onClick={handleClose}>
									<span className="icon">
										<MdOutlineScience />
									</span>
									<span>SCIENCE</span>
								</li>
							</Link>
							<Link
								to="/?cat=art"
								style={{
									textDecoration: "none",
									color: "white",
								}}
							>
								<li className="listItem" onClick={handleClose}>
									<span className="icon">
										<GiHumanPyramid />
									</span>
									<span>ART</span>
								</li>
							</Link>
							<Link
								to="/?cat=food"
								style={{
									textDecoration: "none",
									color: "white",
								}}
							>
								<li className="listItem" onClick={handleClose}>
									<span className="icon">
										<MdEmojiFoodBeverage />
									</span>
									<span>FOOD</span>
								</li>
							</Link>
						</ul>
					</div>
				</div>
			</div>
		)
	);
};

export default Menu;
