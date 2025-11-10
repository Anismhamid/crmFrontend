import {
	Typography,
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Avatar,
} from "@mui/material";
import {useEffect, useState, type FunctionComponent} from "react";
import type {Product} from "../../interfaces/Products";
import CircularProgressBar from "../../assets/CircularProgressBar";
import {getAllProducts} from "../../services/products";

interface ShoppingCartProps {}

const ShoppingCart: FunctionComponent<ShoppingCartProps> = () => {
	const [products, setProduct] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getAllProducts()
			.then((res) => {
				setProduct(res);
			})
			.catch((error) => console.error("Error to load products", error))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <CircularProgressBar />;

	return (
		<>
			{" "}
			<Typography variant='h4' component='h1'>
				Products
			</Typography>
			<div className='d-flex align-items-center justify-content-center'>
				<TableContainer component={Paper} elevation={3}>
					<Table className='table table-dark table-striped'>
						<TableHead>
							<TableRow>
								<TableCell align='center'>name</TableCell>
								<TableCell>quantity</TableCell>
								<TableCell>manufacturer</TableCell>
								<TableCell>price</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{products.length ? (
								products.map((pro: Product, i) => (
									<TableRow key={i} hover>
										<TableCell align='center'>
											<Avatar
												src={pro.image.url}
												alt={pro.image.alt}
											/>
										</TableCell>
										<TableCell>{pro.product_name}</TableCell>
										<TableCell>{pro.quantity_in_stock}</TableCell>
										<TableCell>{pro.manufacturer}</TableCell>
										<TableCell>{pro.price}</TableCell>
									</TableRow>
								))
							) : (
								<tr>
									<td>No data found</td>
								</tr>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</>
	);
};

export default ShoppingCart;
