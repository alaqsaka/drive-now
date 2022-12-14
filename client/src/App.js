// routes
// import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ScrollToTop from "./components/scroll-to-top";
import { StyledChart } from "./components/chart";
import { ConfirmProvider } from "material-ui-confirm";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import DashboardAppPage from "./pages/DashboardAppPage";
import BlogPage from "./pages/BlogPage";
import UserPage from "./pages/UserPage";
import Page404 from "./pages/Page404";
// import DashboardAppPage from "./pages/DashboardAppPage";
import MobilForm from "./pages/mobil/MobilForm";
import Mobil from "./pages/mobil/Mobil";
import MobilDetails from "./pages/mobil/MobilDetails";
import PenggunaDetails from "./pages/pengguna/PenggunaDetails";
import Transaksi from "./pages/transaksi/Transaksi";
import Lokasi from "./pages/lokasi/Lokasi";
import LokasiForm from "./pages/lokasi/LokasiForm";
import LokasiDetails from "./pages/lokasi/LokasiDetails";
import TransaksiDetails from "./pages/transaksi/TransaksiDetails";
// import UserPage from "./pages/UserPage";

// ----------------------------------------------------------------------

export default function App() {
	const { userInfo } = useSelector((state) => state.user);
	return (
		<ThemeProvider>
			<ConfirmProvider>
				<ScrollToTop />
				<StyledChart />
				<Routes>
					<Route path="/login" element={<LoginPage />} />

					<Route element={<ProtectedRoute />}>
						<Route path="/" element={<Navigate to="/dashboard/app" />} />
						<Route path="/dashboard" element={<DashboardLayout />}>
							<Route element={<Navigate to="/dashboard/app" />} index />
							<Route path="app" element={<DashboardAppPage />} />
							<Route path="user">
								<Route index element={<UserPage />} />
								<Route path="detail/:userId" element={<PenggunaDetails />} />
							</Route>
							<Route path="mobil">
								<Route index element={<Mobil />} />
								<Route path="add" element={<MobilForm />} />
								<Route path="detail/:slug" element={<MobilDetails />} />
								<Route path="edit/:carId" element={<MobilForm />} />
							</Route>

							<Route path="lokasi">
								<Route index element={<Lokasi />} />
								<Route path="edit/:lokasiId" element={<LokasiForm />} />
								<Route path="add" element={<LokasiForm />} />
								<Route path="detail/:lokasiId" element={<LokasiDetails />} />
							</Route>
							<Route path="transaksi">
								<Route index element={<Transaksi />} />
								<Route path="detail/:id" element={<TransaksiDetails />} />
							</Route>
						</Route>
					</Route>
					<Route path="*" element={<Page404 />} />
				</Routes>
				{/* <Router isLoggedIn={userInfo} /> */}
			</ConfirmProvider>
		</ThemeProvider>
	);
}
