
import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import {navigation} from "../../navigation/dashboardNavigate";

export const drawerWidth = 240;

function Navbar({open}: {open: boolean}) {
	const location = useLocation();
	const theme = useTheme();
	const mobile = useMediaQuery(theme.breakpoints.down("sm"));
	const drawerWidth = mobile ? 60 : 240;

	return (
		<Drawer
			variant='persistent'
			open={open}
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
					paddingTop: "1rem",
					background:
						"linear-gradient(to bottom, #06213d 0%, #3a6ea5 50%, #ffffff 100%)",
				},
			}}
		>
			<Box sx={{px: 2, mb: 2}}>
				{mobile ? "" : <Typography variant='h6'>CRM Dashboard</Typography>}
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
