import {Box, Card} from "@mui/material";
import {FiActivity, FiDollarSign, FiTrendingUp, FiUsers} from "react-icons/fi";
import {useCRM} from "../hooks/useCrm";
import type { FunctionComponent } from "react";

interface StatCardsProps {}

export const StatCards: FunctionComponent<StatCardsProps> = () => {
	const {stats} = useCRM();

	const cards = [
		{
			title: "Total Revenue",
			value: `$${stats.totalRevenue.toLocaleString()}`,
			icon: <FiDollarSign />,
		},
		{title: "Customers", value: stats.totalCustomers, icon: <FiUsers />},
		{title: "Active Deals", value: stats.activeDeals, icon: <FiTrendingUp />},
		{title: "Conversion", value: `${stats.conversionRate}%`, icon: <FiActivity />},
	];

	return (
		<Box
			display='grid'
			gridTemplateColumns={{xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(4,1fr)"}}
			gap={3}
		>
			{cards.map((card, index) => (
				<Card key={index} {...card} />
			))}
		</Box>
	);
};
