import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL, token} from '../../ultils/axiosApi';

// get all drivers
export const getDriversDataAsync = createAsyncThunk("drivers/getAllDrivers", async () => {
    const response = await axios.get("/users/drivers", { headers: { token: token } });
    return response.data.data;
})

// add | post driver
export const postDriverDataAsync = createAsyncThunk("users/drivers/postDriver", async (driver) => {
    const response = await axios.post('/users/drivers/add', driver, { headers: { token: token } });
    return response.data.data;
})

// put driver
export const putDriverDataAsync = createAsyncThunk('users/drivers/putDriver', async (driver) => {
    const { formData, driverId } = driver;
    const response = await axios.put(`/users/drivers/edit/${driverId}`, formData, { headers: { token: token } });
    console.log(response.data.data);
    return response.data.data;
})

// delete driver
export const deleteDriverDataAsync = createAsyncThunk('users/drivers/deleteDriver', async (driverId) => {
    const response = await axios.delete(`/users/drivers/delete/${driverId}`, { headers: { token: token } })
    return response.data.data;
})

// get driver by id
export const getDriverDataById = async (id) => {
    const response = await axios.get(`/users/drivers/${id}`, { headers: { token: token } });
    return response.data.data;
}

// get driver state log limit 10
export const getDriverStateLog = async (driverId) => {
    const response = await axios.get(`/tasks/recent/${driverId}`, { headers: { token: token } });
    return response.data.data;
}

const driversSlice = createSlice({
    name: "drivers",
    initialState: {
        allDrivers: [],
        driver: {},
    },
    reducers: {},
    extraReducers: {
        // get all drivers
        [getDriversDataAsync.pending]: (state, action) => {
            console.log("pending");
        },
        [getDriversDataAsync.fulfilled]: (state, action) => {
            console.log("success");
            state.allDrivers = action.payload;
        },
        [getDriversDataAsync.rejected]: (state, action) => {
            console.log("error");
        },

        // post driver
        [postDriverDataAsync.pending]: (state, action) => {
            console.log('pending')
        },
        [postDriverDataAsync.fulfilled]: (state, action) => {
            console.log('success')
            state.allDrivers.push(action.payload);
        },
        [postDriverDataAsync.rejected]: (state, action) => {
            console.log('error')
        },

        // put driver
        [putDriverDataAsync.pending]: (state, action) => {
            console.log('pending')
        },
        [putDriverDataAsync.fulfilled]: (state, action) => {
            console.log('success')
            const putDriver = action.payload;
            const index = state.allDrivers.findIndex((driver) => driver.id === putDriver.id);
            state.allDrivers[index] = putDriver;
        },
        [putDriverDataAsync.rejected]: (state, action) => {
            console.log('error')
        },

        // delete driver
        [deleteDriverDataAsync.pending]: (state, action) => {
            console.log('pending')
        },
        [deleteDriverDataAsync.fulfilled]: (state, action) => {
            console.log('success')
            state.allDrivers.filter((driver) => driver.id !== action.payload)
        },
        [deleteDriverDataAsync.rejected]: (state, action) => {
            console.log('error')
        },

        // get driver by id
        [getDriverDataById.pending]: (state, action) => {
            console.log('pending')
        },
        [getDriverDataById.fulfilled]: (state, action) => {
            console.log('success')
            state.driver = action.payload;
        },
        [getDriverDataById.rejected]: (state, action) => {
            console.log('error')
        },
    }
})

const driversReducer = driversSlice.reducer;

export const driversSelector = state => state.driversReducer.allDrivers;
export const driverSelector = state => state.driversReducer.driver;


export default driversReducer;