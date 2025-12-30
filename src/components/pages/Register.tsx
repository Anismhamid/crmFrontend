import {Box, Button, Grid, MenuItem, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import type {FunctionComponent} from "react";
import * as yup from "yup";
import {registerNewUser} from "../../services/users";
import {Link, useNavigate} from "react-router-dom";
import {initialValues, type UserRegisterationType} from "../../interfaces/Users";
import CircularProgressBar from "../../assets/CircularProgressBar";

interface RegisterProps {}

const phoneRegex = /^0\d{1,2}-?\d{7}$/;

const validationSchema = yup.object({
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup
		.string()
		.min(8, "Minimum 8 characters")
		.required("Password is required"),
	profile: yup.object({
		firstName: yup.string().required(),
		lastName: yup.string().required(),
		avatar: yup
			.object({url: yup.string().nonNullable(), alt: yup.string().nullable()})
			.nullable(),
		phone: yup.string().matches(phoneRegex, "Invalid phone number").required(),
		position: yup.string(),
		address: yup.object({
			city: yup.string().required(),
			street: yup.string().required(),
			houseNo: yup.string(),
			zipCode: yup.string(),
		}),
		role: yup.string().required(),
	}),
});

const Register: FunctionComponent<RegisterProps> = () => {
	const navigate = useNavigate();

	const formik = useFormik<UserRegisterationType>({
		initialValues,
		validationSchema,
		onSubmit: async (values, {resetForm, setStatus, setSubmitting}) => {
			console.log(values);
			try {
				await registerNewUser(values);
				navigate("/");
				resetForm();
			} catch (err) {
				setStatus("Registration failed");
			} finally {
				setSubmitting(false);
			}
		},
	});
	return (
		<Box component={"main"}>
			<h1>Create your own account</h1>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					margin: "160px auto",
					padding: 2,
				}}
			>
				<form
					noValidate
					autoComplete='off'
					style={{width: "100%", maxWidth: 800}}
					onSubmit={formik.handleSubmit}
				>
					<Grid size={{xs: 12, md: 6}}>
						<h3>Registration</h3>
					</Grid>
					<Grid container spacing={2}>
						<Grid size={{xs: 12, md: 6}}>
							<TextField
								fullWidth
								margin='normal'
								name='profile.firstName'
								label='First name'
								value={formik.values.profile.firstName}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={
									formik.touched.profile?.firstName &&
									Boolean(formik.errors.profile?.firstName)
								}
								helperText={
									formik.touched.profile?.firstName &&
									formik.errors.profile?.firstName
								}
							/>
						</Grid>
						<Grid size={{xs: 12, md: 6}}>
							<TextField
								fullWidth
								margin='normal'
								name='profile.lastName'
								label='Last name'
								value={formik.values.profile.lastName}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={
									formik.touched.profile?.lastName &&
									Boolean(formik.errors.profile?.lastName)
								}
								helperText={
									formik.touched.profile?.lastName &&
									formik.errors.profile?.lastName
								}
							/>
						</Grid>
						<Grid size={{xs: 12, md: 6}}>
							<TextField
								fullWidth
								margin='normal'
								name='email'
								label='Email'
								value={formik.values.email}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={
									formik.touched.email && Boolean(formik.errors.email)
								}
								helperText={formik.touched.email && formik.errors.email}
							/>
						</Grid>
						<Grid size={{xs: 12, md: 6}}>
							<TextField
								fullWidth
								margin='normal'
								name='password'
								label='Password'
								type='password'
								value={formik.values.password}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={
									formik.touched.password &&
									Boolean(formik.errors.password)
								}
								helperText={
									formik.touched.password && formik.errors.password
								}
							/>
						</Grid>
						<Grid size={{xs: 12, md: 6}}>
							<TextField
								fullWidth
								margin='normal'
								name='profile.phone'
								label='Phone'
								value={formik.values.profile.phone}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={
									formik.touched.profile?.phone &&
									Boolean(formik.errors.profile?.phone)
								}
								helperText={
									formik.touched.profile?.phone &&
									formik.errors.profile?.phone
								}
							/>
						</Grid>
						<Grid size={{xs: 12, md: 6}}>
							<TextField
								fullWidth
								margin='normal'
								name='profile.address.city'
								label='City'
								value={formik.values.profile.address.city}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={
									formik.touched.profile?.address?.city &&
									Boolean(formik.errors.profile?.address?.city)
								}
								helperText={
									formik.touched.profile?.address?.city &&
									formik.errors.profile?.address?.city
								}
							/>
						</Grid>
						<Grid size={{xs: 12, md: 6}}>
							<TextField
								fullWidth
								margin='normal'
								name='profile.address.street'
								label='Street'
								value={formik.values.profile.address.street}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={
									formik.touched.profile?.address?.street &&
									Boolean(formik.errors.profile?.address?.street)
								}
								helperText={
									formik.touched.profile?.address?.street &&
									formik.errors.profile?.address?.street
								}
							/>
						</Grid>
						<Grid size={{xs: 12, md: 6}}>
							<TextField
								type='text'
								fullWidth
								margin='normal'
								name='profile.address.houseNo'
								label='House.No'
								value={formik.values.profile.address.houseNo}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={
									formik.touched.profile?.address?.houseNo &&
									Boolean(formik.errors.profile?.address?.houseNo)
								}
								helperText={
									formik.touched.profile?.address?.houseNo &&
									formik.errors.profile?.address?.houseNo
								}
							/>
						</Grid>
						<Grid size={{xs: 12, md: 6}}>
							<TextField
								type='text'
								fullWidth
								margin='normal'
								name='profile.address.zipCode'
								label='Zip Code'
								value={formik.values.profile.address.zipCode}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={
									formik.touched.profile?.address?.zipCode &&
									Boolean(formik.errors.profile?.address?.zipCode)
								}
								helperText={
									formik.touched.profile?.address?.zipCode &&
									formik.errors.profile?.address?.zipCode
								}
							/>
						</Grid>
						<Grid size={{xs: 12, md: 6}}>
							<TextField
								select
								fullWidth
								margin='normal'
								name='profile.role'
								label='Role'
								value={formik.values.profile.role}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={
									formik.touched.profile?.role &&
									Boolean(formik.errors.profile?.role)
								}
								helperText={
									formik.touched.profile?.role &&
									formik.errors.profile?.role
								}
							>
								<MenuItem value='seller'>Seller</MenuItem>
								<MenuItem value='customer'>Customer</MenuItem>
								<MenuItem value='customer_support'>
									Customer support
								</MenuItem>
							</TextField>
						</Grid>
						<Grid size={{xs: 12, md: 6}}>
							<TextField
								select
								fullWidth
								margin='normal'
								name='profile.position'
								label='Position'
								value={formik.values.profile.position}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={
									formik.touched.profile?.position &&
									Boolean(formik.errors.profile?.position)
								}
								helperText={
									formik.touched.profile?.position &&
									formik.errors.profile?.position
								}
							>
								<MenuItem value='manager'>Manager</MenuItem>
								<MenuItem value='staff'>Staff</MenuItem>
								<MenuItem value='support'>Support</MenuItem>
								<MenuItem value=''>None</MenuItem>
							</TextField>
						</Grid>
					</Grid>

					<Button
						type='submit'
						variant='contained'
						fullWidth
						sx={{
							mt: 3,
							mb: 2,
							py: 1.5,
							fontSize: "1rem",
						}}
						disabled={formik.isSubmitting}
					>
						{formik.isSubmitting ? <CircularProgressBar /> : "Register"}
					</Button>
					<Typography sx={{textAlign: "center"}}>
						Already have account? <Link to={"/login"}>Login</Link>
					</Typography>
				</form>
			</Box>
		</Box>
	);
};

export default Register;
