import {useEffect, type FunctionComponent} from "react";
import Dashboard from "../dashboard/Dashboard";
import {useAuth} from "../../context/UserContext";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	// const {user} = useAuth();
	// useEffect(() => {
	// 	console.log(user);
	// },[]);
	const {user}=useAuth()
	return (
		<div className=''>
			<h1>Dashboard {}</h1>
			<Dashboard auth={user}/>
		</div>
	);
};

export default Home;
