import { useContext } from "react";
import { CRMContext } from "../../context/CRMContext";

// Custom hook for easy access
export const useCRM = () => {
	const context = useContext(CRMContext);
	if (!context) {
		throw new Error("useCRM must be used within a CRMProvider");
	}
	return context;
};
