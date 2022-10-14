import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
	currentUser: JSON.parse(localStorage.getItem("currentUser")),
	loading: false,
	error: null,
};

const AuthReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN_REQUEST":
			return {
				currentUser: null,
				loading: true,
				error: null,
			};
		case "LOGIN_SUCCESS":
			return {
				currentUser: action.payload,
				loading: false,
				error: null,
			};
		case "LOGIN_FAIL":
			return {
				currentUser: null,
				loading: false,
				error: action.payload,
			};
		case "LOGOUT":
			return {
				initialState,
			};
		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, initialState);

	useEffect(() => {
		localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
	}, [state.currentUser]);

	return (
		<AuthContext.Provider
			value={{
				currentUser: state.currentUser,
				loading: state.loading,
				error: state.error,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
