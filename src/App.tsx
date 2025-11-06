import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useLocation,
} from "react-router-dom";
import Products from "./components/pages/Products";
import i18n from "../locales/i18";
import {I18nextProvider} from "react-i18next";
import {
	AppBar,
	Box,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ThemeProvider,
	Toolbar,
	Typography,
} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import {useState} from "react";
import Users from "./components/pages/Users";
import {People, ProductionQuantityLimitsSharp} from "@mui/icons-material";
import Home from "./components/pages/Home";

const drawerWidth = 240;

const navigation = [
	{
		segment: "Home",
		title: "Home",
		icon: <DashboardIcon />,
		path: "/home",
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
		path: "/ShoppingCarts",
	},
];

const theme = createTheme({palette: {mode: "light"}});

function Sidebar({open}: {open: boolean}) {
	const location = useLocation();

	return (
		<Drawer
			variant='persistent'
			open={open}
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
					boxSizing: "border-box",
					paddingTop: "1rem",
				},
			}}
		>
			<Box sx={{px: 2, mb: 2}}>
				<Typography variant='h6'>CRM Dashboard</Typography>
			</Box>
			<List>
				{navigation.map((item) => (
					<ListItem key={item.segment} disablePadding>
						<ListItemButton
							component={Link}
							to={item.path}
							selected={location.pathname === item.path} // تمييز الصفحة الحالية
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.title} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	);
}

function App() {
	const [open, setOpen] = useState(true);

	const toggleDrawer = () => setOpen(!open);

	return (
		<I18nextProvider i18n={i18n}>
			<ThemeProvider theme={theme}>
				<Router>
					<Box sx={{display: "flex"}}>
						<Sidebar open={open} />

						<Box
							component='main'
							sx={{
								flexGrow: 1,
								padding: "1rem",
								marginLeft: open ? `${drawerWidth}px` : -30,
								transition: "margin-left 0.2s",
							}}
						>
							{/* AppBar */}
							<AppBar
								position='fixed'
								sx={{
									width: open
										? `calc(100% - ${drawerWidth - 20}px)`
										: "100%",
									marginLeft: open ? `${drawerWidth}px` : 0,
									transition: "width 0.3s, margin-left 0.2s",
								}}
							>
								<Toolbar
									sx={{
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<IconButton
										color='inherit'
										onClick={toggleDrawer}
										edge='start'
									>
										<MenuIcon />
									</IconButton>
									<IconButton color='inherit'>
										<LanguageIcon />
									</IconButton>
								</Toolbar>
							</AppBar>

							{/* Spacer for AppBar */}
							<Toolbar />

							{/* Routes */}
							<Routes>
								<Route path='/home' element={<Home />} />
								<Route path='/products' element={<Products />} />
								<Route path='/users' element={<Users />} />
								<Route path='/ShoppingCarts' element={<Users />} />
							</Routes>
						</Box>
					</Box>
				</Router>
			</ThemeProvider>
		</I18nextProvider>
	);
}

export default App;
