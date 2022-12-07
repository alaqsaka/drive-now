import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = "http://localhost:5000";

export const userLogin = createAsyncThunk(
	// action type string
	`${backendURL}/users/login`,
	// callback function
	async ({ email, password }, { rejectWithValue }) => {
		try {
			// configure header's Content-Type as JSON
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			const { data } = await axios.post(`${backendURL}/users/login`, { email, password }, config);

			// store user's token in local storage
			localStorage.setItem("userToken", data.userToken);

			return data;
		} catch (error) {
			// return custom error message from API if any
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const getUserDetails = createAsyncThunk("user/getUserDetails", async (arg, { getState, rejectWithValue }) => {
	console.log("get user detailss");
	try {
		// get user data from store
		const { user } = getState();

		// configure authorization header with user's token
		const config = {
			headers: {
				Authorization: `Bearer ${user.userToken}`,
			},
		};
		const { data } = await axios.get(`/users/profile`, config);
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			return rejectWithValue(error.response.data.message);
		} else {
			return rejectWithValue(error.message);
		}
	}
});
