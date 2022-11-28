import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { useState } from "react";

import {
	Card,
	Table,
	Stack,
	Paper,
	Button,
	Checkbox,
	TableRow,
	TableBody,
	TableCell,
	Container,
	Typography,
	IconButton,
	TableContainer,
	TablePagination,
	Link as MaterialLink,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { useConfirm } from "material-ui-confirm";
import Iconify from "../../components/iconify";
import Scrollbar from "../../components/scrollbar";
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";
import cars from "../../_mock/cars";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

const StyledTableCell = withStyles({
	root: {
		fontSize: "16px",
	},
})(TableCell);

const TABLE_HEAD = [
	{ id: "id", label: "ID", alignRight: false },
	{ id: "name", label: "Nama Model", alignRight: false },
	{ id: "price", label: "Harga Sewa Per Hari", alignRight: false },
	{ id: "lokasi", label: "Lokasi", alignRight: false },
	{ id: "jumlah", label: "Jumlah", alignRight: false },
	{
		id: "",
		label: "Action",
		sx: {
			width: "13%",
			textAlign: "center",
		},
	},
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	if (query) {
		return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
	}
	return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
	console.log("Cars ", cars);
	const confirm = useConfirm();
	const [open, setOpen] = useState(null);

	const [page, setPage] = useState(0);

	const [order, setOrder] = useState("asc");

	const [selected, setSelected] = useState([]);

	const [orderBy, setOrderBy] = useState("name");

	const [filterName, setFilterName] = useState("");

	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleOpenMenu = (event) => {
		setOpen(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setOpen(null);
	};

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = cars.map((n) => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}
		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setPage(0);
		setRowsPerPage(parseInt(event.target.value, 10));
	};

	const handleFilterByName = (event) => {
		setPage(0);
		setFilterName(event.target.value);
	};

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cars.length) : 0;

	const filteredUsers = applySortFilter(cars, getComparator(order, orderBy), filterName);
	// const filteredUsers = cars;

	const isNotFound = !filteredUsers.length && !!filterName;

	const handleClickDelete = (namaModel) => {
		confirm({
			description: "",
			title: "",
			content: (
				<>
					<Box>
						<Typography variant="h5">Yakin menghapus mobil {namaModel} ini?</Typography>
						<Typography variant="body1">Data yang sudah dihapus tidak akan dipulihkan kembali</Typography>
					</Box>
				</>
			),
		})
			.then(() => {
				console.log("Delete");
			})
			.catch(() => {
				console.log("Cancel delete");
			});
	};

	return (
		<>
			<Helmet>
				<title> Mobil | DriveNow </title>
			</Helmet>

			<Container>
				<Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
					<Typography variant="h4" gutterBottom>
						Mobil
					</Typography>
					<Link to="/dashboard/mobil/add" style={{ textDecoration: "none" }}>
						<Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
							Tambah Mobil Baru
						</Button>
					</Link>
				</Stack>

				<Card>
					<UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

					<Scrollbar>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table
								sx={{
									"& .MuiTable-root": {
										color: "red",
									},
								}}
							>
								<UserListHead
									order={order}
									orderBy={orderBy}
									headLabel={TABLE_HEAD}
									rowCount={cars.length}
									numSelected={selected.length}
									onRequestSort={handleRequestSort}
									onSelectAllClick={handleSelectAllClick}
								/>
								<TableBody>
									{filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
										const { id, name, price, lokasi, slug } = row;
										const selectedUser = selected.indexOf(name) !== -1;

										return (
											<TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
												<StyledTableCell padding="checkbox">
													<Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
												</StyledTableCell>

												<StyledTableCell component="th" scope="row" padding="none">
													<Stack direction="row" alignItems="center" spacing={2}>
														<Typography variant="subtitle2" noWrap>
															{id}
														</Typography>
													</Stack>
												</StyledTableCell>

												<StyledTableCell align="left">{name}</StyledTableCell>
												<StyledTableCell align="left">{price}</StyledTableCell>
												<StyledTableCell align="left">
													{lokasi.length > 0 && lokasi.map((item) => <div>{item.nama}</div>)}
												</StyledTableCell>
												<StyledTableCell align="left">
													{lokasi.length > 0 && lokasi.map((item) => <div>{item.jumlah}</div>)}
												</StyledTableCell>
												<StyledTableCell align="left" sx={{ width: "fit-content" }}>
													<Link to={`detail/${slug}`}>
														<IconButton component={MaterialLink}>
															<Iconify icon="ic:outline-remove-red-eye" />
														</IconButton>
													</Link>
													<Link to={`edit/${id}`}>
														<IconButton>
															<Iconify icon="eva:edit-fill" color="warning.main" />
														</IconButton>
													</Link>
													<IconButton onClick={() => handleClickDelete(name)}>
														<Iconify icon="eva:trash-2-outline" color="error.main" />
													</IconButton>
												</StyledTableCell>
											</TableRow>
										);
									})}
									{emptyRows > 0 && (
										<TableRow style={{ height: 53 * emptyRows }}>
											<StyledTableCell colSpan={6} />
										</TableRow>
									)}
								</TableBody>

								{isNotFound && (
									<TableBody>
										<TableRow>
											<TableCell align="center" colSpan={6} sx={{ py: 3 }}>
												<Paper
													sx={{
														textAlign: "center",
													}}
												>
													<Typography variant="h6" paragraph>
														Not found
													</Typography>
													<Typography variant="body2">
														No results found for &nbsp;
														<strong>&quot;{filterName}&quot;</strong>.
														<br /> Try checking for typos or using complete words.
													</Typography>
												</Paper>
											</TableCell>
										</TableRow>
									</TableBody>
								)}
							</Table>
						</TableContainer>
					</Scrollbar>

					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={cars.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Card>
			</Container>
		</>
	);
}
