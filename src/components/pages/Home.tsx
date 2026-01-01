import {type FunctionComponent} from "react";
import Dashboard from "../dashboard/Dashboard";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	return <Dashboard />;
};

export default Home;
