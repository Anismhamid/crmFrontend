import {
	Box,
	Grid,
	TextField,
	MenuItem,
	Slider,
	Switch,
	FormControlLabel,
	Autocomplete,
	Button,
	Typography,
	Stack,
} from "@mui/material";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import type {ProductFilters} from "../../interfaces/filter";
import {priceToLocalString} from "../../assets/helpets";

const categories = [
	"Cakes",
	"Bake House",
	"Platters",
	"Fruits",
	"Home Decor",
	"Groceries",
	"Sweets",
	"Beverages",
];
const manufacturers = ["Sweet Moments Bakery", "Golden Cake", "Royal Desserts"];

const sortOptions = [
	{value: "newest", label: "Newest"},
	{value: "priceAsc", label: "Price: Low to High"},
	{value: "priceDesc", label: "Price: High to Low"},
];
const limitOptions = [12, 24, 36, 48];

interface FiltersProps {
	filters: ProductFilters;
	onChange: (f: ProductFilters) => void;
}

const Filters = ({filters, onChange}: FiltersProps) => {
	const [, setParams] = useSearchParams();

	// Reset filters
	const resetFilters = () => {
		onChange({
			category: "",
			isSale: false,
			minDiscount: 0,
			manufacturer: "",
			inStock: false,
			minPrice: 0,
			maxPrice: 1000,
			sortBy: "newest",
			limit: 12,
		});
	};

	// Update query params when filters change
	useEffect(() => {
		const timer = setTimeout(() => {
			const q: Record<string, string> = {};

			if (filters.category) q.category = filters.category;
			if (filters.isSale) q.isSale = "true"; // Changed to match backend
			if (filters.inStock) q.inStock = "true";
			if (filters.manufacturer) q.manufacturer = filters.manufacturer;
			if (filters.minDiscount > 0) q.minDiscount = filters.minDiscount.toString();

			q.minprice = filters.minPrice.toString();
			q.maxprice = filters.maxPrice.toString();
			q.sortBy = filters.sortBy;
			q.limit = filters.limit.toString();

			setParams(q);
		}, 400);

		return () => clearTimeout(timer);
	}, [filters, setParams]);

	const handlePriceChange = (_: Event, newValue: number | number[]) => {
		if (Array.isArray(newValue)) {
			onChange({
				...filters,
				minPrice: newValue[0],
				maxPrice: newValue[1],
			});
		}
	};

	return (
		<Box sx={{p: 3}}>
			<Typography variant='h6' gutterBottom>
				Filters
			</Typography>
			<Grid container spacing={5}>
				{/* Category */}
				<Grid size={{xs: 12, md: 6, lg: 2}}>
					<TextField
						select
						fullWidth
						label='Category'
						value={filters.category}
						onChange={(e) => onChange({...filters, category: e.target.value})}
					>
						<MenuItem value=''>All Categories</MenuItem>
						{categories.map((c) => (
							<MenuItem key={c} value={c}>
								{c}
							</MenuItem>
						))}
					</TextField>
				</Grid>

				{/* Price Range */}
				<Grid size={{xs: 12, md: 12, lg: 2}}>
					<Typography gutterBottom>
						{priceToLocalString(filters.maxPrice)}
						{priceToLocalString(filters.minPrice)} -
					</Typography>
					<Slider
						value={[filters.maxPrice, filters.minPrice]}
						onChange={handlePriceChange}
						valueLabelDisplay='auto'
						min={1}
						max={1000}
						step={10}
					/>
				</Grid>

				{/* Manufacturer */}
				<Grid size={{xs: 12, md: 6, lg: 2}}>
					<Autocomplete
						options={manufacturers}
						value={filters.manufacturer || ""}
						onChange={(_, v) => onChange({...filters, manufacturer: v || ""})}
						renderInput={(params) => (
							<TextField {...params} label='Manufacturer' />
						)}
					/>
				</Grid>

				{/* Min Discount */}
				<Grid size={{xs: 12, md: 6, lg: 2}}>
					<TextField
						type='number'
						fullWidth
						label='Min Discount %'
						value={filters.minDiscount}
						onChange={(e) =>
							onChange({...filters, minDiscount: +e.target.value})
						}
						inputProps={{min: 0, max: 100}}
					/>
				</Grid>

				{/* Switches */}
				<Grid size={{xs: 12, md: 6, lg: 2}}>
					<Stack spacing={1}>
						<FormControlLabel
							control={
								<Switch
									checked={filters.isSale}
									onChange={(e) =>
										onChange({...filters, isSale: e.target.checked})
									}
								/>
							}
							label='On Sale'
						/>
						<FormControlLabel
							control={
								<Switch
									checked={filters.inStock}
									onChange={(e) =>
										onChange({...filters, inStock: e.target.checked})
									}
								/>
							}
							label='In Stock Only'
						/>
					</Stack>
				</Grid>

				{/* Sort */}
				<Grid size={{xs: 12, md: 6, lg: 2}}>
					<TextField
						select
						fullWidth
						label='Sort By'
						value={filters.sortBy}
						onChange={(e) =>
							onChange({
								...filters,
								sortBy: e.target.value as ProductFilters["sortBy"],
							})
						}
					>
						{sortOptions.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				</Grid>

				{/* Items per page */}
				<Grid size={{xs: 12, md: 6, lg: 2}}>
					<TextField
						select
						fullWidth
						label='Items per page'
						value={filters.limit}
						onChange={(e) =>
							onChange({...filters, limit: parseInt(e.target.value)})
						}
					>
						{limitOptions.map((option) => (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						))}
					</TextField>
				</Grid>

				{/* Reset Button */}
				<Grid size={{xs: 12, md: 6, lg: 2}}>
					<Button
						fullWidth
						variant='outlined'
						color='error'
						onClick={resetFilters}
						sx={{mt: 2}}
					>
						Reset All Filters
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Filters;
