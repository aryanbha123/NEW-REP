import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/config";
import axios from 'axios'
export const getUser = createAsyncThunk("profile/getProfile", async (thunkAPI) => {
    try {
        const response = await axios.get(BASE_URL + "/api/auth/profile", {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        });
        
        return response.data.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
}
);