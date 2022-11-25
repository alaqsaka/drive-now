import React from "react";
import { useParams } from "react-router-dom";
import routes from "../../../src/routes";

const MobilDetails = () => {
	console.log("list of routes ", routes);
	const { carId } = useParams();
	console.log(carId);
	return (
		<div>
			<span>{carId}</span>
		</div>
	);
};

export default MobilDetails;
