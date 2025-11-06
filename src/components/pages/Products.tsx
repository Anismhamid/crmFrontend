import {useEffect, useState, type FunctionComponent} from "react";
import {getAllProducts} from "../../services/products";
import type {Product} from "../../interfaces/Products";
import {Typography} from "@mui/material";

interface ProductsProps {}

const Products: FunctionComponent<ProductsProps> = () => {
	const [products, setProduct] = useState<Product[]>([]);

	useEffect(() => {
		getAllProducts().then((res) => {
			setProduct(res);
		});
	}, []);

	return (
		<>
			<Typography variant='h4' component='h1'>
				Products
			</Typography>
			<div className='d-flex align-items-center justify-content-center'>
				<table className='table table-dark table-striped'>
					<thead>
						<tr>
							<th>name</th>
							<th>price</th>
						</tr>
					</thead>
					<tbody>
						{products.length ? (
							products.map((pro: Product, i) => (
								<tr key={i}>
									<td>{pro.product_name}</td>
									<td>{pro.price}</td>
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

export default Products;
