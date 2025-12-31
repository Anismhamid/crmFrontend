import {useCallback, useEffect, useRef, useState} from "react";
import type {ProductFilters} from "../../interfaces/filter";
import {socket} from "../../services/sockets";
import type {Product} from "../../interfaces/Products";
import {searchProducts} from "../../services/products";

interface UseProductsOptions {
	initialFilters?: ProductFilters;
	pageSize?: number;
}

export const useProductsWithFilters = ({
	initialFilters,
	pageSize = 12,
}: UseProductsOptions = {}) => {
	const [filters, setFilters] = useState<ProductFilters>(
		initialFilters || {
			category: "",
			isSale: false,
			minDiscount: 0,
			manufacturer: "",
			inStock: false,
			minPrice: 1,
			maxPrice: 1000,
			sortBy: "newest",
			limit: pageSize,
		},
	);

	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState(1);

	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const fetchProducts = useCallback(
		async (activeFilters = filters, pageNumber = page) => {
			try {
				setLoading(true);
				setError(null);

				const params: ProductFilters = {
					...activeFilters,
					limit: pageSize,
				};

				const data: Product[] = await searchProducts(params, pageNumber);
				setProducts(Array.isArray(data) ? data : []);
			} catch (err: any) {
				setError(err?.response?.data?.message || "Failed to load products");
			} finally {
				setLoading(false);
			}
		},
		[filters, page, pageSize],
	);


	// ⏱ Debounce
	useEffect(() => {
		if (debounceRef.current) clearTimeout(debounceRef.current);

	debounceRef.current = setTimeout(() => {
		fetchProducts(filters, page);
	}, 400);


		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
		};
	}, [filters, page, fetchProducts]);

	// 🔄 Reset page on filter change
	useEffect(() => {
		setPage(1);
	}, [filters]);

	// 🔔 Socket updates
	useEffect(() => {
		socket.on("productUpdated", (data) => {
			setProducts((prev) =>
				prev.map((p) => (p._id === data.productId ? {...p, ...data.changes} : p)),
			);
		});

		return () => {
			socket.off("productUpdated");
		};
	}, []);

	const resetFilters = () => {
		setFilters({
			category: "",
			isSale: false,
			minDiscount: 0,
			manufacturer: "",
			inStock: false,
			minPrice: 1,
			maxPrice: 1000,
			sortBy: "newest",
			limit: pageSize,
		});
		setPage(1);
	};

	return {
		products,
		loading,
		error,
		filters,
		setFilters,
		page,
		setPage,
		resetFilters,
		refetch: () => fetchProducts(filters),
	};
};
