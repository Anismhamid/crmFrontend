export interface Review {
	_id?: string;
	product: string | {_id: string; product_name?: string};
	user: string | {_id: string; profile?: {firstName: string; lastName: string}};
	rating: number;
	comment?: string;
	createdAt?: string;
	updatedAt?: string;
}
