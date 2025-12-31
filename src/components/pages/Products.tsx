import {type FunctionComponent} from "react";
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
	Chip,
	IconButton,
	Tooltip,
} from "@mui/material";
import {Link} from "react-router-dom";
import {priceToLocalString} from "../../assets/helpets";
import Filters from "../dashboard/Filters";
import {useProductsWithFilters} from "../hooks/useProductsWithFilters";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DiscountIcon from "@mui/icons-material/Discount";

interface ProductsProps {}

const Products: FunctionComponent<ProductsProps> = () => {
	const {products, loading, filters, setFilters, error} = useProductsWithFilters();

	if (loading) return <CircularProgressBar />;
	if (error) return <Typography color='error'>{error}</Typography>;

	return (
		<Box sx={{p: {xs: 1, md: 3}}}>
			<Typography variant='h4' component='h1' gutterBottom>
				Products ({products.length})
			</Typography>

			<Filters filters={filters} onChange={setFilters} />

			<Box sx={{mt: 3}}>
				<TableContainer className=" table" component={Paper} elevation={2}>
					<Table >
						<TableHead>
							<TableRow sx={{backgroundColor: "action.hover"}}>
								<TableCell width='60px' align='center'>
									Image
								</TableCell>
								<TableCell>Product Name</TableCell>
								<TableCell width='120px' align='center'>
									Stock
								</TableCell>
								<TableCell>Manufacturer</TableCell>
								<TableCell width='120px' align='right'>
									Price
								</TableCell>
								<TableCell width='120px' align='right'>
									Category
								</TableCell>
								<TableCell width='80px' align='center'>
									Actions
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{products.length > 0 ? (
								products.map((product: Product) => (
									<TableRow key={product._id} hover>
										<TableCell align='center'>
											<Link to={`/products/${product._id}`}>
												<Avatar
													src={product.image?.url}
													alt={
														product.image?.alt ||
														product.product_name
													}
													sx={{
														width: 50,
														height: 50,
														margin: "auto",
													}}
												/>
											</Link>
										</TableCell>

										<TableCell>
											<Box>
												<Typography
													variant='body1'
													fontWeight='medium'
												>
													{product.product_name}
												</Typography>
												{product.sales.isSale && (
													<Chip
														icon={<DiscountIcon />}
														label='On Sale'
														color='success'
														size='small'
														sx={{mt: 0.5}}
													/>
												)}
											</Box>
										</TableCell>

										<TableCell align='center'>
											<Chip
												label={product.quantity_in_stock}
												color={
													product.quantity_in_stock > 10
														? "success"
														: product.quantity_in_stock > 0
														? "warning"
														: "error"
												}
												variant='outlined'
												size='small'
											/>
										</TableCell>

										<TableCell>{product.manufacturer}</TableCell>

										<TableCell align='right'>
											<Typography variant='body1' fontWeight='bold'>
												{priceToLocalString(product.price)}
											</Typography>
											{product.sales.discount > 0 && (
												<Typography
													variant='caption'
													color='text.secondary'
													sx={{textDecoration: "line-through"}}
												>
													{priceToLocalString(
														product.price *
															(1 +
																product.sales.discount /
																	100),
													)}
												</Typography>
											)}
										</TableCell>

										<TableCell align='center'>
											<Typography
												variant='caption'
												color='text.secondary'
											>
												<IconButton
													component={Link}
													to={`/products/category/${product.category}`}
													size='small'
												>
													{product.category}
												</IconButton>
											</Typography>
										</TableCell>
										<TableCell align='center'>
											<Tooltip title='View Details'>
												<IconButton
													component={Link}
													to={`/products/${product._id}`}
													size='small'
												>
													<VisibilityIcon />
												</IconButton>
											</Tooltip>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={6} align='center' sx={{py: 4}}>
										<Typography variant='h6' color='text.secondary'>
											No products found
										</Typography>
										<Typography variant='body2' sx={{mt: 1}}>
											Try adjusting your filters
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
