import axios from "axios";

const API = `${import.meta.env.VITE_REACT_API}/products`;

export const getAllProducts = async () => {
	try {
		const result = await axios.get(API);
		return result.data;
	} catch (error) {
		console.error(error);
	}
};

export const getProductsByName = async (name: string) => {
	try {
		const result = await axios.get(`${API}/${name}`);
		return result.data;
	} catch (error) {
		console.error(error);
	}
};

export const getProductById = async (id: string) => {
	try {
		const result = await axios.get(`${API}/${id}`);
		return result.data;
	} catch (error) {
		console.error(error);
	}
};

export const getProductsByCategory = async (category: string) => {
	try {
		const result = await axios.get(`${API}/category/${category}`);
		return result.data;
	} catch (error) {
		console.error(error);
	}
};

export const searchProducts = async (q: string, category: string = "") => {
	try {
		const result = await axios.get(`${API}/${q || category}`);
		return result.data;
	} catch (error) {
		console.error(error);
	}
};
