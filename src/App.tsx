import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Products from "./components/pages/Products";
import i18n from "../locales/i18";
import {I18nextProvider} from "react-i18next";
import {AppBar, Box, IconButton, ThemeProvider, Toolbar} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import {useState} from "react";
import Users from "./components/pages/Users";
import Home from "./components/pages/Home";
import Navbar, {drawerWidth} from "./components/dashboard/Navbar";
import ShoppingCart from "./components/pages/ShoppingCart";
import {routes} from "./routes/AppRoutes";

const theme = createTheme({palette: {mode: "dark"}});

function App() {
	const [open, setOpen] = useState(false);

	const toggleDrawer = () => setOpen(!open);

	return (
		<I18nextProvider i18n={i18n}>
			<ThemeProvider theme={theme}>
				<Router>
					<Box sx={{display: "flex"}}>
						<Navbar open={open} />

						<Box
							component='main'
							sx={{
								flexGrow: 1,
								padding: "1rem",
								marginLeft: open ? 0 : -30,
								transition: "margin-left 0.2s",
							}}
						>
							{/* AppBar */}
							<AppBar
								position='fixed'
								sx={{
									width: open
										? `calc(100% - ${drawerWidth}px)`
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
								{routes.map((route) => (
									<Route path={route.path} element={route.element} />
								))}
							</Routes>
						</Box>
					</Box>
				</Router>
			</ThemeProvider>
		</I18nextProvider>
	);
}

export default App;
