import {
	Typography,
	Card,
	CardContent,
	Grid,
	FormControl,
	OutlinedInput,
	InputLabel,
	Button,
	Container,
	FormHelperText,
	Snackbar,
	Alert,
	TextField,
} from "@mui/material";
import api from "src/api";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

function LokasiForm() {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [lokasi, setLokasi] = useState({});
	const { lokasiId } = useParams();
	const editMode = Boolean(lokasiId);
	const {
		register,
		handleSubmit,
		formState: { errors },

		reset,
	} = useForm({
		defaultValues: {
			name: editMode ? lokasi.name : "",
			description: editMode ? lokasi.description : "",
			personInChargeName: editMode ? lokasi.personInChargeName : "",
			personInChargePhone: editMode ? lokasi.personInChargePhone : "",
		},
	});

	useEffect(() => {
		if (editMode) {
			console.log("edit modee");
			setLoading(true);
			try {
				api
					.get(`lokasi/${lokasiId}`)
					.then((res) => {
						setLokasi(res.data.data);
						setLoading(false);
					})
					.catch((res) => {
						if (res.response.status === 404) {
							setError(res.response.data.message);
						}
						setLoading(false);
					});
				console.log("lokasi ", lokasi);
			} catch (error) {
				console.log("errorr", error);
			}
			// setLoading(false);
		}

		console.log("lokasi useefect ", lokasi);
	}, []);

	console.log("lokasii", lokasi);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
		setError("");
		setSuccess("");
	};

	const submitForm = async (data) => {
		console.log(data);
		try {
			const response = await api.post("/lokasi", data);
			setSuccess(response.data.status);
			setOpen(true);
			reset();
		} catch (error) {
			setOpen(true);
			console.log(error);
			setError(error.response.data.message);
		}
	};

	return (
		<Container>
			<Typography variant="h4" gutterBottom>
				{editMode ? "Edit Lokasi" : "Tambah Lokasi"}
			</Typography>
			<Card>
				<form onSubmit={handleSubmit(submitForm)}>
					<CardContent>
						{editMode ? lokasi.name : ""}
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<InputLabel shrink>Lokasi</InputLabel>
								<FormControl fullWidth>
									{lokasi.name}
									<TextField defaultValue={`${lokasi.name}`} />
									<OutlinedInput
										error={errors.name?.type === "required"}
										placeholder="Nama Lokasi"
										{...register("name", { required: "Lokasi tidak boleh kosong" })}
									/>
									<FormHelperText sx={{ color: "red" }}>
										{errors.name?.type === "required" && "Nama lokasi Tidak Boleh Kosong"}
									</FormHelperText>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6}>
								<InputLabel shrink>Deskripsi Lokasi</InputLabel>
								<FormControl fullWidth>
									<OutlinedInput
										defaultValue={editMode ? lokasi?.description : ""}
										error={errors.description?.type === "required"}
										placeholder="Deskripsi Lokasi"
										name="description"
										{...register("description", { required: "Description lokasi tidak boleh kosong" })}
									/>
									<FormHelperText sx={{ color: "red" }}>
										{errors.description?.type === "required" && "Description lokasi Tidak Boleh Kosong"}
									</FormHelperText>
								</FormControl>
							</Grid>
						</Grid>
						<Grid container spacing={2} mt="16px">
							<Grid item xs={12} sm={6}>
								<InputLabel shrink>Nama Penanggungjawab</InputLabel>
								<FormControl fullWidth>
									<OutlinedInput
										defaultValue={editMode ? lokasi?.personInChargeName : ""}
										error={errors.personInChargeName?.type === "required"}
										placeholder="Nama Penanggungjawab"
										name="personInChargeName"
										{...register("personInChargeName", { required: "Nama Penanggungjawab tidak boleh kosong" })}
									/>
									<FormHelperText sx={{ color: "red" }}>
										{errors.personInChargeName?.type === "required" && "Nama Penanggungjawab Tidak Boleh Kosong"}
									</FormHelperText>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6}>
								<InputLabel shrink>Nomor Telepon Penanggungjawab</InputLabel>
								<FormControl fullWidth>
									<OutlinedInput
										defaultValue={editMode ? lokasi?.personInChargePhone : ""}
										error={errors.personInChargePhone?.type === "required"}
										placeholder="Nomor Telepon Penanggungjawab"
										name="personInChargePhone"
										{...register("personInChargePhone", {
											required: "Nomor Telepon Penanggungjawab tidak boleh kosong",
										})}
									/>
									<FormHelperText sx={{ color: "red" }}>
										{errors.personInChargePhone?.type === "required" && "Nama Penanggungjawab Tidak Boleh Kosong"}
									</FormHelperText>
								</FormControl>
							</Grid>
						</Grid>
						<Grid container spacing={2} sx={{ marginTop: "16px" }}>
							<Grid item xs={12} sm={6}>
								<Button variant="outlined" size="large" fullWidth>
									Cancel
								</Button>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Button variant="contained" type="submit" size="large" fullWidth>
									{editMode ? "Edit Data Lokasi" : "Buat Data Lokasi"}
								</Button>
							</Grid>
						</Grid>
					</CardContent>
				</form>
			</Card>

			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity={success ? "success" : "error"} sx={{ width: "100%" }}>
					{success ? success : error}
				</Alert>
			</Snackbar>
		</Container>
	);
}

export default LokasiForm;
