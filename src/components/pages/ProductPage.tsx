import {useState, useEffect, type FunctionComponent} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {
	Box,
	Typography,
	Grid,
	Card,
	CardMedia,
	Chip,
	Rating,
	Button,
	Container,
	Breadcrumbs,
	Link,
	Alert,
} from "@mui/material";
import {ShoppingCart, Favorite, Share, NavigateNext} from "@mui/icons-material";
import {
	getProductById,
	getProductsByCategory,
	searchProducts,
} from "../../services/products";
import type {Product} from "../../interfaces/Products";
import CircularProgressBar from "../../assets/CircularProgressBar";
import ProductList from "./ProductList";
import type {Review} from "../../interfaces/Reviews";

interface ProductPageProps {}

const ProductPage: FunctionComponent<ProductPageProps> = () => {
	const {id} = useParams<{id: string}>();
	const [searchParams] = useSearchParams();
	const [product, setProduct] = useState<Product | null>(null);
	const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProductData = async () => {
			if (!id) {
				setError("Product ID is required");
				setLoading(false);
				return;
			}

			try {
				setLoading(true);
				setError(null);

				// Fetch main product
				const productData: Product = await getProductById(id);
				setProduct(productData);
				console.log(productData);

				// Fetch related products from same category
				if (productData.category) {
					const related = await getProductsByCategory(product?.category || "");
					const filteredRelated = related
						.filter((p: Product) => p._id !== id)
						.slice(0, 4);
					setRelatedProducts(filteredRelated);
				}
			} catch (err) {
				console.error("Error fetching product:", err);
				setError("Failed to load product");
			} finally {
				setLoading(false);
			}
		};

		fetchProductData();
	}, [id]);

	// Handle search from query parameters
	useEffect(() => {
		const searchQuery = searchParams.get("search");
		const categoryQuery = searchParams.get("category");

		if (searchQuery || categoryQuery) {
			handleSearch(searchQuery, categoryQuery);
		}
	}, [searchParams]);

	const handleSearch = async (query: string | null, category: string | null) => {
		try {
			setLoading(true);
			const results = await searchProducts(query || "", category || "");
			setRelatedProducts(results);
		} catch (err) {
			console.error("Error searching products:", err);
		} finally {
			setLoading(false);
		}
	};

	const handleAddToCart = (product: Product) => {
		// Implement add to cart functionality
		console.log("Added to cart:", product);
		// You can integrate with your cart context or state management here
	};

	const handleAddToWishlist = (product: Product) => {
		// Implement add to wishlist functionality
		console.log("Added to wishlist:", product);
	};

	if (loading) return <CircularProgressBar />;

	if (error) {
		return (
			<Container sx={{py: 4}}>
				<Alert severity='error' sx={{mb: 2}}>
					error:{error}
				</Alert>
				<Alert severity='error' sx={{mb: 2}}>
					_id:{id}
				</Alert>
				<Button variant='contained' onClick={() => window.history.back()}>
					Go Back
				</Button>
			</Container>
		);
	}

	if (!product) {
		return (
			<Container sx={{py: 4}}>
				<Typography variant='h4' component='h1' gutterBottom>
					Product Not Found
				</Typography>
				<Button variant='contained' onClick={() => window.history.back()}>
					Go Back
				</Button>
			</Container>
		);
	}

	const averageRating = product.review?.length
		? product.review.reduce((acc, r) => acc + r, 0) / product.review.length
		: 0;

	product.review?.map((r: Review) => (
		<Typography variant='body2' color='text.secondary' sx={{ml: 1}}>
			by{" "}
			{typeof r.user === "string"
				? r.user
				: r.user.profile
				? `${r.user.profile.firstName} ${r.user.profile.lastName}`
				: r.user._id}
		</Typography>
	));

	return (
		<Container maxWidth='lg' sx={{py: 4}}>
			{/* Breadcrumbs */}
			<Breadcrumbs separator={<NavigateNext fontSize='small' />} sx={{mb: 3}}>
				<Link color='inherit' href='/'>
					Home
				</Link>
				<Link color='inherit' href='/products'>
					Products
				</Link>
				<Link color='inherit' href={`/products/category/${product.category}`}>
					{product.category}
				</Link>
				<Typography color='text.primary'>{product.product_name}</Typography>
			</Breadcrumbs>

			{/* Main Product Section */}
			<Grid container spacing={4}>
				{/* Product Images */}
				<Grid size={{xs: 12, md: 6}}>
					<Card sx={{height: "100%", position: "relative"}}>
						<CardMedia
							component={Link as any}
							to={`/products/${product._id}`}
							image={product.image?.url || "/placeholder-product.png"}
							alt={product.image?.alt || product.product_name}
							sx={{height: 400, objectFit: "contain", width: "100%"}}
						/>
					</Card>
				</Grid>

				{/* Product Details */}
				<Grid size={{xs: 12, md: 6}}>
					<Box sx={{display: "flex", flexDirection: "column", height: "100%"}}>
						<Typography variant='h4' component='h1' gutterBottom>
							{product.product_name}
						</Typography>

						<Box sx={{display: "flex", alignItems: "center", mb: 2}}>
							<Rating value={averageRating} readOnly precision={0.5} />
							<Typography
								variant='body2'
								color='text.secondary'
								sx={{ml: 1}}
							>
								({product.review?.length || 0} reviews)
							</Typography>
						</Box>

						<Typography variant='h5' color='primary' gutterBottom>
							${product.price?.toFixed(2)}
						</Typography>

						<Chip
							label={product.category}
							color='primary'
							variant='outlined'
							sx={{mb: 2, alignSelf: "flex-start"}}
						/>

						<Typography variant='body1' paragraph sx={{flexGrow: 1}}>
							{product.description || "No description available."}
						</Typography>

						<Box sx={{display: "flex", alignItems: "center", mb: 2}}>
							<Chip
								label={
									product.quantity_in_stock > 0
										? "In Stock"
										: "Out of Stock"
								}
								color={
									product.quantity_in_stock > 0 ? "success" : "error"
								}
								sx={{mr: 2}}
							/>
							<Typography variant='body2' color='text.secondary'>
								SKU: {product._id?.slice(-8).toUpperCase()}
							</Typography>
						</Box>

						{/* Action Buttons */}
						<Box sx={{display: "flex", gap: 2, flexWrap: "wrap"}}>
							<Button
								variant='contained'
								size='large'
								startIcon={<ShoppingCart />}
								disabled={product.quantity_in_stock === 0}
								onClick={() => handleAddToCart(product)}
								sx={{flexGrow: 1}}
							>
								{product.quantity_in_stock > 0
									? "Add to Cart"
									: "Out of Stock"}
							</Button>

							<Button
								variant='outlined'
								size='large'
								startIcon={<Favorite />}
								onClick={() => handleAddToWishlist(product)}
							>
								Wishlist
							</Button>

							<Button variant='outlined' size='large' startIcon={<Share />}>
								Share
							</Button>
						</Box>

						{/* Additional Product Info */}
						<Box sx={{mt: 3, p: 2, bgcolor: "grey.50", borderRadius: 1}}>
							<Typography variant='h6' gutterBottom>
								Product Details
							</Typography>
							<Grid container spacing={1}>
								<Grid size={{xs: 6}}>
									<Typography variant='body2' color='text.secondary'>
										Manufacturer:
									</Typography>
								</Grid>
								<Grid size={{xs: 6}}>
									<Typography variant='body2'>
										{product.manufacturer || "N/A"}
									</Typography>
								</Grid>
								<Grid size={{xs: 6}}>
									<Typography variant='body2' color='text.secondary'>
										Weight:
									</Typography>
								</Grid>
								<Grid size={{xs: 6}}>
									<Typography variant='body2'>
										{/* {product.weight || "N/A"} */}
									</Typography>
								</Grid>
								<Grid size={{xs: 6}}>
									<Typography variant='body2' color='text.secondary'>
										Dimensions:
									</Typography>
								</Grid>
								<Grid size={{xs: 6}}>
									<Typography variant='body2'>
										{/* {product.dimensions || "N/A"} */}
									</Typography>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Grid>
			</Grid>

			{/* Reviews Section */}
			{/* {product.review && product.review.length > 0 && (
				<Box sx={{mt: 6}}>
					<Typography variant='h5' component='h2' gutterBottom>
						Customer Reviews
					</Typography>
					{product.review.map((review, index) => (
						<Card key={index} sx={{mb: 2, p: 2}}>
							<CardContent>
								<Box sx={{display: "flex", alignItems: "center", mb: 1}}>
									<Rating value={review.rating} readOnly size='small' />
									<Typography
										variant='body2'
										color='text.secondary'
										sx={{ml: 1}}
									>
										by {review.user?.profile?.firstName}{" "}
										{review.user?.profile?.lastName}
									</Typography>
								</Box>
								<Typography variant='body1'>{review.comment}</Typography>
								<Typography variant='caption' color='text.secondary'>
									{new Date(review.createdAt).toLocaleDateString()}
								</Typography>
							</CardContent>
						</Card>
					))}
				</Box>
			)} */}

			{/* Related Products */}
			{relatedProducts.length > 0 && (
				<Box sx={{mt: 6}}>
					<Typography variant='h5' component='h2' gutterBottom>
						Related Products
					</Typography>
					<ProductList products={relatedProducts} />
				</Box>
			)}
		</Container>
	);
};

export default ProductPage;
