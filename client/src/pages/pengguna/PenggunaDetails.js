import { Container } from "@mui/system";
import {
	Avatar,
	Button,
	Card,
	CardContent,
	FormControl,
	Grid,
	OutlinedInput,
	Paper,
	Typography,
	Tab,
	Box,
	TableCell,
	TableRow,
	TableBody,
	TableHead,
	TableContainer,
	Table,
	Chip,
} from "@mui/material";
import userImg from "../../assets/images/users/avatar_13.jpg";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Iconify from "src/components/iconify";
function createData(id, nama, email, telepon, tanggal, status, total) {
	return { id, nama, email, telepon, tanggal, status, total };
}

const rows = [
	createData(1, "Muhammad Faturrahman", "fatur@email.com", "08211028391", "Jan, 14 2022", "PAID", "450.000"),
	createData(2, "Muhammad Helmi", "helmi@email.com", "08211028391", "Des, 14 2022", "CANCELED", "350.000"),
	createData(3, "Muhammad Faturrahman", "fatur@email.com", "08211028391", "Nov, 14 2022", "PENDING", "1.050.000"),
];

const iconStatus = {
	CANCELED: "radix-icons:cross-2",
	PAID: "ic:round-check",
	PENDING: "mdi:clock-check-outline",
};

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

const PenggunaDetails = () => {
	const { userId } = useParams();
	const [value, setValue] = useState("1");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div>
			<Helmet>
				<title>Detail Penngguna: Muhammad Faturrahman</title>
			</Helmet>

			<TabContext value={value}>
				<Container>
					<Card>
						<CardContent sx={{ padding: "0px", margin: "0px" }}>
							<Box sx={{ padding: "24px", paddingBottom: "0px" }}>
								<Grid container sx={{ marginBottom: "16px" }}>
									<Grid item xs={12} sm={6} sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
										<Avatar src={userImg} sx={{ width: 56, height: 56 }} />
										<Typography variant="h5">Muhammad Faturrahman</Typography>
									</Grid>
									<Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "end", gap: "8px" }}>
										<Button variant="outlined">Chat</Button>
										<Button variant="contained">Edit Profile</Button>
									</Grid>
								</Grid>
							</Box>
						</CardContent>
						<Box sx={{ borderColor: "divider", backgroundColor: "grey.100" }}>
							<TabList onChange={handleChange} aria-label="lab API tabs example">
								<Tab label="Tentang User" value="1" />
								<Tab label="Transaksi" value="2" />
							</TabList>
						</Box>
					</Card>

					{/* About user  */}
					<TabPanel value="1" sx={{ padding: 0 }}>
						<Card sx={{ marginTop: "16px" }}>
							<CardContent>
								<Typography variant="h6">Tentang Muhammad Faturrahman</Typography>
								<Grid container rowGap={2}>
									<Grid item xs={12} sm={6} alignItems="center" display="flex">
										<Typography variant="body2" fontWeight={600} alignItems="center">
											User ID
										</Typography>
									</Grid>
									<Grid item xs={12} sm={6}>
										<FormControl fullWidth>
											<OutlinedInput disabled placeholder={userId} />
										</FormControl>
									</Grid>
									<Grid item xs={12} sm={6} alignItems="center" display="flex">
										<Typography variant="body2" fontWeight={600} alignItems="center">
											Nama Lengkap
										</Typography>
									</Grid>
									<Grid item xs={12} sm={6}>
										<FormControl fullWidth>
											<OutlinedInput disabled placeholder="Muhammad Faturrahman" />
										</FormControl>
									</Grid>
									<Grid item xs={12} sm={6} alignItems="center" display="flex">
										<Typography variant="body2" fontWeight={600} alignItems="center">
											Identification Type
										</Typography>
									</Grid>
									<Grid item xs={12} sm={6}>
										<FormControl fullWidth>
											<OutlinedInput disabled placeholder="KTP" />
										</FormControl>
									</Grid>
									<Grid item xs={12} sm={6} alignItems="center" display="flex">
										<Typography variant="body2" fontWeight={600} alignItems="center">
											No. Identitas
										</Typography>
									</Grid>
									<Grid item xs={12} sm={6}>
										<FormControl fullWidth>
											<OutlinedInput disabled placeholder="34634313012011121" />
										</FormControl>
									</Grid>
									<Grid item xs={12} sm={6} alignItems="center" display="flex">
										<Typography variant="body2" fontWeight={600} alignItems="center">
											Nomor Telepon
										</Typography>
									</Grid>
									<Grid item xs={12} sm={6}>
										<FormControl fullWidth>
											<OutlinedInput disabled placeholder="0821101016756" />
										</FormControl>
									</Grid>
									<Grid item xs={12} sm={6} alignItems="center" display="flex">
										<Typography variant="body2" fontWeight={600} alignItems="center">
											Alamat
										</Typography>
									</Grid>
									<Grid item xs={12} sm={6}>
										<FormControl fullWidth>
											<OutlinedInput disabled placeholder="Vila Dago Pamulang Jl. Alam Asri 1 Blok H3/2" />
										</FormControl>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					</TabPanel>

					<TabPanel value="2" sx={{ padding: 0 }}>
						<Card sx={{ marginTop: "16px" }}>
							<CardContent>
								<Typography variant="h6" sx={{ marginBottom: "16px" }}>
									Daftar Transaksi Muhammad Faturrahman
								</Typography>
								<TableContainer
									component={Paper}
									variant="outlined"
									sx={{ border: "1px solid", borderColor: "grey.400" }}
								>
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
					</TabPanel>
				</Container>
			</TabContext>
		</div>
	);
};

export default PenggunaDetails;
