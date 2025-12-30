import React, {useContext} from "react";
import {FiUsers, FiDollarSign, FiTrendingUp, FiActivity} from "react-icons/fi";
import {CRMContext} from "../../context/CRMContext";

const StatsCards: React.FC = () => {
	const {stats} = useContext(CRMContext);

	const statCards = [
		{
			title: "Total Revenue",
			value: `$${stats.totalRevenue.toLocaleString()}`,
			change: "+12.5%",
			icon: <FiDollarSign size={24} className='text-white' />,
			color: "linear-gradient(to right, #3b82f6, #2563eb)", // blue
			trend: "up",
		},
		{
			title: "Total Customers",
			value: stats.totalCustomers.toLocaleString(),
			change: "+8.2%",
			icon: <FiUsers size={24} className='text-white' />,
			color: "linear-gradient(to right, #22c55e, #16a34a)", // green
			trend: "up",
		},
		{
			title: "Active Deals",
			value: stats.activeDeals.toLocaleString(),
			change: "+5.1%",
			icon: <FiTrendingUp size={24} className='text-white' />,
			color: "linear-gradient(to right, #a855f7, #7e22ce)", // purple
			trend: "up",
		},
		{
			title: "Conversion Rate",
			value: `${stats.conversionRate}%`,
			change: "+2.4%",
			icon: <FiActivity size={24} className='text-white' />,
			color: "linear-gradient(to right, #fb923c, #f97316)", // orange
			trend: "up",
		},
	];

	return (
		<div className='row g-4'>
			{statCards.map((stat, index) => (
				<div key={index} className='col-12 col-md-6 col-lg-3'>
					<div className='card shadow-sm h-100'>
						<div className='card-body d-flex justify-content-between align-items-start'>
							<div>
								<p className='text-muted small mb-1'>{stat.title}</p>

								<h3 className='fw-bold mb-2'>{stat.value}</h3>

								<p
									className={`small mb-0 ${
										stat.trend === "up"
											? "text-success"
											: "text-danger"
									}`}
								>
									{stat.change} from last month
								</p>
							</div>

							<div
								className='p-3 rounded'
								style={{
									background: stat.color,
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								{stat.icon}
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default StatsCards;
