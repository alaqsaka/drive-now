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
} from "@mui/material";
import React from "react";
import Iconify from "../../components/iconify";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import routes from "../../../src/routes";
import DNTableCell from "src/components/DNTableCell";
import carImg from "../../assets/images/cars/honda-hrv.png";

function createData(id, nama, jumlah, harga) {
	return { id, nama, jumlah, harga };
}

const rows = [
	createData(1, "Honda Civic Type R", 5, "150.000,00"),
	createData(2, "Honda CRV", 5, "150.000,00"),
	createData(3, "Hyundai Ioniq 5", 5, "150.000,00"),
];

const LokasiDetails = () => {
	console.log("list of routes ", routes);
	const { lokasiId } = useParams();

	return (
		<>
			<Helmet>
				<title>Detail Mobil: {lokasiId}</title>
			</Helmet>

			<Container>
				<Card>
					<CardContent>
						<Typography variant="h4" gutterBottom sx={{ textTransform: "capitalize", marginBottom: "16px" }}>
							Jakarta
						</Typography>

						<Grid container>
							<Grid item xs={12} sm={6}>
								<Box marginBottom="16px">
									<Typography variant="h5">Nama Lokasi</Typography>
									<Typography variant="body1">Jakarta</Typography>
								</Box>
								<Box marginBottom="16px">
									<Typography variant="h5">ID Lokasi</Typography>
									<Typography variant="body1">12</Typography>
								</Box>
								<Box marginBottom="16px">
									<Typography variant="h5">Person in charge</Typography>
									<Typography variant="body1">Abyakta Wibisono</Typography>
									<Typography variant="body1">08219021021</Typography>
								</Box>
								<Box marginBottom="16px">
									<Typography variant="h5">Deskripsi</Typography>
									<Typography variant="body1">
										orem ipsum dolor sit amet, consectetur adipiscing elit. In accumsan facilisis libero ut vestibulum.
										Mauris ac bibendum nulla. Vivamus vitae nulla sit amet enim dictum posuere. Praesent posuere
										scelerisque sapien, nec consequat est euismod ac. Phasellus massa nulla, laoreet sed purus ut,
										auctor eleifend lectus. Phasellus tristique libero turpis, eu aliquet urna lobortis ut. Etiam
										tincidunt at arcu consectetur eleifend. Curabitur nisl risus, interdum id venenatis a, commodo sit
										amet ante. Morbi ac efficitur neque. Vestibulum vel leo eget lorem pharetra semper vitae ut augue.
										Ut id sodales lorem.
									</Typography>
								</Box>
							</Grid>
						</Grid>

						<Typography
							variant="h4"
							gutterBottom
							sx={{ textTransform: "capitalize", marginBottom: "16px", marginTop: "16px" }}
						>
							Daftar mobil di Jakarta
						</Typography>

						<TableContainer component={Paper} variant="outlined" sx={{ border: "1px solid", borderColor: "grey.400" }}>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<DNTableCell align="left">ID Mobil</DNTableCell>
										<DNTableCell align="left">Nama Mobil</DNTableCell>
										<DNTableCell align="left">Jumlah Mobil</DNTableCell>
										<DNTableCell align="left">Harga per hari</DNTableCell>
										<DNTableCell align="left">Detail</DNTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{rows.map((row) => (
										<TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
											<DNTableCell align="left">{row.id}</DNTableCell>
											<DNTableCell align="left">{row.nama}</DNTableCell>
											<DNTableCell align="left">{row.jumlah}</DNTableCell>
											<DNTableCell align="left">{row.harga}</DNTableCell>
											<DNTableCell>
												<Link to={`/dashboard/mobil/detail/${row.nama}`}>
													<IconButton component={MaterialLink}>
														<Iconify icon="ic:outline-remove-red-eye" />
													</IconButton>
												</Link>
											</DNTableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</CardContent>
				</Card>
			</Container>
		</>
	);
};

export default LokasiDetails;
