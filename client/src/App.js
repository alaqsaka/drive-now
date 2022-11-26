// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ScrollToTop from "./components/scroll-to-top";
import { StyledChart } from "./components/chart";
import { ConfirmProvider } from "material-ui-confirm";

// ----------------------------------------------------------------------

export default function App() {
	return (
		<ThemeProvider>
			<ConfirmProvider>
				<ScrollToTop />
				<StyledChart />
				<Router />
			</ConfirmProvider>
		</ThemeProvider>
	);
}
