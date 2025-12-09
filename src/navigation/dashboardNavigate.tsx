import DashboardIcon from "@mui/icons-material/Dashboard";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import {People, ProductionQuantityLimitsSharp} from "@mui/icons-material";

export const navigation = [
	{
		segment: "Dashboard",
		title: "Dashboard",
		icon: <DashboardIcon />,
		path: "/",
	},
	{
		segment: "products",
		title: "products",
		icon: <ProductionQuantityLimitsSharp />,
		path: "/products",
	},
	{segment: "users", title: "users", icon: <People />, path: "/users"},
	{
		segment: "Shopping Carts",
		title: "Shopping Carts",
		icon: <ShoppingCartIcon />,
		path: "/shopping-carts",
	},
];
