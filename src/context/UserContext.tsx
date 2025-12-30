import {createContext, useContext, useState, useEffect, type ReactNode} from "react";
import {jwtDecode} from "jwt-decode";
import type {User} from "../interfaces/Users";
import {loginUser} from "../services/users";

interface AuthContextType {
	user: User | null;
	token: string | null;
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const savedToken = localStorage.getItem("token");
		if (!savedToken) {
			setLoading(false);
			return;
		}

		try {
			const decodedUser = jwtDecode<User>(savedToken);
			setUser(decodedUser);
			setToken(savedToken);
			// if (decodedUser) console.log(user);
		} catch {
			localStorage.removeItem("token");
		}

		setLoading(false);
	}, [token]);

	const login = async (email: string, password: string) => {
		try {
			const data = await loginUser(email, password);

			if (!data) {
				throw new Error("Token not found in login response");
			}

			const decodedUser = jwtDecode<User>(data);

			setToken(data);
			setUser(decodedUser);
			localStorage.setItem("token", data);
		} catch (error) {
			console.error("Auth login failed:", error);
			throw error;
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
		setToken(null);
	};

	return (
		<AuthContext.Provider value={{user, token, loading, login, logout}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider");
	return context;
};
