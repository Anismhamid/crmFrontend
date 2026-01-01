export type UserRole = "Admin" | "customer" | "customer_support" | "seller";

export interface User {
	_id?: string;
	email: string;

	profile: {
		firstName: string;
		lastName: string;
		position?: string;
		phone?: string;

		avatar?: {
			url: string;
			alt?: string;
		};

		address?: {
			city: string;
			street?: string;
			houseNo?: string;
			zipCode?: string;
		};
		role: UserRole;
		isActive: boolean;
	};
	lastLogin?: string;
}

export interface UserRegisterationType {
	email: string;
	password: string;
	profile: {
		firstName: string;
		lastName: string;
		avatar?: {
			url?: string;
			alt?: string;
		};
		phone: string;
		position?: string;
		address: {
			city: string;
			street?: string;
			houseNo?: number;
			zipCode?: string;
		};
		role: string;
	};
}

export const initialValues: UserRegisterationType = {
	email: "",
	password: "",
	profile: {
		firstName: "",
		lastName: "",
		avatar: {
			url: "https://images.unsplash.com/photo-1758844899311-8d16093ff165?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8MjAyNnxlbnwwfHwwfHx8MA%3D%3D",
			alt: "profile picture",
		},
		phone: "",
		position: "",
		address: {
			city: "",
			street: "",
			houseNo: 0,
			zipCode: "",
		},
		role: "",
	},
};
