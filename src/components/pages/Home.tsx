import type {FunctionComponent} from "react";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	return (
		<div className=' d-flex align-items-center justify-content-center'>
			<h1>Home</h1>
		</div>
	);
};

export default Home;
