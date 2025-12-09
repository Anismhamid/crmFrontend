import type {FunctionComponent} from "react";
import Dashboard from "../dashboard/Dashboard";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	return (
		<div className=''>
			<h1>Dashboard</h1>
			<Dashboard />
		</div>
	);
};

export default Home;
