export interface Product {
	product_name: string;
	category: string;
	price: number;
	quantity_in_stock: number;
	description: string;
	manufacturer: string;
	image: {
		url: string;
		alt: string;
	};
	sales: {
		isSale: boolean;
		discount: number;
	};
	review: [];
}
