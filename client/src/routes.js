import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import BlogPage from "./pages/BlogPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import DashboardAppPage from "./pages/DashboardAppPage";
import MobilForm from "./pages/mobil/MobilForm";
import Mobil from "./pages/mobil/Mobil";
import MobilDetails from "./pages/mobil/MobilDetails";
import PenggunaDetails from "./pages/pengguna/PenggunaDetails";
import Transaksi from "./pages/transaksi/Transaksi";
import Lokasi from "./pages/lokasi/Lokasi";
import LokasiForm from "./pages/lokasi/LokasiForm";
import LokasiDetails from "./pages/lokasi/LokasiDetails";
import { ProtectedRoute } from "./ProtectedRoute";

// ----------------------------------------------------------------------

export default function Router(isLoggedIn) {
	console.log(isLoggedIn);
	const routes = useRoutes([
		{
			path: "/dashboard",
			element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
			children: [
				{ element: <Navigate to="/dashboard/app" />, index: true },
				{ path: "app", element: <DashboardAppPage /> },
				{ path: "user", element: <UserPage /> },
				{ path: "mobil", element: <Mobil /> },
				{ path: "blog", element: <BlogPage /> },
				{ path: "transaksi", element: <Transaksi /> },
				{ path: "lokasi", element: <Lokasi /> },
			],
		},
		{
			element: <SimpleLayout />,
			children: [
				{ element: <Navigate to="/dashboard/app" />, index: true },
				{ path: "404", element: <Page404 /> },
				{ path: "*", element: <Navigate to="/404" /> },
			],
		},
		{
			path: "*",
			element: <Navigate to="/404" replace />,
		},
		{
			path: "/dashboard/mobil",
			element: <DashboardLayout />,
			children: [
				{ path: "add", element: <MobilForm /> },
				{ path: "edit/:carId", element: <MobilForm /> },
				{
					path: "detail/:slug",
					element: <MobilDetails />,
				},
			],
		},
		{
			path: "/dashboard/user",
			element: <DashboardLayout />,
			children: [
				{
					path: "detail/:userId",
					element: <PenggunaDetails />,
				},
			],
		},
		{
			path: "/dashboard/transaksi",
			element: <DashboardLayout />,
		},
		{
			path: "/dashboard/lokasi",
			element: <DashboardLayout />,
			children: [
				{
					path: "add",
					element: <LokasiForm />,
				},
				{ path: "edit/:lokasiId", element: <LokasiForm /> },
				{ path: "detail/:lokasiId", element: <LokasiDetails /> },
			],
		},
		{
			path: "/",
			element: !isLoggedIn ? <DashboardLayout /> : <Navigate to="/dashboard/app" />,
			children: [
				{ path: "login", element: <LoginPage /> },
				{ path: "/", element: <Navigate to="/login" /> },
			],
		},
	]);

	return routes;
}
