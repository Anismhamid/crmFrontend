import type {FunctionComponent} from "react";
import Style from "./Footer.module.css";
import {Link} from "react-router-dom";
import {Box, MenuItem, MenuList, useMediaQuery, useTheme} from "@mui/material";
import {drawerWidth} from "./dashboard/Navbar";
import {useFormik} from "formik";
import * as yup from "yup";
interface FooterProps {
	open: boolean;
}

const Footer: FunctionComponent<FooterProps> = ({open = true}) => {
	const theme = useTheme();
	const mobile = useMediaQuery(theme.breakpoints.down("sm"));

	const formik = useFormik({
		initialValues: {email: ""},
		validationSchema: yup.object({
			email: yup.string().email("Invalid email").required("Email is required"),
		}),
		onSubmit: (data, {resetForm}) => {
			console.log(data);
			resetForm();
		},
	});
	return (
		<>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					marginLeft: !mobile ? (open ? `${drawerWidth}px` : 0) :`60px` ,
					transition: "margin-left 0.2s",
				}}
				className={`${Style.foterDiv} p-3`}
			>
				<Box className='row p-1'>
					<Box className='col-6 col-md-2 mb-3'>
						<h5>Settings</h5>
						<MenuList className='nav flex-column'>
							<MenuItem className='nav-item mb-2'>
								<Link to='/' className='nav-link p-0 text-warning'>
									Dashboard
								</Link>
							</MenuItem>
							<MenuItem className='nav-item mb-2'>
								<Link to='#' className='nav-link p-0 text-white'>
									Products
								</Link>
							</MenuItem>
							<MenuItem className='nav-item mb-2'>
								<Link to='#' className='nav-link p-0 text-white'>
									Customers
								</Link>
							</MenuItem>
							<MenuItem className='nav-item mb-2'>
								<Link to='#' className='nav-link p-0 text-white'>
									FAQs
								</Link>
							</MenuItem>
							<MenuItem className='nav-item mb-2'>
								<Link to='#' className='nav-link p-0 text-white'>
									About
								</Link>
							</MenuItem>
						</MenuList>
					</Box>
					<Box className='col-6 col-md-2 mb-3'>
						<h5>Docs</h5>
						<MenuList className='nav flex-column'>
							<MenuItem className='nav-item mb-2'>
								<Link to='/' className='nav-link p-0 text-white'>
									Control
								</Link>
							</MenuItem>
							<MenuItem className='nav-item mb-2'>
								<Link to='#' className='nav-link p-0 text-white'>
									Features
								</Link>
							</MenuItem>
							<MenuItem className='nav-item mb-2'>
								<Link to='#' className='nav-link p-0 text-white'>
									Pricing
								</Link>
							</MenuItem>
							<MenuItem className='nav-item mb-2'>
								<Link to='#' className='nav-link p-0 text-white'>
									FAQs
								</Link>
							</MenuItem>
							<MenuItem className='nav-item mb-2'>
								<Link to='#' className='nav-link p-0 text-white'>
									About
								</Link>
							</MenuItem>
						</MenuList>
					</Box>
					<Box className='col-6 col-md-2 mb-3'>
						<h5>Section3</h5>
						<MenuList className='nav flex-column'>
							<MenuItem className='nav-item mb-2'>
								<Link to='#' className='nav-link p-0 text-white'>
									Home
								</Link>
							</MenuItem>
							<MenuItem className='nav-item mb-2'>
								<Link to='#' className='nav-link p-0 text-white'>
									Features
								</Link>
							</MenuItem>
							<MenuItem className='nav-item mb-2'>
								<Link to='#' className='nav-link p-0 text-white'>
									Pricing
								</Link>
							</MenuItem>
							<MenuItem className='nav-item mb-2'>
								<Link to='#' className='nav-link p-0 text-white'>
									FAQs
								</Link>
							</MenuItem>
							<MenuItem className='nav-item mb-2'>
								<Link to='#' className='nav-link p-0 text-white'>
									About
								</Link>
							</MenuItem>
						</MenuList>
					</Box>
					<div className='d-flex flex-column flex-sm-row w-100 gap-2'>
						<label htmlFor='email' className='visually-hidden'>
							Email address
						</label>

						<input
							id='email'
							name='email'
							type='email'
							className='form-control'
							placeholder='Email address'
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>

						<button className='btn btn-primary' type='submit'>
							Subscribe
						</button>
					</div>

					{formik.touched.email && formik.errors.email && (
						<div className='text-danger mt-1'>{formik.errors.email}</div>
					)}
				</Box>
			</Box>
		</>
	);
};

export default Footer;
