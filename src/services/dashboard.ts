import axios from "axios";

export const API = `${import.meta.env.VITE_REACT_API}/dashboard`;

// Fetch user data
export const getCrmUserData = async () => {
	try {
		const response = await axios.get(`${API}/current`, {
			headers: {
				Authorization: localStorage.getItem("token"),
			},
		});
		return response;
	} catch (error: any) {
		throw error;
	}
};

// Fetch customer chart data
export const getCustomerChartData = async () => {
	try {
		const token = localStorage.getItem("token");

		const customersResponse = await axios.get(`${API}/new-customers`, {
			headers: token
				? {Authorization: token, "Content-Type": "application/json"}
				: {},
			params: {months: 7}, // Get last 7 months
		});
		return customersResponse;
	} catch (error: any) {
		throw error;
	}
};

// Fetch revenue chart data (you need to create this endpoint)
export const getRevenueChartData = async () => {
	try {
		const revenueResponse = await axios.get(`${API}/revenue`, {
			headers: {
				Authorization: localStorage.getItem("token"),
				"Content-Type": "application/json",
			},
			params: {months: 7},
		});
		return revenueResponse.data;
	} catch (error: any) {
		throw error;
	}
};

// Fetch revenue chart data (you need to create this endpoint)
export const getCRMStats = async (): Promise<any> => {
	try {
		const response = await axios.get("http://localhost:8000/api/dashboard/stats", {
			headers: {
				Authorization: localStorage.getItem("token"),
				"Content-Type": "application/json",
			},
			timeout: 10000, // 10 second timeout
		});

		return response.data;
	} catch (error) {
		console.error("Error fetching CRM stats:", error);

		// Check if it's a network error
		if (axios.isAxiosError(error)) {
			if (!error.response) {
				// Network error (no response from server)
				throw new Error(
					"Cannot connect to server. Please check if backend is running.",
				);
			} else if (error.response.status === 401) {
				throw new Error("Authentication failed. Please log in again.");
			} else {
				throw new Error(`Server error: ${error.response.status}`);
			}
		}

		throw error;
	}
};
