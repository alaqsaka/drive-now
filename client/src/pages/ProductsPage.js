import { Helmet } from "react-helmet-async";
import { useState } from "react";
// @mui
import { Container, Stack, Typography, Button } from "@mui/material";
import Iconify from "../components/iconify";
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from "../sections/@dashboard/products";
// mock
import PRODUCTS from "../_mock/products";
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

export default function ProductsPage() {
	const [openFilter, setOpenFilter] = useState(false);

	const handleOpenFilter = () => {
		setOpenFilter(true);
	};

	const handleCloseFilter = () => {
		setOpenFilter(false);
	};

	return (
		<div>
			<Helmet>
				<title> Dashboard: Mobil | DriveNow </title>
			</Helmet>

			<Container>
				<Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
					<Typography variant="h4" gutterBottom>
						Mobil
					</Typography>
					<Link to="/dashboard/mobil/add" style={{ textDecoration: "none" }}>
						<Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
							Tambah Mobil
						</Button>
					</Link>
				</Stack>

				<Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
					<Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
						<ProductFilterSidebar
							openFilter={openFilter}
							onOpenFilter={handleOpenFilter}
							onCloseFilter={handleCloseFilter}
						/>
						<ProductSort />
					</Stack>
				</Stack>

				<ProductList products={PRODUCTS} />
				<ProductCartWidget />
			</Container>
		</div>
	);
}
