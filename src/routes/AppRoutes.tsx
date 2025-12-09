import Home from "../components/pages/Home";
import ProductPage from "../components/pages/ProductPage";
import Products from "../components/pages/Products";
import ProductsCategoryPage from "../components/pages/ProductsCategoryPage";
import ShoppingCart from "../components/pages/ShoppingCart";
import Users from "../components/pages/Users";

export const routes = [
	{name: "Dashboard", path: "/", element: <Home />},
	{name: "products", path: "/products", element: <Products />},
	{name: "users", path: "/users", element: <Users />},
	{name: "shopping carts", path: "/shopping-carts", element: <ShoppingCart />},
	{name: "product page", path: "/products/:id", element: <ProductPage />},
	{
		name: "products category",
		path: "/products/category/:category",
		element: <ProductsCategoryPage />,
	},
];
