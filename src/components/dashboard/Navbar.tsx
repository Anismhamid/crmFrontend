// import {useState, type FunctionComponent} from "react";
// import Box from "@mui/material/Box";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import {createTheme, ThemeProvider} from "@mui/material/styles";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import MenuIcon from "@mui/icons-material/Menu";
// import LanguageIcon from "@mui/icons-material/Language";
// import {BrowserRouter as Router, Link} from "react-router-dom";
// // import { useTranslation } from "react-i18next";

import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import {navigation} from "../../navigation/dashboardNavigate";

export const drawerWidth = 240;

function Navbar({open}: {open: boolean}) {
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

export default Navbar;
