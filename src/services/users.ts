import axios from "axios";

const API = `${import.meta.env.VITE_REACT_API}/users`;

export const getAllUsers = async () => {
	try {
		const users = await axios.get(API);
		return users.data;
	} catch (error) {
		console.error(error);
	}
};
