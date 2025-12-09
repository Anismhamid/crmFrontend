import {type FunctionComponent} from "react";
import {
	Grid,
	Card,
	CardContent,
	Typography,
	Box,
	Chip,
	Rating,
	Button,
	IconButton,
	CardActions,
	Alert,
	Pagination,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Stack,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import {Favorite, FavoriteBorder, ShoppingCart, Visibility} from "@mui/icons-material";
import {Link} from "react-router-dom";
import type {Product} from "../../interfaces/Products";

interface ProductsCategoryProps {
	products: Product[];
	loading?: boolean;
	onAddToCart?: (product: Product) => void;
	onAddToWishlist?: (product: Product) => void;
	onRemoveFromWishlist?: (product: Product) => void;
	wishlistItems?: string[]; // Array of product IDs in wishlist
	showFilters?: boolean;
	itemsPerPage?: number;
	onPageChange?: (page: number) => void;
	currentPage?: number;
	totalPages?: number;
	onSortChange?: (sortBy: string) => void;
	sortBy?: string;
}

const ProductsCategory: FunctionComponent<ProductsCategoryProps> = ({
	products,
	loading = false,
	onAddToCart,
	onAddToWishlist,
	onRemoveFromWishlist,
	wishlistItems = [],
	showFilters = false,
	itemsPerPage = 12,
	onPageChange,
	currentPage = 1,
	totalPages = 1,
	onSortChange,
	sortBy = "name",
}) => {
	const handleAddToCart = (product: Product) => {
		if (onAddToCart) {
			onAddToCart(product);
			
			
		} else {
			// Default behavior
			console.log("Add to cart:", product.product_name);
		}
	};

	const handleWishlistToggle = (product: Product) => {
		const isInWishlist = wishlistItems.includes(product._id!);

		if (isInWishlist && onRemoveFromWishlist) {
			onRemoveFromWishlist(product);
		} else if (!isInWishlist && onAddToWishlist) {
			onAddToWishlist(product);
		}
	};

	const calculateAverageRating = (product: Product) => {
		if (!product.review || product.review.length === 0) return 0;
		return (
			product.review.reduce((acc, review: any) => acc + review.rating, 0) /
			product.review.length
		);
	};

	const getStockStatus = (quantity: number) => {
		if (quantity === 0) return {label: "Out of Stock", color: "error" as const};
		if (quantity < 10) return {label: "Low Stock", color: "warning" as const};
		return {label: "In Stock", color: "success" as const};
	};

	if (loading) {
		return (
			<Grid container spacing={3}>
				{[...Array(8)].map((_, index) => (
					<Grid size={{xs: 12, sm: 6, md: 4, lg: 3}} key={index}>
						<Card sx={{height: "100%", opacity: 0.6}}>
							<Box sx={{pt: "75%", bgcolor: "grey.300"}} />
							<CardContent>
								<Box
									sx={{
										width: "80%",
										height: 20,
										bgcolor: "grey.400",
										mb: 1,
									}}
								/>
								<Box
									sx={{
										width: "60%",
										height: 20,
										bgcolor: "grey.400",
										mb: 1,
									}}
								/>
								<Box
									sx={{width: "40%", height: 20, bgcolor: "grey.400"}}
								/>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		);
	}

	if (!products || products.length === 0) {
		return (
			<Alert severity='info' sx={{mt: 2}}>
				No products found. Try adjusting your search filters.
			</Alert>
		);
	}

	return (
		<Box>
			{/* Filters and Sorting */}
			{showFilters && (
				<Stack
					direction={{xs: "column", sm: "row"}}
					spacing={2}
					sx={{mb: 3}}
					justifyContent='space-between'
					alignItems={{xs: "stretch", sm: "center"}}
				>
					<Typography variant='h6' component='h2'>
						{products.length} product{products.length !== 1 ? "s" : ""} found
					</Typography>

					<Stack direction='row' spacing={2}>
						<FormControl size='small' sx={{minWidth: 120}}>
							<InputLabel>Sort by</InputLabel>
							<Select
								value={sortBy}
								label='Sort by'
								onChange={(e) => onSortChange?.(e.target.value)}
							>
								<MenuItem value='name'>Name</MenuItem>
								<MenuItem value='price-low'>Price: Low to High</MenuItem>
								<MenuItem value='price-high'>Price: High to Low</MenuItem>
								<MenuItem value='rating'>Rating</MenuItem>
								<MenuItem value='newest'>Newest</MenuItem>
							</Select>
						</FormControl>

						<FormControl size='small' sx={{minWidth: 100}}>
							<InputLabel>Show</InputLabel>
							<Select
								value={itemsPerPage}
								label='Show'
								onChange={(e) =>
									console.log("Items per page:", e.target.value)
								}
							>
								<MenuItem value={12}>12</MenuItem>
								<MenuItem value={24}>24</MenuItem>
								<MenuItem value={48}>48</MenuItem>
							</Select>
						</FormControl>
					</Stack>
				</Stack>
			)}

			{/* Product Grid */}
			<Grid container spacing={3}>
				{products.map((product) => {
					const averageRating = calculateAverageRating(product);
					const reviewCount = product.review?.length || 0;
					const stockStatus = getStockStatus(product.quantity_in_stock);
					const isInWishlist = wishlistItems.includes(product._id!);

					return (
						<Grid size={{xs: 12, sm: 6, md: 4, lg: 3}} key={product._id}>
							<Card
								sx={{
									height: "100%",
									display: "flex",
									flexDirection: "column",
									transition: "transform 0.2s, box-shadow 0.2s",
									"&:hover": {
										transform: "translateY(-4px)",
										boxShadow: 4,
									},
								}}
							>
								{/* Product Image */}
								<Box
									sx={{
										position: "relative",
										pt: "75%",
										overflow: "hidden",
									}}
								>
									<Link to={`/products/${product._id}`}>
										<CardMedia
											component='img'
											image={
												product.image?.url ||
												"/placeholder-product.png"
											}
											alt={
												product.image?.alt || product.product_name
											}
											sx={{
												position: "absolute",
												top: 0,
												left: 0,
												width: "100%",
												height: "100%",
												objectFit: "cover",
											}}
										/>
									</Link>

									{/* Wishlist Button */}
									<IconButton
										sx={{
											position: "absolute",
											top: 8,
											right: 8,
											bgcolor: "background.paper",
											"&:hover": {
												bgcolor: "background.paper",
											},
										}}
										onClick={() => handleWishlistToggle(product)}
										size='small'
									>
										{isInWishlist ? (
											<Favorite color='error' />
										) : (
											<FavoriteBorder />
										)}
									</IconButton>

									{/* Stock Status */}
									<Chip
										label={stockStatus.label}
										color={stockStatus.color}
										size='small'
										sx={{
											position: "absolute",
											top: 8,
											left: 8,
										}}
									/>
								</Box>

								<CardContent sx={{flexGrow: 1, p: 2}}>
									{/* Category */}
									<Chip
										label={product.category}
										size='small'
										variant='outlined'
										sx={{mb: 1}}
									/>

									{/* Product Name */}
									<Typography
										component={Link}
										to={`/products/category/${product.category.toLocaleLowerCase()}`}
										variant='h6'
										sx={{
											display: "-webkit-box",
											WebkitLineClamp: 2,
											WebkitBoxOrient: "vertical",
											overflow: "hidden",
											textDecoration: "none",
											color: "text.primary",
											"&:hover": {
												color: "primary.main",
											},
											minHeight: "64px",
											mb: 1,
										}}
									>
										{product.product_name}
									</Typography>

									{/* Manufacturer */}
									<Typography
										variant='body2'
										color='text.secondary'
										sx={{mb: 1}}
									>
										by {product.manufacturer}
									</Typography>

									{/* Rating */}
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											mb: 1,
										}}
									>
										<Rating
											value={averageRating}
											readOnly
											size='small'
											precision={0.5}
										/>
										<Typography
											variant='body2'
											color='text.secondary'
											sx={{ml: 1}}
										>
											({reviewCount})
										</Typography>
									</Box>

									{/* Price */}
									<Typography variant='h6' color='primary' sx={{mb: 1}}>
										${product.price?.toFixed(2)}
									</Typography>

									{/* Quantity in Stock */}
									<Typography variant='body2' color='text.secondary'>
										{product.quantity_in_stock} in stock
									</Typography>
								</CardContent>

								<CardActions sx={{p: 2, pt: 0}}>
									<Button
										fullWidth
										variant='contained'
										startIcon={<ShoppingCart />}
										onClick={() => handleAddToCart(product)}
										disabled={product.quantity_in_stock === 0}
										size='small'
									>
										{product.quantity_in_stock === 0
											? "Out of Stock"
											: "Add to Cart"}
									</Button>

									<IconButton
										component={Link}
										to={`/products/${product._id}`}
										size='small'
									>
										<Visibility />
									</IconButton>
								</CardActions>
							</Card>
						</Grid>
					);
				})}
			</Grid>

			{/* Pagination */}
			{showFilters && totalPages > 1 && (
				<Box sx={{display: "flex", justifyContent: "center", mt: 4}}>
					<Pagination
						count={totalPages}
						page={currentPage}
						onChange={(_, page) => onPageChange?.(page)}
						color='primary'
						showFirstButton
						showLastButton
					/>
				</Box>
			)}
		</Box>
	);
};

export default ProductsCategory;
