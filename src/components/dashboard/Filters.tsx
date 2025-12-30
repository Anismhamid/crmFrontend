import {Box, Grid} from "@mui/material";
import type {FunctionComponent} from "react";

interface filtersProps {}

const filters: FunctionComponent<filtersProps> = () => {
	return (
		<>
			<Box
				component={"main"}
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					mb: 5,
				}}
			>
				<Grid container spacing={2}>
					<Grid size={{xs: 12, sm: 3}}>
						<Box>filter 1</Box>
					</Grid>
					<Grid size={{xs: 12, sm: 3}}>
						<Box>filter 2</Box>
					</Grid>
					<Grid size={{xs: 12, sm: 3}}>
						<Box>filter 3</Box>
					</Grid>
					<Grid size={{xs: 12, sm: 3}}>
						<Box>filter 4</Box>
					</Grid>
				</Grid>
			</Box>
			<Box
				component={"main"}
				sx={{display: "flex", alignItems: "center", justifyContent: "center"}}
			>
				<Grid container spacing={2}>
					<Grid size={{xs: 12, sm: 3}}>
						<Box>filter 5</Box>
					</Grid>
					<Grid size={{xs: 12, sm: 3}}>
						<Box>filter 6</Box>
					</Grid>
					<Grid size={{xs: 12, sm: 3}}>
						<Box>filter 7</Box>
					</Grid>
					<Grid size={{xs: 12, sm: 3}}>
						<Box>filter 8</Box>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default filters;
