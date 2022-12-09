import {
	Box,
	Card,
	CardContent,
	CardHeader,
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
import React, { useEffect, useState } from "react";
import Iconify from "../../components/iconify";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import routes from "../../../src/routes";
import DNTableCell from "src/components/DNTableCell";
import api from "src/api";
import carImg from "../../assets/images/cars/honda-hrv.png";

function createData(id, nama, jumlah, harga) {
	return { id, nama, jumlah, harga };
}

// const rows = [
// 	createData(1, "Honda Civic Type R", 5, "150.000,00"),
// 	createData(2, "Honda CRV", 5, "150.000,00"),
// 	createData(3, "Hyundai Ioniq 5", 5, "150.000,00"),
// ];

const LokasiDetails = () => {
	const { lokasiId } = useParams();
	const [lokasi, setLokasi] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
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
	}, []);

	return (
		<>
			<Helmet>
				<title>Detail Lokasi: {lokasiId}</title>
			</Helmet>

			<Container>
				{loading ? (
					<CircularProgress />
				) : (
					<>
						{!error?.length > 0 ? (
							<Card>
								<CardContent>
									<Typography variant="h4" gutterBottom sx={{ textTransform: "capitalize", marginBottom: "16px" }}>
										{lokasi.name}
									</Typography>

									<Grid container>
										<Grid item xs={12} sm={6}>
											<Box marginBottom="16px">
												<Typography variant="h5">Nama Lokasi</Typography>
												<Typography variant="body1">{lokasi.name}</Typography>
											</Box>
											<Box marginBottom="16px">
												<Typography variant="h5">ID Lokasi</Typography>
												<Typography variant="body1">{lokasi.id}</Typography>
											</Box>
											<Box marginBottom="16px">
												<Typography variant="h5">Person in charge</Typography>
												<Typography variant="body1">{lokasi.personInChargeName}</Typography>
												<Typography variant="body1">{lokasi.personInChargePhone}</Typography>
											</Box>
											<Box marginBottom="16px">
												<Typography variant="h5">Deskripsi</Typography>
												<Typography variant="body1">{lokasi.description}</Typography>
											</Box>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						) : (
							<Card>
								<CardContent>{error}</CardContent>
							</Card>
						)}
					</>
				)}
			</Container>
		</>
	);
};

export default LokasiDetails;
