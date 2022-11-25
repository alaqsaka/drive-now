import { Container, Paper, Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import routes from "../../../src/routes";

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
				<Paper elevation="1">
					<Typography variant="h4" gutterBottom>
						{slug}
					</Typography>
				</Paper>
			</Container>
		</>
	);
};

export default MobilDetails;
