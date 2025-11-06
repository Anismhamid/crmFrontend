import React, {useState, type FunctionComponent} from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { useTranslation } from "react-i18next";


const navigation = [
	{segment: "dashboard", title: "Dashboard", icon: <DashboardIcon />, path: "/"},
	{segment: "orders", title: "Orders", icon: <ShoppingCartIcon />, path: "/products"},
];

const theme = createTheme({
	palette: {mode: "light"},
});

interface NavbarProps {}

const drawerWidth = 240;

const Navbar: FunctionComponent<NavbarProps> = () => {
	const {t} = useTranslation();
	const [open, setOpen] = useState(true);

	const toggleDrawer = () => setOpen(!open);

	const navLinks = [
		{label: t("home")},
		{label: t("dashboard")},
		{label: t("orders")},
		{label: t("settings")},
		{label: t("logout")},
	];

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Box sx={{display: "flex"}}>
					{/* Sidebar Drawer */}
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
						<Box
							sx={{display: "flex", justifyContent: "space-between", px: 2}}
						>
							<Typography variant='h6'>My Dashboard</Typography>
							<IconButton onClick={toggleDrawer}>
								<MenuIcon />
							</IconButton>
						</Box>
						<List>
							{navigation.map((item) => (
								<ListItem key={item.segment} disablePadding>
									<ListItemButton component={Link} to={item.path}>
										<ListItemIcon>{item.icon}</ListItemIcon>
										<ListItemText primary={item.title} />
									</ListItemButton>
								</ListItem>
							))}
						</List>
					</Drawer>

					{/* Main Content */}
					<Box
						component='main'
						sx={{
							flexGrow: 1,
							padding: "1rem",
							marginLeft: open ? `${drawerWidth}px` : 0,
							transition: "margin-left 0.3s",
						}}
					>
						<AppBar
							position='fixed'
							sx={{
								width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
								marginLeft: open ? `${drawerWidth}px` : 0,
								transition: "width 0.3s, margin-left 0.3s",
							}}
						>
							<Toolbar sx={{display: "flex", justifyContent: "flex-end"}}>
								<IconButton color='inherit'>
									<LanguageIcon />
								</IconButton>
							</Toolbar>
						</AppBar>

						{/* Spacer for AppBar */}
						<Toolbar />

					
					</Box>
				</Box>
			</Router>
		</ThemeProvider>
	);
};

export default Navbar;
