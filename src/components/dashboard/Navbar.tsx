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
import {useAuth} from "../../context/UserContext";
import {AppRegistration, Dashboard, Login, Logout, Person} from "@mui/icons-material";

export const drawerWidth = 240;

function Navbar({open}: {open: boolean}) {
	const location = useLocation();
	const theme = useTheme();
	const mobile = useMediaQuery(theme.breakpoints.down("sm"));
	const drawerWidth = mobile ? 60 : 240;
	const {user, token, logout} = useAuth();

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
					background: "linear-gradient(to bottom, rgb(23, 111, 204), #ffffff)",
					color: "white",
				},
			}}
		>
			<Box sx={{px: 2, mb: 2}}>
				{mobile ? "" : <Typography variant='h6'>CRM Dashboard</Typography>}
			</Box>
			<List>
				<>
					{user && (
						<>
							<ListItem key={"Profile"} disablePadding>
								<ListItemButton
									component={Link}
									to={"/profile/me"}
									selected={location.pathname === "profile"} // تمييز الصفحة الحالية
								>
									<ListItemIcon sx={{color: "whitesmoke"}}>
										<Person />
									</ListItemIcon>
									<ListItemText
										sx={{color: "white"}}
										primary={"Profile"}
									/>
								</ListItemButton>
							</ListItem>
							<ListItem key={"Dashboard"} disablePadding>
								<ListItemButton
									component={Link}
									to={"/"}
									selected={location.pathname === "/"}
								>
									<ListItemIcon sx={{color: "whitesmoke"}}>
										<Dashboard />
									</ListItemIcon>
									<ListItemText
										sx={{color: "white"}}
										primary={"Dashboard"}
									/>
								</ListItemButton>
							</ListItem>
							<ListItem key={"users"} disablePadding>
								<ListItemButton
									component={Link}
									to={"/users"}
									selected={location.pathname === "/users"}
								>
									<ListItemIcon sx={{color: "whitesmoke"}}>
										<Person />
									</ListItemIcon>
									<ListItemText
										sx={{color: "white"}}
										primary={"Users management"}
									/>
								</ListItemButton>
							</ListItem>
						</>
					)}
					{navigation.map((item, index) => (
						<ListItem key={index} disablePadding>
							<ListItemButton
								component={Link}
								to={item.path}
								selected={location.pathname === item.path}
							>
								<ListItemIcon sx={{color: "whitesmoke"}}>
									{item.icon}
								</ListItemIcon>
								<ListItemText
									sx={{color: "white"}}
									primary={item.title}
								/>
							</ListItemButton>
						</ListItem>
					))}
					{!token ? (
						<>
							<ListItem key={"Register"} disablePadding>
								<ListItemButton
									component={Link}
									to={"/register"}
									selected={location.pathname === "/register"}
								>
									<ListItemIcon sx={{color: "whitesmoke"}}>
										<AppRegistration />
									</ListItemIcon>
									<ListItemText
										sx={{color: "white"}}
										primary={"Register"}
									/>
								</ListItemButton>
							</ListItem>
							<ListItem key={"Login"} disablePadding>
								<ListItemButton
									component={Link}
									to={"/login"}
									selected={location.pathname === "/login"}
								>
									<ListItemIcon sx={{color: "whitesmoke"}}>
										<Login />
									</ListItemIcon>
									<ListItemText
										sx={{color: "white"}}
										primary={"Login"}
									/>
								</ListItemButton>
							</ListItem>
						</>
					) : (
						<ListItem
							onClick={() => {
								logout();
							}}
							key={"Logout"}
							disablePadding
						>
							<ListItemButton
								component={Link}
								to={"/"}
								selected={location.pathname === "/"}
							>
								<ListItemIcon>
									<Logout sx={{color: "white"}} />
								</ListItemIcon>
								<ListItemText primary={"LogOut"} />
							</ListItemButton>
						</ListItem>
					)}
				</>
			</List>
			{/* <Filters onChange={() => {}} /> */}
		</Drawer>
	);
}

export default Navbar;
