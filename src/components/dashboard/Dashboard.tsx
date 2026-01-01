import {useEffect, useMemo, type FunctionComponent} from "react";
import {
	FiUsers,
	FiDollarSign,
	FiTrendingUp,
	FiActivity,
	FiRefreshCw,
} from "react-icons/fi";
import {Line, Bar} from "react-chartjs-2";
import {
	Alert,
	Box,
	CircularProgress,
	Typography,
	Button,
	IconButton,
	Tooltip as MuiTooltip,
} from "@mui/material";
import {useCRM} from "../hooks/useCrm";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/UserContext";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	Filler,
);

interface DashboardProps {}

const Dashboard: FunctionComponent<DashboardProps> = () => {
	const {stats: rawStats, chartData, loading, refreshAllData} = useCRM();
	const navigate = useNavigate();
	const {user} = useAuth();

	// Normalize stats structure
	const stats = useMemo(() => {
		if (!rawStats) return null;

		// Check if stats has nested stats object
		if (rawStats && typeof rawStats === "object") {
			return rawStats;
		}

		// Otherwise return as-is
		return rawStats;
	}, [rawStats]);

	// Extract stat values with fallbacks
	const statValues = useMemo(() => {
		if (!stats) {
			return {
				totalRevenue: 0,
				totalCustomers: 0,
				activeDeals: 0,
				conversionRate: 0,
			};
		}

		return {
			totalRevenue: stats.totalRevenue || 0,
			totalCustomers: stats.totalCustomers || 0,
			activeDeals: stats.activeDeals || 0,
			conversionRate: stats?.conversionRate || 0,
		};
	}, [stats]);

	const statCards = [
		{
			title: "Total Revenue",
			value: `₪ ${statValues.totalRevenue.toLocaleString()}`,
			icon: <FiDollarSign size={28} />,
			color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
			description: "Total revenue from all completed deals",
		},
		{
			title: "Total Customers",
			value: statValues.totalCustomers,
			icon: <FiUsers size={28} />,
			color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
			description: "Total registered customers",
		},
		{
			title: "Active Deals",
			value: statValues.activeDeals,
			icon: <FiTrendingUp size={28} />,
			color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
			description: "Currently active deals in pipeline",
		},
		{
			title: "Conversion Rate",
			value: `${statValues.conversionRate}%`,
			icon: <FiActivity size={28} />,
			color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
			description: "Lead to customer conversion rate",
		},
	];

	// Transform chart data to proper structure
	const lineChartData = useMemo(() => {
		// Check if we have revenue data in the correct structure
		if (chartData?.revenue?.datasets) {
			return chartData.revenue;
		}

		// Fallback to mock data
		return {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
			datasets: [
				{
					label: "Monthly Revenue ₪",
					data: [15000, 18000, 22000, 19000, 25000, 28000, 32000],
					borderColor: "#2563eb",
					backgroundColor: "rgba(37, 99, 235, 0.1)",
					borderWidth: 3,
					tension: 0.4,
					fill: true,
				},
			],
		};
	}, [chartData]);

	const barChartData = useMemo(() => {
		// If customers is an array (incorrect structure from backend)
		if (Array.isArray(chartData?.customers)) {
			// Create monthly data from the array
			const monthlyData = Array(12).fill(0); // Initialize with 12 months of zeros

			// Fill in the data we have
			chartData.customers.forEach((item: any) => {
				if (item._id?.month && item.count) {
					// Convert month from 1-12 to array index 0-11
					const monthIndex = item._id.month - 1;
					if (monthIndex >= 0 && monthIndex < 12) {
						monthlyData[monthIndex] = item.count;
					}
				}
			});

			// Take only the last 7 months for display
			const last7Months = monthlyData.slice(-7);

			return {
				labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				datasets: [
					{
						label: "New Customers",
						data: last7Months,
						backgroundColor: "rgba(22, 163, 74, 0.7)",
						borderColor: "#16a34a",
						borderWidth: 1,
						borderRadius: 4,
					},
				],
			};
		}

		// If customers is already in correct chart.js structure
		if (chartData?.customers?.datasets) {
			return chartData.customers;
		}

		// Fallback to mock data
		return {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
			datasets: [
				{
					label: "New Customers",
					data: [120, 140, 180, 200, 240, 210, 260],
					backgroundColor: "rgba(22, 163, 74, 0.7)",
					borderColor: "#16a34a",
					borderWidth: 1,
					borderRadius: 4,
				},
			],
		};
	}, [chartData]);

	// Chart options (same as before)
	const lineOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top" as const,
				labels: {
					font: {
						size: 12,
						family: "'Inter', sans-serif",
					},
					padding: 20,
				},
			},
			tooltip: {
				backgroundColor: "rgba(0, 0, 0, 0.8)",
				titleFont: {size: 12},
				bodyFont: {size: 14},
				padding: 12,
				cornerRadius: 6,
				callbacks: {
					label: (context: any) => {
						return `₪ ${context.raw.toLocaleString("he-IL")}`;
					},
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				grid: {
					display: true,
					drawBorder: false,
					color: "rgba(0, 0, 0, 0.05)",
				},
				ticks: {
					font: {size: 11},
					callback: (value: any) => `₪ ${value.toLocaleString()}`,
				},
			},
			x: {
				grid: {
					display: false,
				},
				ticks: {
					font: {size: 11},
				},
			},
		},
		interaction: {
			intersect: false,
			mode: "index" as const,
		},
	};

	const barOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top" as const,
				labels: {
					font: {
						size: 12,
						family: "'Inter', sans-serif",
					},
					padding: 20,
				},
			},
			tooltip: {
				backgroundColor: "rgba(0, 0, 0, 0.8)",
				titleFont: {size: 12},
				bodyFont: {size: 14},
				padding: 12,
				cornerRadius: 6,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				grid: {
					display: true,
					drawBorder: false,
					color: "rgba(0, 0, 0, 0.05)",
				},
				ticks: {
					font: {size: 11},
					stepSize: 50,
				},
			},
			x: {
				grid: {
					display: false,
				},
				ticks: {
					font: {size: 11},
				},
			},
		},
	};

	// Loading state
	if (loading) {
		return (
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				minHeight='80vh'
				flexDirection='column'
				gap={3}
			>
				<CircularProgress size={60} thickness={4} />
				<Box textAlign='center'>
					<Typography variant='h6' sx={{color: "text.secondary", mb: 1}}>
						Loading dashboard data...
					</Typography>
					<Typography variant='body2' sx={{color: "text.disabled"}}>
						Fetching your latest statistics and charts
					</Typography>
				</Box>
			</Box>
		);
	}

	// No user data
	if (!user) {
		return (
			<Box sx={{p: 3, maxWidth: 600, mx: "auto", mt: 4}}>
				<Alert severity='warning' sx={{mb: 2}}>
					<Typography fontWeight='medium'>No user data available</Typography>
				</Alert>
				<Button
					variant='contained'
					onClick={refreshAllData}
					startIcon={<FiRefreshCw />}
				>
					Try to load data
				</Button>
			</Box>
		);
	}

	// No stats data
	if (!stats) {
		return (
			<Box sx={{p: 3, maxWidth: 600, mx: "auto", mt: 4}}>
				<Alert severity='warning' sx={{mb: 2}}>
					<Typography fontWeight='medium'>
						No dashboard data available
					</Typography>
					<Typography variant='body2' sx={{mt: 0.5}}>
						Unable to load statistics. Please try refreshing.
					</Typography>
				</Alert>
				<Button
					variant='contained'
					onClick={refreshAllData}
					startIcon={<FiRefreshCw />}
				>
					Refresh Data
				</Button>
			</Box>
		);
	}

	return (
		<Box sx={{p: {xs: 2, sm: 3, md: 4}}}>
			{/* Header with user info */}
			<Box sx={{mb: 4}}>
				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='flex-start'
					flexWrap='wrap'
					gap={2}
				>
					<Box>
						<Typography
							variant='h5'
							component='h1'
							fontWeight='bold'
							gutterBottom
						>
							CRM System - Dashboard
						</Typography>
						<Typography variant='body2' color='text.secondary'>
							Welcome back,{" "}
							<Box
								sx={{
									cursor: "pointer",
									display: "inline-block",
									transition: "all 0.2s ease",
									"&:hover": {
										color: "primary.dark",
										transform: "translateY(-1px)",
										textDecoration: "underline",
									},
								}}
								onClick={() => navigate("/profile/me")}
								component='span'
								fontWeight='medium'
								color='primary.main'
							>
								{user.profile?.firstName} {user.profile?.lastName}
							</Box>
						</Typography>
					</Box>
					<MuiTooltip title='Refresh all data'>
						<IconButton
							onClick={refreshAllData}
							sx={{
								bgcolor: "primary.main",
								color: "white",
								"&:hover": {
									bgcolor: "primary.dark",
								},
							}}
						>
							<FiRefreshCw />
						</IconButton>
					</MuiTooltip>
				</Box>
			</Box>

			{/* Stats Cards */}
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: {
						xs: "1fr",
						sm: "repeat(4, 1fr)",
						md: "repeat(2, 1fr)",
					},
					gap: 3,
					mb: 4,
				}}
			>
				{statCards.map((stat, index) => (
					<MuiTooltip
						key={index}
						title={stat.description}
						arrow
						placement='top'
					>
						<Box
							sx={{
								bgcolor: "background.paper",
								borderRadius: 3,
								boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
								p: 3,
								display: "flex",
								justifyContent: "space-between",
								alignItems: "flex-start",
								transition: "all 0.3s ease",
								position: "relative",
								overflow: "hidden",
								"&:hover": {
									transform: "translateY(-6px)",
									boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
								},
								"&::before": {
									content: '""',
									position: "absolute",
									top: 0,
									left: 0,
									right: 0,
									height: "4px",
									background: stat.color,
								},
							}}
						>
							<Box sx={{flex: 1}}>
								<Typography
									variant='caption'
									color='text.secondary'
									fontWeight='medium'
									display='block'
									gutterBottom
								>
									{stat.title}
								</Typography>
								<Typography variant='h4' fontWeight='bold' sx={{mb: 0.5}}>
									{stat.value}
								</Typography>
							</Box>
							<Box
								sx={{
									background: stat.color,
									borderRadius: "50%",
									width: 48,
									height: 48,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									ml: 2,
									flexShrink: 0,
								}}
							>
								<Box sx={{color: "white"}}>{stat.icon}</Box>
							</Box>
						</Box>
					</MuiTooltip>
				))}
			</Box>

			{/* Charts */}
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: {
						xs: "1fr",
						sm: "repeat(2, 1fr)",
						md: "repeat(4, 1fr)",
					},
					gap: 3,
					mb: 4,
				}}
			>
				{/* Line Chart */}
				<Box
					sx={{
						bgcolor: "background.paper",
						borderRadius: 3,
						boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
						p: 3,
					}}
				>
					<Box
						display='flex'
						justifyContent='space-between'
						alignItems='center'
						mb={3}
					>
						<Typography variant='h6' fontWeight='600'>
							Revenue Overview
						</Typography>
						<Typography variant='caption' color='text.secondary'>
							Last 7 months
						</Typography>
					</Box>
					<Box sx={{height: 300}}>
						<Line data={lineChartData} options={lineOptions} />
					</Box>
				</Box>

				{/* Bar Chart */}
				<Box
					sx={{
						bgcolor: "background.paper",
						borderRadius: 3,
						boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
						p: 3,
					}}
				>
					<Box
						display='flex'
						justifyContent='space-between'
						alignItems='center'
						mb={3}
					>
						<Typography variant='h6' fontWeight='600'>
							New Customers
						</Typography>
						<Typography variant='caption' color='text.secondary'>
							Last 7 months
						</Typography>
					</Box>
					<Box sx={{height: 300}}>
						<Bar data={barChartData} options={barOptions} />
					</Box>
				</Box>
			</Box>

			{/* Additional Info */}
			<Box
				sx={{
					bgcolor: "background.paper",
					borderRadius: 3,
					boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
					p: 3,
					overflow: "hidden",
				}}
			>
				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='center'
					mb={3}
				>
					<Typography variant='h6' fontWeight='600'>
						User Information
					</Typography>
					<Typography
						variant='caption'
						sx={{
							bgcolor: user.profile?.isActive
								? "success.light"
								: "error.light",
							color: user.profile?.isActive ? "success.dark" : "error.dark",
							px: 1.5,
							py: 0.5,
							borderRadius: 2,
							fontWeight: "medium",
						}}
					>
						{user.profile?.isActive ? "Active" : "Inactive"}
					</Typography>
				</Box>
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: {
							xs: "1fr",
							sm: "repeat(2, 1fr)",
							md: "repeat(4, 1fr)",
						},
						gap: 3,
					}}
				>
					<Box>
						<Typography
							variant='caption'
							color='text.secondary'
							fontWeight='medium'
							display='block'
							gutterBottom
						>
							Full Name
						</Typography>
						<Typography variant='body1' fontWeight='medium'>
							{user.profile?.firstName} {user.profile?.lastName}
						</Typography>
					</Box>
					<Box>
						<Typography
							variant='caption'
							color='text.secondary'
							fontWeight='medium'
							display='block'
							gutterBottom
						>
							Email
						</Typography>
						<Typography variant='body1' fontWeight='medium'>
							{user.email}
						</Typography>
					</Box>
					<Box>
						<Typography
							variant='caption'
							color='text.secondary'
							fontWeight='medium'
							display='block'
							gutterBottom
						>
							Role
						</Typography>
						<Typography
							variant='body1'
							fontWeight='medium'
							sx={{
								color: "primary.main",
								textTransform: "capitalize",
							}}
						>
							{user.profile?.role}
						</Typography>
					</Box>
					<Box>
						<Typography
							variant='caption'
							color='text.secondary'
							fontWeight='medium'
							display='block'
							gutterBottom
						>
							Position
						</Typography>
						<Typography variant='body1' fontWeight='medium'>
							{user.profile?.position || "Not specified"}
						</Typography>
					</Box>
				</Box>
				{user.profile?.phone && (
					<Box
						sx={{
							mt: 3,
							pt: 3,
							borderTop: "1px solid",
							borderColor: "divider",
						}}
					>
						<Typography
							variant='caption'
							color='text.secondary'
							fontWeight='medium'
							display='block'
							gutterBottom
						>
							Contact Information
						</Typography>
						<Typography variant='body1'>{user.profile.phone}</Typography>
						{user.profile.address?.city && (
							<Typography
								variant='body2'
								color='text.secondary'
								sx={{mt: 0.5}}
							>
								{user.profile.address.city}, {user.profile.address.street}{" "}
								{user.profile.address.houseNo}
							</Typography>
						)}
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default Dashboard;
