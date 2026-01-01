import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import {ProductionQuantityLimitsSharp} from "@mui/icons-material";

export const navigation = [
	{
		segment: "products",
		title: "Products",
		icon: <ProductionQuantityLimitsSharp />,
		path: "/products",
	},
	{
		segment: "Shopping Carts",
		title: "Shopping Carts",
		icon: <ShoppingCartIcon />,
		path: "/shopping-carts",
	},
];
