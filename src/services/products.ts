import axios from "axios";
import type {ProductFilters} from "../interfaces/filter";

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

/**
 *
 * @param {Object} filters - فلاتر البحث
 * @param {string} filters.category
 * @param {boolean} filters.onSale
 * @param {boolean} filters.inStock
 * @param {string} filters.manufacturer
 * @param {number} filters.minDiscount
 * @param {number} filters.minPrice
 * @param {number} filters.maxPrice
 * @param {string} filters.sortBy - "newest" | "priceAsc" | "priceDesc"
 * @param {number} filters.limit
 * @param {number} page
 */
export const searchProducts = async (
	filters:ProductFilters = {
		category: "",
		isSale: false,
		minDiscount: 0,
		manufacturer: "",
		inStock: false,
		minPrice: 0,
		maxPrice: 1,
		sortBy: "newest",
		limit: 12,
	},
	page: number = 1,
) => {
	try {
		const params = {
			...filters,
			skip: (page - 1) * (filters.limit || 12),
			limit: filters.limit || 12,
		};

		const {data} = await axios.get(`${API}/search`, {params});
		return data;
	} catch (err) {
		console.error("Failed to fetch products:", err);
		return [];
	}
};
