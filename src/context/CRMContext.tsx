import React, {createContext, useEffect, useState, type ReactNode} from "react";
import type {User} from "../interfaces/Users";
import {
	getCRMStats,
	getCrmUserData,
	getCustomerChartData,
	getRevenueChartData,
} from "../services/dashboard";

interface CRMStats {
	totalRevenue: number;
	totalCustomers: number;
	activeDeals: number;
	conversionRate: number;
	totalProducts?: number;
}

interface ChartData {
	labels: string[];
	datasets: Array<{
		label: string;
		data: number[];
		backgroundColor?: string;
		borderColor?: string;
		borderWidth?: number;
		fill?: boolean;
		tension?: number;
		borderRadius?: number;
	}>;
}

interface CRMContextType {
	user: User | null;
	stats: CRMStats | null;
	chartData: {
		customers: ChartData | null;
		revenue: ChartData | null;
	};
	loading: boolean;
	error: string | null;
	updateStats: (newStats: Partial<CRMStats>) => void;
	refreshAllData: () => Promise<void>;
}

export const CRMContext = createContext<CRMContextType>({
	user: null,
	stats: null,
	chartData: {
		customers: null,
		revenue: null,
	},
	loading: true,
	error: null,
	updateStats: () => {},
	refreshAllData: async () => {},
});

interface CRMProviderProps {
	children: ReactNode;
}

