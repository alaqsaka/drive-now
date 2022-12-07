import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// @mui
import { useDispatch, useSelector } from "react-redux";
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import { userLogin } from "src/features/user/userActions";
import Error from "src/components/Error";
// ----------------------------------------------------------------------

export default function LoginForm() {
	const { loading, error, userInfo, userToken } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// redirect authenticated user to profile screen
	useEffect(() => {
		if (userInfo) {
			navigate("/dashboard");
		}
	}, [navigate, userInfo]);

	const submitForm = (data) => {
		dispatch(userLogin(data));
	};

	const [showPassword, setShowPassword] = useState(false);

	return (
		<>
			{error && <Error>{error}</Error>}
			<form onSubmit={handleSubmit(submitForm)}>
				<Stack spacing={3}>
					<TextField
						error={errors.email?.type === "required"}
						helperText={errors.email?.type === "required" && "Email Tidak Boleh Kosong"}
						name="email"
						label="Email address"
						{...register("email", { required: "Email Tidak Boleh Kosong" })}
					/>

					<TextField
						error={errors.password?.type === "required"}
						helperText={errors.password?.type === "required" && "Password Tidak Boleh Kosong"}
						name="password"
						label="Password"
						type={showPassword ? "text" : "password"}
						{...register("password", { required: "Password Tidak Boleh Kosong" })}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
										<Iconify icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</Stack>

				<LoadingButton
					disabled={loading}
					sx={{ marginTop: "16px" }}
					fullWidth
					size="large"
					type="submit"
					variant="contained"
				>
					Login
				</LoadingButton>
			</form>
		</>
	);
}
