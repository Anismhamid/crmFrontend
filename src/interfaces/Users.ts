export interface User {
	email: string;
	profile: {
		firstName: string;
		lastName: string;
		avatar?: {
			url: string;
			alt: string;
		};
		phone: string;
		position: string;
		address: {
			city: string;
			street?: string;
			houseNo?: string;
			zipCode: string;
		};
	};
	role: "Admin" | "customer" | "customer support" | "seller";

	isActive: boolean;
	lastLogin?: Date;
}
