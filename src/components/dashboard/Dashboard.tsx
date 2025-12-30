import {useContext, type FunctionComponent} from "react";
import {FiUsers, FiDollarSign, FiTrendingUp, FiActivity} from "react-icons/fi";

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
} from "chart.js";
import {Line, Bar} from "react-chartjs-2";
import {CRMContext} from "../../context/CRMContext";
import type {User} from "../../interfaces/Users";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
);
interface DashboardProps {
	auth: User | null;
}

const Dashboard: FunctionComponent<DashboardProps> = ({auth}) => {
	const {stats} = useContext(CRMContext);

	const statCards = [
		{
			title: "Total Revenue",
			value: `$${stats.totalRevenue.toLocaleString()}`,
			icon: <FiDollarSign size={28} className='text-white' />,
			color: "linear-gradient(to right, #2563eb, #1d4ed8)",
		},
		{
			title: "Total Customers",
			value: stats.totalCustomers.toLocaleString(),
			icon: <FiUsers size={28} className='text-white' />,
			color: "linear-gradient(to right, #16a34a, #15803d)",
		},
		{
			title: "Active Deals",
			value: stats.activeDeals.toLocaleString(),
			icon: <FiTrendingUp size={28} className='text-white' />,
			color: "linear-gradient(to right, #9333ea, #7e22ce)",
		},
		{
			title: "Conversion Rate",
			value: `${stats.conversionRate}%`,
			icon: <FiActivity size={28} className='text-white' />,
			color: "linear-gradient(to right, #f97316, #ea580c)",
		},
	];

	// Line Chart Data
	const lineData = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
		datasets: [
			{
				label: "Monthly Revenue (₪)",
				data: [0, 120000, 140000, 135000, 160000, 175000, 168000, 182000],
				borderWidth: 3,
			},
		],
	};

	// Bar Chart Data
	const barData = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
		datasets: [
			{
				label: "New Customers",
				data: [120, 140, 180, 200, 240, 210, 260],
				borderWidth: 1,
			},
		],
	};

	return (
		<div className='container py-4'>
			{auth?.email}
			{/* Cards Row */}
			<div className='row g-4 mb-4'>
				{statCards.map((stat, index) => (
					<div key={index} className='col-12 col-md-6 col-lg-3'>
						<div className='card shadow-sm h-100'>
							<div className='card-body d-flex justify-content-between align-items-start'>
								<div>
									<p className='text-muted small mb-1'>{stat.title}</p>
									<h3 className='fw-bold mb-0'>{stat.value}</h3>
								</div>

								<div
									className='p-3 rounded'
									style={{
										background: stat.color,
									}}
								>
									{stat.icon}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Charts Row */}
			<div className='row g-4'>
				{/* Line Chart */}
				<div className='col-12 col-lg-6'>
					<div className='card shadow-sm p-3'>
						<h5 className='mb-3'>Revenue Overview</h5>
						<Line data={lineData} />
					</div>
				</div>

				{/* Bar Chart */}
				<div className='col-12 col-lg-6'>
					<div className='card shadow-sm p-3'>
						<h5 className='mb-3'>New Customers</h5>
						<Bar data={barData} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
