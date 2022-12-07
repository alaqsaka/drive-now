import { createSlice } from "@reduxjs/toolkit";
import { getUserDetails, userLogin } from "./userActions";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null;

const initialState = {
	loading: false,
	userInfo: null, // for user object
	userToken,
	success: false,
	error: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: {
		// login user
		[userLogin.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[userLogin.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.userInfo = payload;
			state.userToken = payload.userToken;
		},
		[userLogin.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		[getUserDetails.pending]: (state) => {
			state.loading = true;
		},
		[getUserDetails.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.userInfo = payload;
		},
		[getUserDetails.rejected]: (state, { payload }) => {
			state.loading = false;
		},
	},
});

export default userSlice.reducer;
