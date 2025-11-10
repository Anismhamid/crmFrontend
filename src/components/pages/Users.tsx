import {useEffect, useState, type FunctionComponent} from "react";
import {getAllUsers} from "../../services/users";
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import type {User} from "../../interfaces/Users";
import CircularProgressBar from "../../assets/CircularProgressBar";

interface UsersProps {}

const Users: FunctionComponent<UsersProps> = () => {
	const [users, setProduct] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		getAllUsers()
			.then((res) => {
				setProduct(res);
			})
			.catch((error) => {
				console.error(error);
				setError("Failed to load users");
			})
			.finally(() => setLoading(false));
	}, []);

	if (error)
		return (
			<Typography color='error' align='center' sx={{mt: 3}}>
				{error}
			</Typography>
		);

	if (loading) return <CircularProgressBar />;

	return (
		<>
			<TableContainer>
				<Table component={Paper} elevation={3}>
					<TableHead>
						<TableRow>
							<TableCell align='center'>user name</TableCell>
							<TableCell align='center'>email</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.length ? (
							users.map((user: User, i) => (
								<TableRow hover key={i}>
									<TableCell>{user.profile.firstName}</TableCell>
									<TableCell>{user.email}</TableCell>
								</TableRow>
							))
						) : (
							<tr>
								<td>No users found</td>
								<td>No users found</td>
							</tr>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default Users;
