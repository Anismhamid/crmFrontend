import axios from "axios";
import type {UserRegisterationType} from "../interfaces/Users";
import type {User} from "../interfaces/Users";

export const userAPI = `${import.meta.env.VITE_REACT_API}/users`;

export const getAllUsers = async () => {
	try {
		const users = await axios.get(userAPI);
		return users.data;
	} catch (error) {
		console.error(error);
	}
};

export const loginUser = async (email: string, password: string) => {
	try {
		const user = await axios.post(`${userAPI}/login`, {email, password});
		return user.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const registerNewUser = async (values: UserRegisterationType) => {
	try {
		const user = await axios.post(`${userAPI}/register`, values);
		return user.data;
	} catch (error) {
		console.error(error);
		console.log(error);

		throw error;
	}
};

export const getMyProfile = async (): Promise<User> => {
	try {
		const token = localStorage.getItem("token");

		const {data} = await axios.get<User>(`${userAPI}/me`, {
			headers: {
				Authorization: token,
			},
		});

		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getUsers = async () => {
	try {
		const token = localStorage.getItem("token");

		const data = await axios.get(`${userAPI}`, {
			headers: {
				Authorization: token,
			},
		});

		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const updateUserStatus = async (userId: string, isActive: boolean) => {
	try {
		const res = await axios.patch(`/users/${userId}/status`, {isActive});
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const updateUserRole = async (userId: string, role: string) => {
	try {
		const res = await axios.patch(`/users/${userId}/role`, {role});
		return res.data;
	} catch (error) {
		console.log(error);
	}
};
