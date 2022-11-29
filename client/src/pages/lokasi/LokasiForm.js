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
} from "@mui/material";

import React from "react";
import { useParams } from "react-router-dom";
// import Card from "../../theme/overrides/Card";

function LokasiForm() {
	const { lokasiId } = useParams();
	const editMode = Boolean(lokasiId);

	return (
		<Container>
			<Typography variant="h4" gutterBottom>
				{editMode ? "Edit Lokasi" : "Tambah Lokasi"}
			</Typography>
			<Card>
				<CardContent>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<InputLabel shrink>Model Lokasi</InputLabel>
							<FormControl fullWidth>
								<OutlinedInput placeholder="Nama Lokasi" />
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel shrink>Deskripsi Lokasi</InputLabel>
							<FormControl fullWidth>
								<OutlinedInput placeholder="Deskripsi Lokasi" />
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
								{editMode ? "Edit Data Lokasi" : "Buat Data Lokasi"}
							</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Container>
	);
}

export default LokasiForm;
