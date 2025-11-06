import {useEffect, useState, type FunctionComponent} from "react";
import {getAllProducts} from "../../services/products";
import type {Product} from "../../interfaces/Products";

interface UsersProps {}

const Users: FunctionComponent<UsersProps> = () => {
	const [users, setProduct] = useState<Product[]>([]);

	useEffect(() => {
		getAllProducts().then((res) => {
			setProduct(res);
		});
	}, []);

	return (
		<>
			<div className=''>
				<table>
					<thead>
						<tr>
							<th>name</th>
							<th>price</th>
						</tr>
					</thead>
					<tbody>
						{users.length ? (
							users.map((user: Product, i) => (
								<tr key={i}>
									<td>{user.product_name}</td>
									<td>{user.price}</td>
								</tr>
							))
						) : (
							<tr>
								<td>No data found</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Users;
