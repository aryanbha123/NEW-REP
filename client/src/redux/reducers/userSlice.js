import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "../thunks/userThunk";

const initialState = {
    user: null,
    loading: true,
    error: null,
};

const userSlice = createSlice({
    name: "user", 
    initialState,
    reducers: {
        loginRequest(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        },
        loginFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { loginRequest, loginSuccess, loginFailed, logout } = userSlice.actions;
export default userSlice.reducer;
