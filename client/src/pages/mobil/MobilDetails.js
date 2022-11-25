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
	TableCell,
	TableBody,
	Chip,
} from "@mui/material";
import React from "react";
import Iconify from "../../components/iconify";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import routes from "../../../src/routes";
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
	console.log(slug);
	return (
		<>
			<Helmet>
				<title>Detail Mobil: {slug}</title>
			</Helmet>

			<Container>
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
									<Typography variant="body1">Honda HRV</Typography>
								</Box>
								<Box marginBottom="16px">
									<Typography variant="h5">ID Mobil</Typography>
									<Typography variant="body1">12</Typography>
								</Box>
								<Box marginBottom="16px">
									<Typography variant="h5">Deskripsi</Typography>
									<Typography variant="body1">
										Penampilannya yang sporty digabung dengan lekuk garisnya yang impresif, berhasil mempertegas
										karakter SUV yang modern dan menjadi daya tarik utama dari All New Honda HR-V
									</Typography>
								</Box>
								<Box marginBottom="16px">
									<Typography variant="h5">Harga Harian</Typography>
									<Typography variant="body1">Rp. 150.000,00</Typography>
								</Box>
								<Box marginBottom="16px">
									<Typography variant="h5">Lokasi dan Jumlah</Typography>
									<Grid container>
										<Grid item xs={12} sm={6}>
											Jakarta
										</Grid>
										<Grid item xs={12} sm={6}>
											2
										</Grid>
										<Grid item xs={12} sm={6}>
											Bandung
										</Grid>
										<Grid item xs={12} sm={6}>
											9
										</Grid>
										<Grid item xs={12} sm={6}>
											Bogor
										</Grid>
										<Grid item xs={12} sm={6}>
											15
										</Grid>
									</Grid>
								</Box>
							</Grid>
						</Grid>

						<Typography
							variant="h4"
							gutterBottom
							sx={{ textTransform: "capitalize", marginBottom: "16px", marginTop: "16px" }}
						>
							Daftar Transaksi {slug.replace("-", " ")}
						</Typography>

						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell align="left">ID Transaksi</TableCell>
										<TableCell align="left">Nama</TableCell>
										<TableCell align="left">Email</TableCell>
										<TableCell align="left">Telepon</TableCell>
										<TableCell align="left">Tanggal</TableCell>
										<TableCell align="left">Status Pembayaran</TableCell>
										<TableCell align="left">Total</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{rows.map((row) => (
										<TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
											<TableCell align="left">{row.id}</TableCell>
											<TableCell align="left">{row.nama}</TableCell>
											<TableCell align="left">{row.email}</TableCell>
											<TableCell align="left">{row.telepon}</TableCell>
											<TableCell align="left">{row.tanggal}</TableCell>
											<TableCell align="left">
												<Chip
													sx={{
														backgroundColor: badgeColor[row.status],
														color: badgeColorText[row.status],
														fontWeight: 600,
													}}
													icon={<Iconify icon={iconStatus[row.status]} />}
													label={row.status}
												/>
											</TableCell>
											<TableCell align="left">IDR {row.total},00</TableCell>
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

export default MobilDetails;