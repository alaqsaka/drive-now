import {
	Box,
	Typography,
	Card,
	CardContent,
	Grid,
	FormControl,
	OutlinedInput,
	FormLabel,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Container,
	FormHelperText,
	TextField,
} from "@mui/material";
import { InputUnstyled } from "@mui/base";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import api from "src/api";
import { useParams, useNavigate } from "react-router-dom";
// import Card from "../../theme/overrides/Card";

function MobilForm() {
	const { carId } = useParams();
	const [open, setOpen] = useState(false);
	const editMode = Boolean(carId);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [preview, setPreview] = useState("");
	const [file, setFile] = useState("");
	const [name, setName] = useState("");
	const [totalSeat, setTotalSeat] = useState("");
	const [fuelType, setFuelType] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
		getValues,
		control,
	} = useForm({
		defaultValues: {
			name: "",
			price: "",
			description: "",
			totalSeat: "",
			fuelType: "",
			image: "",
		},
	});

	const loadImage = (e) => {
		const image = e.target.files[0];
		setFile(image);
		console.log(image);

		setPreview(URL.createObjectURL(image));
	};

	const submitForm = async (data) => {
		try {
			if (editMode) {
				// const response = await api.put(`/lokasi/${lokasiId}`, data);
				// console.log(response);
				// navigate("/dashboard/lokasi");
			} else {
				// data["image"]
				// data["image"] = file;
				// console.log("file image ", file);
				const formData = new FormData();

				formData.append("name", name);
				formData.append("price", price);
				formData.append("description", description);
				formData.append("fuelType", fuelType);
				formData.append("totalSeat", totalSeat);
				formData.append("image", file);
				// console.log(first)
				console.log("FORM DATA", formData);
				console.log(file);
				console.log("image data", data["image"]);
				setValue("image", file);
				console.log("Dataa ", data);
				const response = await api.post("/mobil", formData, {
					headers: {
						"Content-type": "multipart/form-data",
					},
				});
				console.log("add mobil response  ", response);
				setSuccess(response.data.status);
				setOpen(true);
				setPreview(false);
				// reset();
			}
		} catch (error) {
			setOpen(true);
			console.log(error);
			setError(error.response.data.message);
		}
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
		setError("");
		setSuccess("");
	};

	return (
		<Container>
			<Typography variant="h4" gutterBottom>
				{editMode ? "Edit Mobil" : "Tambah Mobil"}
			</Typography>

			<Card>
				<form onSubmit={handleSubmit(submitForm)}>
					<CardContent>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<InputLabel shrink>Model Mobil</InputLabel>
								<FormControl fullWidth>
									<TextField onChange={(e) => setName(e.target.value)} />
									{/* <Controller
										name="name"
										rules={{ required: true }}
										control={control}
										render={({ field }) => (
											<OutlinedInput
												error={errors.name?.type === "required"}
												placeholder="Nama model mobil"
												{...field}
												fullWidth
											/>
										)}
									/> */}
									<FormHelperText sx={{ color: "red" }}>
										{errors.name?.type === "required" && "Nama lokasi Tidak Boleh Kosong"}
									</FormHelperText>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6}>
								<InputLabel shrink>Harga per hari</InputLabel>
								<FormControl fullWidth>
									<TextField onChange={(e) => setPrice(e.target.value)} />
									{/* <OutlinedInput
										// defaultValue={editMode ? lokasi?.description : ""}
										error={errors.price?.type === "required"}
										placeholder="Harga Sewa Mobil"
										name="price"
										{...register("price", { required: "Harga sewa mobil tidak boleh kosong" })}
									/> */}
									<FormHelperText sx={{ color: "red" }}>
										{errors.price?.type === "required" && "Harga sewa mobil Tidak Boleh Kosong"}
									</FormHelperText>
								</FormControl>
							</Grid>
						</Grid>

						<Grid container spacing={2} sx={{ marginTop: "16px" }}>
							<Grid item xs={12} sm={6}>
								<InputLabel shrink>Jumlah Kursi</InputLabel>

								<FormControl fullWidth>
									<TextField onChange={(e) => setTotalSeat(e.target.value)} />
									{/* <OutlinedInput
										// defaultValue={editMode ? lokasi?.description : ""}
										error={errors.totalSeat?.type === "required"}
										placeholder="Jumlah Kursi Mobil"
										name="totalSeat"
										{...register("totalSeat", { required: "Jumlah kursi mobil tidak boleh kosong" })}
									/> */}
									<FormHelperText sx={{ color: "red" }}>
										{errors.totalSeat?.type === "required" && "Jumlah kursi mobil Tidak Boleh Kosong"}
									</FormHelperText>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6}>
								<InputLabel shrink>Detail Mobil</InputLabel>
								<FormControl fullWidth>
									<TextField onChange={(e) => setDescription(e.target.value)} />
									{/* <OutlinedInput
										// defaultValue={editMode ? lokasi?.description : ""}
										error={errors.description?.type === "required"}
										placeholder="Deskripsi Mobil"
										name="description"
										{...register("description", { required: "Description mobil tidak boleh kosong" })}
									/> */}
									<FormHelperText sx={{ color: "red" }}>
										{errors.description?.type === "required" && "Description mobil Tidak Boleh Kosong"}
									</FormHelperText>
								</FormControl>
							</Grid>
						</Grid>

						<Grid container spacing={2} sx={{ marginTop: "16px" }}>
							<Grid item xs={12} sm={6}>
								<InputLabel shrink>Jenis Bensin</InputLabel>
								<FormControl fullWidth>
									<TextField onChange={(e) => setFuelType(e.target.value)} />
									{/* <OutlinedInput
										// defaultValue={editMode ? lokasi?.description : ""}
										error={errors.fuelType?.type === "required"}
										placeholder="Jenis Bensin Mobil"
										name="fuelType"
										{...register("fuelType", { required: "Jenis Bensin mobil tidak boleh kosong" })}
									/> */}
									<FormHelperText sx={{ color: "red" }}>
										{errors.fuelType?.type === "required" && "Jenis Bensin mobil tidak Boleh Kosong"}
									</FormHelperText>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6}>
								<InputLabel shrink>Foto Mobil</InputLabel>
								<FormControl fullWidth>
									<input type="file" className="file-input" onChange={loadImage} />
									<FormHelperText sx={{ color: "red" }}>
										{errors.image?.type === "required" && "Image mobil Tidak Boleh Kosong"}
									</FormHelperText>
								</FormControl>
								{preview ? (
									<figure className="image is-128x128">
										<img src={preview} alt="Preview Image" />
									</figure>
								) : (
									""
								)}
							</Grid>
						</Grid>

						<Grid container spacing={2} sx={{ marginTop: "16px" }}>
							<Grid item xs={12} sm={6}>
								<Button variant="outlined" size="large" fullWidth>
									Cancel
								</Button>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Button variant="contained" size="large" fullWidth type="submit">
									{editMode ? "Edit Data Mobil" : "Buat Data Mobil"}
								</Button>
							</Grid>
						</Grid>
					</CardContent>
				</form>
			</Card>
		</Container>
	);
}

export default MobilForm;
