import React, {createContext, useState, type ReactNode} from "react";

interface User {
	id: string;
	name: string;
	email: string;
	role: string;
	avatar?: string;
}

interface CRMStats {
	totalRevenue: number;
	totalCustomers: number;
	activeDeals: number;
	conversionRate: number;
}

interface CRMContextType {
	user: User;
	stats: CRMStats;
	updateStats: (newStats: Partial<CRMStats>) => void;
}

const defaultUser: User = {
	id: "1",
	name: "John Doe",
	email: "john@example.com",
	role: "Sales Manager",
};

const defaultStats: CRMStats = {
	totalRevenue: 1542000,
	totalCustomers: 2456,
	activeDeals: 142,
	conversionRate: 32.5,
};

export const CRMContext = createContext<CRMContextType>({
	user: defaultUser,
	stats: defaultStats,
	updateStats: () => {},
});

interface CRMProviderProps {
	children: ReactNode;
}

export const CRMProvider: React.FC<CRMProviderProps> = ({children}) => {
	const [user] = useState<User>(defaultUser);
	const [stats, setStats] = useState<CRMStats>(defaultStats);

	const updateStats = (newStats: Partial<CRMStats>) => {
		setStats((prev) => ({...prev, ...newStats}));
	};

	return (
		<CRMContext.Provider value={{user, stats, updateStats}}>
			{children}
		</CRMContext.Provider>
	);
};
