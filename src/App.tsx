import "./App.css";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import i18n from "../locales/i18";
import {I18nextProvider} from "react-i18next";
import {
	AppBar,
	Box,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	ThemeProvider,
	Toolbar,
	Typography,
	useMediaQuery,
} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import {useState} from "react";
import Navbar, {drawerWidth} from "./components/dashboard/Navbar";
import {routes} from "./routes/AppRoutes";
import Footer from "./components/Footer";
import {useAuth} from "./context/UserContext";

const theme = createTheme({palette: {mode: "light"}});

function App() {
	const [open, setOpen] = useState(false);

	const toggleDrawer = () => setOpen(!open);
	const mobile = useMediaQuery(theme.breakpoints.down("sm"));
	const {user} = useAuth();

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
								marginLeft: open ? 0 : -10,
								transition: "margin-left 0.2s",
							}}
							className='table-responsive'
						>
							{/* AppBar */}
							<AppBar
								position='fixed'
								sx={{
									// backgroundColor: "#186EC9",
									width:
										open && mobile
											? `calc(100% - ${-180}px)`
											: `100%`,
									marginLeft: open ? `${240}px` : 0,
									transition: "width 0.3s, margin-left 0.2s",
								}}
							>
								<Toolbar
									sx={{
										display: "flex",
										justifyContent: "space-between",

										width:
											open && mobile
												? `calc(100% - ${drawerWidth - 180}px)`
												: "100%",
										marginRight: 0,
										transition: "width 0.3s, margin-left 0.2s",
									}}
								>
									<IconButton
										color='inherit'
										onClick={toggleDrawer}
										edge='start'
										sx={{
											marginLeft: open ? 240 + "px" : 0 + "px",
											transition: "width 0.3s, margin-left 0.2s",
										}}
									>
										<MenuIcon />
									</IconButton>
									<IconButton color='inherit'>
										<LanguageIcon />
									</IconButton>
									<Typography
										component={"h5"}
										sx={{
											transition: "all .2s ease",
											"&:hover": {
												transform: "scale(1.1)",
											},
											backgroundColor: "transparent",
										}}
										className='text-capitalize'
									>
										{user && (
											<Link
												to={`/profile/me`}
												style={{color: "inherit"}}
											>
												welcome, {user.profile.firstName}
											</Link>
										)}
									</Typography>
									{!user && (
										<List>
											<ListItem key={"Login"} disablePadding>
												<ListItemButton
													component={Link}
													to={"/login"}
													selected={
														location.pathname === "/login"
													}
												>
													<ListItemText
														sx={{color: "white"}}
														primary={"Login"}
													/>
												</ListItemButton>
											</ListItem>
										</List>
									)}
								</Toolbar>
							</AppBar>

							{/* Spacer for AppBar */}
							<Toolbar />

							{/* Routes */}
							<Routes>
								{routes.map((route, index) => (
									<Route
										key={index}
										path={route.path}
										element={route.element}
									/>
								))}
							</Routes>
						</Box>
					</Box>
					<Footer open={open} />
				</Router>
			</ThemeProvider>
		</I18nextProvider>
	);
}

export default App;
