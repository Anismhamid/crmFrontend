import {Box} from "@mui/material";
import type {FunctionComponent} from "react";

interface PageNotFoundProps {}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
	return <Box color={"error"}>Page Not Found</Box>;
};

export default PageNotFound;
