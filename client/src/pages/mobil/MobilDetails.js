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

						<TableContainer component={Paper} variant="outlined" sx={{ border: "1px solid", borderColor: "grey.400" }}>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<DNTableCell align="left">ID Transaksi</DNTableCell>
										<DNTableCell align="left">Nama</DNTableCell>
										<DNTableCell align="left">Email</DNTableCell>
										<DNTableCell align="left">Telepon</DNTableCell>
										<DNTableCell align="left">Tanggal</DNTableCell>
										<DNTableCell align="left">Status Pembayaran</DNTableCell>
										<DNTableCell align="left">Total</DNTableCell>
										<DNTableCell align="left">Action</DNTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{rows.map((row) => (
										<TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
											<DNTableCell align="left">{row.id}</DNTableCell>
											<DNTableCell align="left">{row.nama}</DNTableCell>
											<DNTableCell align="left">{row.email}</DNTableCell>
											<DNTableCell align="left">{row.telepon}</DNTableCell>
											<DNTableCell align="left">{row.tanggal}</DNTableCell>
											<DNTableCell align="left">
												<Chip
													sx={{
														backgroundColor: badgeColor[row.status],
														color: badgeColorText[row.status],
														fontWeight: 600,
														".MuiChip-icon": {
															color: badgeColorText[row.status],
														},
													}}
													icon={<Iconify icon={iconStatus[row.status]} />}
													label={row.status}
												/>
											</DNTableCell>
											<DNTableCell align="left">IDR {row.total},00</DNTableCell>
											<DNTableCell>
												<Link to={`/transaction/detail/${row.id}`}>
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

export default MobilDetails;
