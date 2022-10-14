import "./auth.scss";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/loader/Loader";
import axiosInstance from "../../utils/axiosInstance";

const Auth = () => {
	const [isRegister, setIsRegister] = useState(false);
	const [inputs, setInputs] = useState({
		fullname: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { dispatch, error, loading } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleChange = (event) => {
		setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
	};

	const handleAuth = () => {
		setIsRegister(!isRegister);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (isRegister) {
			if (inputs.password !== inputs.confirmPassword) {
				toast.error("Paswords do not match", { theme: "colored" });
			} else {
				dispatch({ type: "LOGIN_REQUEST" });
				try {
					const res = await axiosInstance.post("/auth", inputs);
					toast.success("Registeration successful. Please login", {
						theme: "colored",
					});
					window.location.reload();
				} catch (err) {
					toast.error(err.response.data, { theme: "colored" });
				}
			}
		} else {
			//Login
			dispatch({ type: "LOGIN_REQUEST" });

			try {
				const res = await axiosInstance.post("/auth/login", {
					email: inputs.email,
					password: inputs.password,
				});
				dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
				toast.success("Login successful", { theme: "colored" });
				navigate("/");
			} catch (err) {
				dispatch({ type: "LOGIN_FAIL", payload: err.response.data });
				toast.error(err.response.data, { theme: "colored" });
			}
		}
	};

	return (
		<div className="auth">
			{isRegister ? (
				<h1 style={{ color: "white", marginBottom: "10px" }}>Register</h1>
			) : (
				<h1 style={{ color: "white", marginBottom: "10px" }}>Login</h1>
			)}
			<form onSubmit={handleSubmit}>
				{isRegister && (
					<div className="inputGroup">
						<label>Full Name</label>
						<input
							type="text"
							name="fullname"
							onChange={handleChange}
							placeholder="Enter your full name"
							required
						/>
					</div>
				)}
				<div className="inputGroup">
					<label>Email</label>
					<input
						type="email"
						placeholder="Enter your full email"
						name="email"
						onChange={handleChange}
						required
					/>
				</div>

				<div className="inputGroup">
					<label>Password</label>
					<input
						type="password"
						placeholder="Enter your password"
						name="password"
						onChange={handleChange}
						required
					/>
				</div>
				{isRegister && (
					<div className="inputGroup">
						<label>Confirm Password</label>
						<input
							type="password"
							placeholder="Confirm Password"
							name="confirmPassword"
							onChange={handleChange}
						/>
					</div>
				)}
				{isRegister ? (
					<button type="submit">Register</button>
				) : (
					<button type="submit">{loading ? <Loader /> : "Login"}</button>
				)}
				{isRegister ? (
					<span>
						Already have an account?
						<span
							onClick={handleAuth}
							style={{ color: "#09236d", fontWeight: "700", cursor: "pointer" }}
						>
							Login
						</span>{" "}
					</span>
				) : (
					<span>
						Don't have an account?
						<span
							onClick={handleAuth}
							style={{ color: "#09236d", fontWeight: "700", cursor: "pointer" }}
						>
							Register
						</span>
					</span>
				)}
			</form>
		</div>
	);
};

export default Auth;
