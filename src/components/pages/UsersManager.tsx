import {useEffect, useState} from "react";
import {DataGrid, type GridColDef, GridActionsCellItem} from "@mui/x-data-grid";
import {Box, Chip, MenuItem, Select} from "@mui/material";
import {CheckCircle, Cancel} from "@mui/icons-material";
import {getUsers, updateUserStatus, updateUserRole} from "../../services/users";
import type {User} from "../../interfaces/Users";
import {formatDate} from "../../assets/helpets";
import {socket} from "../../services/sockets";

const UsersManager = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);

	// Fetch users
	useEffect(() => {
		getUsers()
			.then((res) => {
				setUsers(res.data);
			})
			.finally(() => setLoading(false));
	}, []);

	// Socket.io realtime
	useEffect(() => {
		socket.on("userUpdated", (updatedUser: User) => {
			setUsers((prev) =>
				prev.map((u) => (u._id === updatedUser._id ? updatedUser : u)),
			);
		});

		return () => {
			socket.off("userUpdated");
		};
	}, []);

	const handleStatusToggle = async (user: User) => {
		await updateUserStatus(user._id, !user.profile.isActive);
	};

	const handleRoleChange = async (userId: string, role: string) => {
		await updateUserRole(userId, role);
	};

	const columns: GridColDef[] = [
		{
			field: "firstName",
			headerName: "First Name",
			flex: 1,
			valueGetter: (_, row) => row.profile.firstName,
		},
		{
			field: "email",
			headerName: "Email",
			flex: 1.5,
		},
		{
			field: "role",
			headerName: "Role",
			flex: 1,
			renderCell: (params) => (
				<Select
					size='small'
					value={params.row.profile.role}
					onChange={(e) => handleRoleChange(params.row._id, e.target.value)}
				>
					<MenuItem value='Admin'>Admin</MenuItem>
					<MenuItem value='seller'>Seller</MenuItem>
					<MenuItem value='customer_support'>Customer Support</MenuItem>
					<MenuItem value='customer'>Customer</MenuItem>
				</Select>
			),
		},
		{
			field: "lastLogin",
			headerName: "Last Login",
			flex: 1.2,
			valueFormatter: (v) => formatDate(v),
		},
		{
			field: "status",
			headerName: "Status",
			flex: 1,
			renderCell: (params) => (
				<Chip
					label={params.row.profile.isActive ? "Active" : "Inactive"}
					color={params.row.profile.isActive ? "success" : "error"}
					size='small'
				/>
			),
		},
		{
			field: "actions",
			type: "actions",
			headerName: "Actions",
			getActions: (params) => [
				<GridActionsCellItem
					icon={params.row.profile.isActive ? <Cancel /> : <CheckCircle />}
					label='Toggle Status'
					onClick={() => handleStatusToggle(params.row)}
				/>,
			],
		},
	];

	return (
		<Box sx={{height: 600, width: "100%"}}>
			<DataGrid
				rows={users}
				columns={columns}
				getRowId={(row) => row._id}
				pageSizeOptions={[5, 10, 20]}
				initialState={{
					pagination: {
						paginationModel: {pageSize: 10, page: 0},
					},
				}}
				loading={loading}
				disableRowSelectionOnClick
			/>
		</Box>
	);
};

export default UsersManager;
