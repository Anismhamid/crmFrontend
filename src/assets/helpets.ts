import type { User } from "../interfaces/Users";

export const formatDate = (dateString?: string) => {
	if (!dateString) return "No avalible date";
	return new Date(dateString).toLocaleDateString("he-IL", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

export const getRoleColor = (role: User["profile"]["role"]) => {
	switch (role) {
		case "admin":
			return "error";
		case "seller":
			return "success";
		case "customer_support":
			return "info";
		case "customer":
			return "warning";
		default:
			return "default";
	}
};