export const CRMProvider: React.FC<CRMProviderProps> = ({children}) => {
	const [user, setUser] = useState<User | null>(null);
	const [stats, setStats] = useState<CRMStats | null>(null);
	const [chartData, setChartData] = useState<{
		customers: ChartData | null;
		revenue: ChartData | null;
	}>({
		customers: null,
		revenue: null,
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// تحويل بيانات الزبائن من صفوف إلى ChartData
	const transformCustomersData = (data: any): ChartData | null => {
		console.log("🔍 transformCustomersData - Raw data:", data);

		if (!data) {
			console.log("❌ No data provided");
			return null;
		}

		// إذا كانت البيانات تحتوي على structure صحيح بالفعل (ChartData مباشرة)
		if (
			data.labels &&
			Array.isArray(data.labels) &&
			data.datasets &&
			Array.isArray(data.datasets)
		) {
			console.log("✅ Data is already in ChartData format");
			return data;
		}

		// إذا كانت البيانات تحتوي على structure صحيح داخل صف
		if (
			Array.isArray(data) &&
			data.length > 0 &&
			data[0].labels &&
			data[0].datasets
		) {
			console.log("✅ Data is array of ChartData, using first element");
			return data[0];
		}

		// إذا كانت البيانات صفوفاً من objects (البنية الحالية من API)
		if (Array.isArray(data) && data.length > 0) {
			console.log("📊 Processing array data structure");
			console.log("📊 First element:", data[0]);

			// التحقق من البنية الشائعة: {_id: {year, month}, count}
			if (data[0]._id && data[0].count !== undefined) {
				console.log("✅ Detected MongoDB aggregation format");

				// إنشاء بيانات شهرية (12 شهراً)
				const monthlyData = Array(12).fill(0);
				const labels = [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
					"Oct",
					"Nov",
					"Dec",
				];

				data.forEach((item: any) => {
					if (item._id?.month && item.count !== undefined) {
						const monthIndex = item._id.month - 1;
						if (monthIndex >= 0 && monthIndex < 12) {
							monthlyData[monthIndex] = item.count;
						}
					}
				});

				console.log("📊 Monthly data:", monthlyData);

				// أخذ آخر 7 أشهر فقط للعرض
				const last7Months = monthlyData.slice(-7);
				const last7Labels = labels.slice(-7);

				const result = {
					labels: last7Labels,
					datasets: [
						{
							label: "New Customers",
							data: last7Months,
							backgroundColor: "rgba(22, 163, 74, 0.7)",
							borderColor: "#16a34a",
							borderWidth: 1,
							borderRadius: 4,
						},
					],
				};

				console.log("✅ Transformed result:", result);
				return result;
			}

			// إذا كانت بيانات بسيطة [عدد، عدد، ...]
			if (typeof data[0] === "number") {
				console.log("✅ Detected simple number array");
				return {
					labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
					datasets: [
						{
							label: "New Customers",
							data: data.slice(0, 7), // أخذ أول 7 عناصر
							backgroundColor: "rgba(22, 163, 74, 0.7)",
							borderColor: "#16a34a",
							borderWidth: 1,
							borderRadius: 4,
						},
					],
				};
			}
		}

		console.log("❌ Unknown data format:", typeof data);
		return null;
	};

	// تحويل بيانات الإيرادات إلى ChartData
	const transformRevenueData = (data: any): ChartData | null => {
		console.log("🔍 transformRevenueData - Raw data:", data);

		if (!data) {
			console.log("❌ No data provided");
			return null;
		}

		// إذا كانت البيانات تحتوي على structure صحيح بالفعل
		if (
			data.labels &&
			Array.isArray(data.labels) &&
			data.datasets &&
			Array.isArray(data.datasets)
		) {
			console.log("✅ Data is already in ChartData format");
			return data;
		}

		// إذا كانت البيانات تحتوي على data مباشرة
		if (Array.isArray(data)) {
			console.log("✅ Processing array data");
			return {
				labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
				datasets: [
					{
						label: "Monthly Revenue ($)",
						data: data,
						borderColor: "#2563eb",
						backgroundColor: "rgba(37, 99, 235, 0.1)",
						borderWidth: 3,
						tension: 0.4,
						fill: true,
					},
				],
			};
		}

		console.log("❌ Unknown data format:", typeof data);
		return null;
	};

	// جلب بيانات المستخدم من API
	const fetchUserData = async () => {
		try {
			const response = await getCrmUserData();

			// التحقق من استجابة API
			if (response.data) {
				setUser(response.data);
			} else {
				throw new Error("No user data received");
			}
		} catch (err: any) {
			console.error("Failed to fetch user data:", err);
		}
	};

	// جلب بيانات الرسوم البيانية من API
	const fetchChartData = async () => {
		try {
			console.log("🚀 Starting fetchChartData...");

			const [customersResponse, revenueResponse] = await Promise.all([
				getCustomerChartData(),
				getRevenueChartData(),
			]);

			console.log("🔍 Customer API response structure:", {
				success: customersResponse.data?.success,
				data: customersResponse.data?.data,
				fullResponse: customersResponse.data,
			});

			console.log("🔍 Revenue API response structure:", {
				success: revenueResponse.data?.success,
				data: revenueResponse.data?.data,
				fullResponse: revenueResponse.data,
			});

			// معالجة بيانات الزبائن
			let customersChartData: ChartData | null = null;
			if (customersResponse.data) {
				// تحقق من عدة بنى محتملة
				if (customersResponse.data.success && customersResponse.data.data) {
					customersChartData = transformCustomersData(
						customersResponse.data.data,
					);
				} else if (
					customersResponse.data.labels &&
					customersResponse.data.datasets
				) {
					// البيانات قد تكون مباشرة في response.data
					customersChartData = transformCustomersData(customersResponse.data);
				}
			}

			// معالجة بيانات الإيرادات
			let revenueChartData: ChartData | null = null;
			if (revenueResponse.data) {
				// تحقق من عدة بنى محتملة
				if (revenueResponse.data.success && revenueResponse.data.data) {
					revenueChartData = transformRevenueData(revenueResponse.data.data);
				} else if (revenueResponse.data.labels && revenueResponse.data.datasets) {
					// البيانات قد تكون مباشرة في response.data
					revenueChartData = transformRevenueData(revenueResponse.data);
				}
			}

			console.log("📊 Processed customers data:", customersChartData);
			console.log("📊 Processed revenue data:", revenueChartData);

			setChartData({
				customers: customersChartData,
				revenue: revenueChartData,
			});
		} catch (err: any) {
			console.error("❌ Failed to fetch chart data:", err);
			console.error("Error details:", {
				message: err.message,
				response: err.response?.data,
				status: err.response?.status,
			});
		}
	};

	// جلب إحصائيات CRM من API
	const fetchCRMStats = async () => {
		try {
			const response = await getCRMStats();
			console.log("🔍 CRM Stats API response:", response);

			// معالجة البنية المتداخلة
			if (response.success && response.stats) {
				// استخراج الإحصائيات من الكائن المتداخل
				setStats(response.stats);

				// إذا كان هناك chartData في الاستجابة، استخدمه
				if (response.chartData) {
					setChartData((prev) => ({
						customers: response.chartData?.customers
							? transformCustomersData(response.chartData.customers)
							: prev.customers,
						revenue: response.chartData?.revenue
							? transformRevenueData(response.chartData.revenue)
							: prev.revenue,
					}));
				}
			} else if (response.totalRevenue !== undefined) {
				// إذا كانت الإحصائيات مباشرة (بدون success wrapper)
				setStats(response);
			} else {
				throw new Error("Invalid stats data structure");
			}
		} catch (err: any) {
			console.error("Failed to fetch CRM stats:", err);
		}
	};

	// جلب جميع البيانات
	const fetchAllData = async () => {
		try {
			setLoading(true);
			setError(null);

			// جلب جميع البيانات في نفس الوقت
			await Promise.all([
				fetchUserData(),
				fetchCRMStats(), // هذا قد يجلب chartData أيضاً
				fetchChartData(), // جلب chartData بشكل منفصل
			]);
		} catch (err: any) {
			console.error("Failed to fetch all data:", err);
			setError(err.message || "Failed to load dashboard data");
		} finally {
			setLoading(false);
		}
	};

	// جلب البيانات عند تحميل المكون
	useEffect(() => {
		fetchAllData();
	}, []);

	const updateStats = (newStats: Partial<CRMStats>) => {
		setStats((prev) => (prev ? {...prev, ...newStats} : (newStats as CRMStats)));
	};

	const refreshAllData = async () => {
		await fetchAllData();
	};

	// const getMockStats = (): CRMStats => ({
	// 	totalRevenue: 135393,
	// 	totalCustomers: 0,
	// 	activeDeals: 142,
	// 	conversionRate: 32.5,
	// 	totalProducts: 40,
	// });

	// const getMockCustomerData = (): ChartData => ({
	// 	labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
	// 	datasets: [
	// 		{
	// 			label: "New Customers",
	// 			data: [120, 140, 180, 200, 240, 210, 260],
	// 			backgroundColor: "rgba(22, 163, 74, 0.7)",
	// 			borderColor: "#16a34a",
	// 			borderWidth: 1,
	// 			borderRadius: 4,
	// 		},
	// 	],
	// });

	// const getMockRevenueData = (): ChartData => ({
	// 	labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
	// 	datasets: [
	// 		{
	// 			label: "Monthly Revenue ($)",
	// 			data: [15000, 18000, 22000, 19000, 25000, 28000, 32000],
	// 			borderColor: "#2563eb",
	// 			backgroundColor: "rgba(37, 99, 235, 0.1)",
	// 			borderWidth: 3,
	// 			tension: 0.4,
	// 			fill: true,
	// 		},
	// 	],
	// });

	return (
		<CRMContext.Provider
			value={{
				user,
				stats,
				chartData,
				loading,
				error,
				updateStats,
				refreshAllData,
			}}
		>
			{children}
		</CRMContext.Provider>
	);
};
