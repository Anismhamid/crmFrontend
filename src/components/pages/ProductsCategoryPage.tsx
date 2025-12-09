import {useParams} from "react-router-dom";
import ProductsCategory from "./ProductsCategory";
import {useEffect, useState} from "react";
import type {Product} from "../../interfaces/Products";
import {getProductsByCategory} from "../../services/products";

export default function ProductsCategoryPage() {
	const {category} = useParams();
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);

	const lowerCaseCategory = category?.toLocaleLowerCase();

	useEffect(() => {
		getProductsByCategory(lowerCaseCategory as string)
			.then((res) => {
				setLoading(true);
				setProducts(res);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	}, [category]);

	return (
		<ProductsCategory
			products={products}
			loading={loading}
			showFilters={true} // category page usually no global filters
		/>
	);
}
