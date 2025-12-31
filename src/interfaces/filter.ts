export interface ProductFilters {
	category: string;
	isSale: boolean;
	minDiscount: number;
	manufacturer: string;
	inStock: boolean;
	minPrice: number;
	maxPrice: number;
	sortBy: "newest" | "priceAsc" | "priceDesc";
	limit: number;
}
