// component
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
	{
		title: "dashboard",
		path: "/dashboard/app",
		icon: icon("ic_analytics"),
	},
	{
		title: "pengguna",
		path: "/dashboard/user",
		icon: icon("ic_user"),
	},
	{
		title: "Mobil",
		path: "/dashboard/mobil",
		icon: icon("ic_cart"),
	},
	{
		title: "Lokasi",
		path: "/dashboard/lokasi",
		icon: icon("ic_map"),
	},
	{
		title: "Transaksi",
		path: "/dashboard/transaksi",
		icon: icon("transaction"),
	},
	// {
	// 	title: "blog",
	// 	path: "/dashboard/blog",
	// 	icon: icon("ic_blog"),
	// },
	// {
	// 	title: "login",
	// 	path: "/login",
	// 	icon: icon("ic_lock"),
	// },
	// {
	// 	title: "Not found",
	// 	path: "/404",
	// 	icon: icon("ic_disabled"),
	// },
];

export default navConfig;
