import {CircularProgress, circularProgressClasses} from "@mui/material";
import type {FunctionComponent} from "react";

interface CircularProgressBarProps {}

const CircularProgressBar: FunctionComponent<CircularProgressBarProps> = () => {
	return (
		<main style={{display: "flex", alignContent: "center", justifyContent: "center"}}>
			<CircularProgress
				variant='indeterminate'
				disableShrink
				enableTrackSlot
				sx={(theme) => ({
					color: "#fff",
					animationDuration: "550ms",
					[`& .${circularProgressClasses.circle}`]: {
						strokeLinecap: "square",
					},
					[`& .${circularProgressClasses.track}`]: {
						opacity: 1,
						stroke: (theme.vars || theme).palette.grey[400],
						...theme.applyStyles("light", {
							stroke: (theme.vars || theme).palette.grey[200],
						}),
					},
					...theme.applyStyles("dark", {
						color: "#272727",
					}),
				})}
				size={40}
				thickness={4}
			/>
		</main>
	);
};

export default CircularProgressBar;
