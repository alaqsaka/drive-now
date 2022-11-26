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
} from "@mui/material";
import { InputUnstyled } from "@mui/base";
import React from "react";
import { useParams } from "react-router-dom";
// import Card from "../../theme/overrides/Card";

function MobilForm() {
	const { carId } = useParams();
	const editMode = Boolean(carId);

	return (
		<Container>
			<Typography variant="h4" gutterBottom>
				{editMode ? "Edit Mobil" : "Tambah Mobil"}
			</Typography>

			<Card>
				<CardContent>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<InputLabel shrink>Model Mobil</InputLabel>
							<FormControl fullWidth>
								<OutlinedInput placeholder="Nama model mobil" />
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel shrink>Harga per hari</InputLabel>
							<FormControl fullWidth>
								<OutlinedInput placeholder="Harga per hari" />
							</FormControl>
						</Grid>
					</Grid>

					<Grid container spacing={2} sx={{ marginTop: "16px" }}>
						<Grid item xs={12} sm={6}>
							<InputLabel shrink>Jumlah Kursi</InputLabel>
							<FormControl fullWidth>
								<OutlinedInput placeholder="Jumlah kursi mobil" />
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel shrink>Detail Mobil</InputLabel>
							<FormControl fullWidth>
								<OutlinedInput placeholder="Detail mobil" />
							</FormControl>
						</Grid>
					</Grid>
					<Grid container spacing={2} sx={{ marginTop: "16px" }} justifyContent="flex-end">
						<Grid item>
							<Button variant="contained" size="small">
								Tambah Lokasi
							</Button>
						</Grid>
					</Grid>
					<Grid container spacing={2} sx={{ marginTop: "16px" }}>
						<Grid item xs={12} sm={6}>
							<InputLabel shrink>Lokasi</InputLabel>
							<FormControl fullWidth>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									// value={age}
									// label="Lokasi"
									input={<OutlinedInput />}
									placeholder="Pilih lokasi"
									// onChange={handleChange}
									renderValue={(selected) => {
										if (selected.length === 0) {
											return <em>Placeholder</em>;
										}

										return selected.join(", ");
									}}
								>
									<MenuItem disabled value="">
										<em>Placeholder</em>
									</MenuItem>
									<MenuItem value={1}>Jakarta</MenuItem>
									<MenuItem value={2}>Tangerang Selatan</MenuItem>
									<MenuItem value={3}>Bandung</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel shrink>Jumlah</InputLabel>
							<FormControl fullWidth>
								<OutlinedInput
									inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
									placeholder="Jumlah ketersediaan mobil"
								/>
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
							<Button variant="contained" size="large" fullWidth>
								{editMode ? "Edit Data Mobil" : "Buat Data Mobil"}
							</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Container>
	);
}

export default MobilForm;
