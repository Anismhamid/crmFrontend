import {
	Box,
	Paper,
	Typography,
	Avatar,
	CircularProgress,
	Grid,
	Chip,
	Divider,
	List,
	Card,
	CardContent,
	Stack,
	alpha,
} from "@mui/material";
import {
	Person,
	Email,
	Phone,
	LocationOn,
	Work,
	CalendarToday,
	CheckCircle,
	Cancel,
} from "@mui/icons-material";
import {useEffect, useState, type FunctionComponent} from "react";
import {getMyProfile} from "../../services/users";
import type {User} from "../../interfaces/Users";
import {formatDate, getRoleColor} from "../../assets/helpets";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getMyProfile()
			.then(setUser)
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return (
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				minHeight='60vh'
			>
				<CircularProgress />
			</Box>
		);
	}

	if (!user) {
		return (
			<Box textAlign='center' py={10}>
				<Typography variant='h6' color='textSecondary'>
					No user data was found
				</Typography>
			</Box>
		);
	}

	const {profile, email, lastLogin} = user;

	return (
		<Box sx={{maxWidth: 1200, mx: "auto", p: {xs: 2, md: 3}}}>
			<Typography variant='h4' gutterBottom sx={{mb: 4, fontWeight: 600}}>
				Profile
			</Typography>

			<Grid container spacing={3}>
				{/* الجزء الأيسر - معلومات أساسية */}
				<Grid size={{xs: 12, md: 4}}>
					<Paper
						sx={{
							p: 3,
							borderRadius: 2,
							transition: "all .2s ease",
							"&:hover": {
								transform: "translateY(-2px)",
								boxShadow: 3,
							},
						}}
						elevation={3}
					>
						<Box position='relative'>
							<Avatar
								src={profile.avatar?.url}
								alt={profile.avatar?.alt || profile.firstName}
								sx={{
									transition: "all .2s ease",
									"&:hover": {
										transform: " scale(1.2)",
										boxShadow: 3,
									},
									width: 140,
									height: 140,
									fontSize: "2.5rem",
									mb: 2,
									border: (theme) =>
										`4px solid ${alpha(
											theme.palette.primary.main,
											0.1,
										)}`,
								}}
							>
								{profile.firstName[0]}
								{profile.lastName[0]}
							</Avatar>
							<Box
								sx={{
									position: "absolute",
									bottom: 6,
									right: 6,
									width: 14,
									height: 14,
									bgcolor: profile.isActive
										? "success.main"
										: "error.main",
									borderRadius: "50%",
									border: "2px solid white",
								}}
							/>
							<Typography variant='h5' gutterBottom>
								{profile.firstName} {profile.lastName}
							</Typography>

							<Stack direction='row' spacing={1} sx={{mb: 1}}>
								<Chip
									label={profile.role}
									color={getRoleColor(profile.role)}
									size='small'
									variant='outlined'
								/>
								<Chip
									icon={profile.isActive ? <CheckCircle /> : <Cancel />}
									label={profile.isActive ? "Active" : "Inactive"}
									color={profile.isActive ? "success" : "error"}
									size='small'
									variant='outlined'
								/>
							</Stack>
						</Box>

						<Divider sx={{my: 2}} />

						<List dense>
							<Paper
								sx={{
									mb: 1,
									p: 1.5,
									display: "flex",
									gap: 1,
									transition: "all .2s ease",
									"&:hover": {
										transform: "translateY(-2px)",
										boxShadow: 3,
									},
								}}
							>
								<Email fontSize='small' />
								<Box>
									<Typography variant='caption'>Email</Typography>
									<Typography variant='body2'>{email}</Typography>
								</Box>
							</Paper>
							{profile.phone && (
								<Paper
									sx={{
										transition: "all .2s ease",
										"&:hover": {
											transform: "translateY(-2px)",
											boxShadow: 3,
										},
										p: 1.5,
										display: "flex",
										gap: 1,
									}}
								>
									<Phone fontSize='small' />
									<Box>
										<Typography variant='caption'>Phone</Typography>
										<Typography variant='body2'>
											{profile.phone}
										</Typography>
									</Box>
								</Paper>
							)}

							{profile.position && (
								<Paper
									sx={{
										transition: "all .2s ease",
										"&:hover": {
											transform: "translateY(-2px)",
											boxShadow: 3,
										},
										mt: 1,
										p: 1.5,
										display: "flex",
										gap: 1,
									}}
								>
									<Work fontSize='small' />
									<Box>
										<Typography variant='caption'>
											Position
										</Typography>
										<Typography variant='body2'>
											{profile.position}
										</Typography>
									</Box>
								</Paper>
							)}
							<Paper
								sx={{
									transition: "all .2s ease",
									"&:hover": {
										transform: "translateY(-2px)",
										boxShadow: 3,
									},
									mt: 1,
									p: 1.5,
									display: "flex",
									gap: 1,
								}}
							>
								<CalendarToday fontSize='small' />
								<Box>
									<Typography variant='caption'>Last login</Typography>
									<Typography variant='body2'>
										{formatDate(lastLogin)}
									</Typography>
								</Box>
							</Paper>
						</List>
					</Paper>
				</Grid>

				{/* الجزء الأيمن - تفاصيل إضافية */}
				<Grid size={{xs: 12, md: 8}}>
					<Grid container spacing={3}>
						{/* معلومات العنوان */}
						{profile.address && (
							<Grid
								size={{xs: 12}}
								sx={{
									borderLeft: "2px solid",
									borderColor: "divider",
									pl: 2,
								}}
							>
								<Card
									sx={{
										transition: "all .2s ease",
										"&:hover": {
											transform: "translateY(-2px)",
											boxShadow: 3,
										},
										borderRadius: 2,
									}}
									elevation={1}
								>
									<CardContent>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												mb: 2,
											}}
										>
											<LocationOn color='primary' sx={{mr: 1}} />
											<Typography variant='h6'>
												Address info
											</Typography>
										</Box>

										<Grid container spacing={2}>
											{profile.address.city && (
												<Grid size={{xs: 12, sm: 6}}>
													<Typography
														variant='body2'
														color='textSecondary'
														gutterBottom
													>
														City
													</Typography>
													<Typography variant='body1'>
														{profile.address.city}
													</Typography>
												</Grid>
											)}

											{profile.address.street && (
												<Grid size={{xs: 12, sm: 6}}>
													<Typography
														variant='body2'
														color='textSecondary'
														gutterBottom
													>
														Street
													</Typography>
													<Typography variant='body1'>
														{profile.address.street}
													</Typography>
												</Grid>
											)}

											{profile.address.houseNo && (
												<Grid size={{xs: 12, sm: 6}}>
													<Typography
														variant='body2'
														color='textSecondary'
														gutterBottom
													>
														House number
													</Typography>
													<Typography variant='body1'>
														{profile.address.houseNo}
													</Typography>
												</Grid>
											)}

											{profile.address.zipCode && (
												<Grid size={{xs: 12, sm: 6}}>
													<Typography
														variant='body2'
														color='textSecondary'
														gutterBottom
													>
														Zip code
													</Typography>
													<Typography variant='body1'>
														{profile.address.zipCode}
													</Typography>
												</Grid>
											)}
										</Grid>
									</CardContent>
								</Card>
							</Grid>
						)}

						{/* معلومات الحساب */}
						<Grid
							sx={{
								borderLeft: "2px solid",
								borderColor: "divider",
								pl: 2,
							}}
							size={{xs: 12}}
						>
							<Card
								sx={{
									transition: "all .2s ease",
									"&:hover": {
										transform: "translateY(-2px)",
										boxShadow: 3,
									},
									borderRadius: 2,
								}}
								elevation={3}
							>
								<CardContent>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											mb: 2,
										}}
									>
										<Person color='primary' sx={{mr: 1}} />
										<Typography variant='h6'>Account info</Typography>
									</Box>

									<Grid container spacing={2}>
										<Grid size={{xs: 12, sm: 6}}>
											<Typography
												variant='body2'
												color='textSecondary'
												gutterBottom
											>
												User id
											</Typography>
											<Typography
												variant='body1'
												sx={{fontFamily: "monospace"}}
											>
												{user._id}
											</Typography>
										</Grid>

										<Grid size={{xs: 12, sm: 6}}>
											<Typography
												variant='body2'
												color='textSecondary'
												gutterBottom
											>
												Role
											</Typography>
											<Box>
												<Chip
													label={profile.role}
													color={getRoleColor(profile.role)}
													size='small'
												/>
											</Box>
										</Grid>

										<Grid size={{xs: 12, sm: 6}}>
											<Typography
												variant='body2'
												color='textSecondary'
												gutterBottom
											>
												Account status
											</Typography>
											<Box>
												<Chip
													icon={
														profile.isActive ? (
															<CheckCircle />
														) : (
															<Cancel />
														)
													}
													label={
														profile.isActive
															? "Active"
															: "Inactive"
													}
													color={
														profile.isActive
															? "success"
															: "error"
													}
													size='small'
												/>
											</Box>
										</Grid>

										<Grid size={{xs: 12, sm: 6}}>
											<Typography
												variant='body2'
												color='textSecondary'
												gutterBottom
											>
												Last login
											</Typography>
											<Typography
												variant='body1'
												dir='rtl'
												sx={{textAlign: "center"}}
											>
												{formatDate(lastLogin)}
											</Typography>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Profile;
