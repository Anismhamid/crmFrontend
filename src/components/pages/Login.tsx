import {Box, Button, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {useAuth} from "../../context/UserContext";
import {Link, useNavigate} from "react-router-dom";
import type {FunctionComponent} from "react";
import CircularProgressBar from "../../assets/CircularProgressBar";

const validationSchema = yup.object({
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup
		.string()
		.min(6, "Minimum 6 characters")
		.required("Password is required"),
});

const Login: FunctionComponent = () => {
	const navigate = useNavigate();
	const {login} = useAuth();

	// useEffect(() => {
	// 	if (localStorage.getItem("token")) navigate("/");
	// }, [login]);

	const formik = useFormik({
		initialValues: {email: "", password: ""},
		validationSchema,
		onSubmit: async (values, {resetForm, setStatus}) => {
			try {
				await login(values.email, values.password);
				navigate("/");
			} catch (err) {
				setStatus("Invalid email or password");
			}
			resetForm();
		},
	});

	return (
		<Box component='main'>
			{formik.status && <Typography color='error'>{formik.status}</Typography>}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					maxWidth: 300,
					margin: "160px auto",
					padding: 2,
				}}
			>
				<form noValidate style={{width: "100%"}} onSubmit={formik.handleSubmit}>
					<TextField
						fullWidth
						margin='normal'
						id='email'
						name='email'
						label='Email'
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
					/>

					<TextField
						fullWidth
						margin='normal'
						id='password'
						name='password'
						label='Password'
						type='password'
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
					/>

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
						{formik.isSubmitting ? <CircularProgressBar /> : "Login"}
					</Button>
					<Typography sx={{textAlign: "center"}}>
						Don't have an account?{" "}
						<Link style={{display: "block"}} to={"/register"}>
							Register now
						</Link>
					</Typography>
				</form>
			</Box>
		</Box>
	);
};

export default Login;
