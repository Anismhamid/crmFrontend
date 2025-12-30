import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import ProductPage from "../components/pages/ProductPage";
import Products from "../components/pages/Products";
import ProductsCategoryPage from "../components/pages/ProductsCategoryPage";
import Profile from "../components/pages/Profile";
import Register from "../components/pages/Register";
import ShoppingCart from "../components/pages/ShoppingCart";
import UsersManager from "../components/pages/UsersManager";

export const routes = [
	{name: "Dashboard", path: "/", element: <Home />},
	{name: "Products", path: "/products", element: <Products />},
	// {name: "Users", path: "/users", element: <Users />},
	{name: "Shopping carts", path: "/shopping-carts", element: <ShoppingCart />},
	{name: "Product page", path: "/products/:id", element: <ProductPage />},
	{name: "Login", path: "/login", element: <Login />},
	{name: "Register", path: "/register", element: <Register />},
	{name: "Profile", path: "/profile/me", element: <Profile />},
	{name: "Users manager", path: "/users", element: <UsersManager />},
	{
		name: "products category",
		path: "/products/category/:category",
		element: <ProductsCategoryPage />,
	},
];
