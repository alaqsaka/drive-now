import {
	Box,
	Card,
	CardContent,
	Container,
	Grid,
	Paper,
	Table,
	TableContainer,
	Typography,
	TableHead,
	TableRow,
	TableBody,
	Chip,
	Link as MaterialLink,
	IconButton,
	CircularProgress,
} from "@mui/material";
import api from "src/api";
import React, { useEffect, useState } from "react";
import Iconify from "../../components/iconify";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import routes from "../../../src/routes";
import DNTableCell from "src/components/DNTableCell";
import carImg from "../../assets/images/cars/honda-hrv.png";

function createData(id, nama, email, telepon, tanggal, status, total) {
	return { id, nama, email, telepon, tanggal, status, total };
}

const rows = [
	createData(1, "Muhammad Faturrahman", "fatur@email.com", "08211028391", "Jan, 14 2022", "PAID", "450.000"),
	createData(2, "Muhammad Helmi", "helmi@email.com", "08211028391", "Des, 14 2022", "CANCELED", "350.000"),
	createData(3, "Muhammad Faturrahman", "fatur@email.com", "08211028391", "Nov, 14 2022", "PENDING", "1.050.000"),
];

const badgeColor = {
	PAID: "success.light",
	CANCELED: "error.light",
	PENDING: "warning.light",
};

const badgeColorText = {
	PAID: "success.dark",
	CANCELED: "error.dark",
	PENDING: "warning.dark",
};

const iconStatus = {
	CANCELED: "radix-icons:cross-2",
	PAID: "ic:round-check",
	PENDING: "mdi:clock-check-outline",
};

const MobilDetails = () => {
	console.log("list of routes ", routes);
	const { slug } = useParams();
	const [mobil, setMobil] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	console.log(slug);

	useEffect(() => {
		setLoading(true);
		try {
			api
				.get(`mobil/${slug}`)
				.then((res) => {
					setMobil(res.data.data);
					setLoading(false);
				})
				.catch((res) => {
					if (res.response.status === 404) {
						setError(res.response.data.message);
						setLoading(false);
					}
					setLoading(false);
				});
			console.log("mobil ", mobil);
			setLoading(false);
		} catch (error) {
			console.log("errorr", error);
		}
		// setLoading(false);
	}, []);

	console.log("DETAIL MOBIL ", mobil);

	return (
		<>
			<Helmet>
				<title>Detail Mobil: {slug}</title>
			</Helmet>

			<Container>
				{loading ? (
					<CircularProgress />
				) : (
					<>
						{!error?.length > 0 ? (
							<>
								<Card>
									<CardContent>
										<Typography variant="h4" gutterBottom sx={{ textTransform: "capitalize", marginBottom: "16px" }}>
											{slug.replace("-", " ")}
										</Typography>
										<Grid container>
											<Grid item xs={12} sm={6}>
												<img src={carImg} alt="Honda Hrv" loading="lazy" />
											</Grid>
											<Grid item xs={12} sm={6}>
												<Box marginBottom="16px">
													<Typography variant="h5">Nama Model</Typography>
													<Typography variant="body1">{mobil.name}</Typography>
												</Box>
												<Box marginBottom="16px">
													<Typography variant="h5">ID Mobil</Typography>
													<Typography variant="body1">{mobil.id}</Typography>
												</Box>
												<Box marginBottom="16px">
													<Typography variant="h5">Deskripsi</Typography>
													<Typography variant="body1">{mobil.description}</Typography>
												</Box>
												<Box marginBottom="16px">
													<Typography variant="h5">Harga Harian</Typography>
													<Typography variant="body1">Rp. {mobil.price}</Typography>
												</Box>
												<Box marginBottom="16px">
													<Typography variant="h5">Tipe Bensin</Typography>
													<Typography variant="body1">{mobil.fuelType}</Typography>
												</Box>
												<Box marginBottom="16px">
													<Typography variant="h5">Jumlah Kursi</Typography>
													<Typography variant="body1">{mobil.totalSeat}</Typography>
												</Box>
											</Grid>
										</Grid>
									</CardContent>
								</Card>
							</>
						) : (
							<p>Tidak ditemukan</p>
						)}
					</>
				)}
			</Container>
		</>
	);
};

export default MobilDetails;
