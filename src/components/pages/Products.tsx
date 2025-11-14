import {useEffect, useState, type FunctionComponent} from "react";
import {getAllProducts} from "../../services/products";
import type {Product} from "../../interfaces/Products";
import CircularProgressBar from "../../assets/CircularProgressBar";
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	Avatar,
} from "@mui/material";
import {Link} from "react-router-dom";

interface ProductsProps {}

const Products: FunctionComponent<ProductsProps> = () => {
	const [products, setProducts] = useState<Product[]>([]); // Fixed: setProduct → setProducts
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getAllProducts()
			.then((res) => {
				setProducts(res);
			})
			.catch((error) => console.error("Error loading products", error))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <CircularProgressBar />;

	return (
		<Box sx={{p: 3}}>
			<Typography variant='h4' component='h1' gutterBottom>
				Products
			</Typography>
			<Box sx={{display: "flex", justifyContent: "center"}}>
				<TableContainer component={Paper} elevation={3} sx={{maxWidth: 1200}}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell align='center'></TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Quantity</TableCell>
								<TableCell>Manufacturer</TableCell>
								<TableCell>Price</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{products.length > 0 ? (
								products.map((product: Product, index) => (
									<TableRow key={product._id || index} hover>
										<TableCell align='center'>
											<Link to={`/products/${product._id}`}>
												<Avatar
													src={product.image?.url}
													alt={
														product.image?.alt ||
														product.product_name
													}
													sx={{
														width: 56,
														height: 56,
														margin: "auto",
													}}
												/>
											</Link>
										</TableCell>

										<TableCell>{product.product_name}</TableCell>
										<TableCell>{product.quantity_in_stock}</TableCell>
										<TableCell>{product.manufacturer}</TableCell>
										<TableCell>
											${product.price?.toFixed(2)}
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={5} align='center'>
										<Typography variant='body1' sx={{py: 2}}>
											No products found
										</Typography>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Box>
	);
};

export default Products;
