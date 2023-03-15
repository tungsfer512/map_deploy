import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL, token} from '../../ultils/axiosApi';

// get all managers
export const getManagersDataAsync = createAsyncThunk("managers/getAllManagers", async () => {
    const response = await axios.get("/users/managers", { headers: { token: token } });
    return response.data.data;
})

// add | post driver
export const postManagerDataAsync = createAsyncThunk("users/managers/postManager", async (driver) => {
    const response = await axios.post('/users/managers/add', driver, { headers: { token: token } });
    return response.data.data;
})

// put driver
export const putManagerDataAsync = createAsyncThunk('users/managers/putManager', async (driver) => {
    const { formData, driverId } = driver;
    const response = await axios.put(`/users/managers/edit/${driverId}`, formData, { headers: { token: token } });
    console.log(response.data.data);
    return response.data.data;
})

// delete driver
export const deleteManagerDataAsync = createAsyncThunk('users/managers/deleteManager', async (driverId) => {
    const response = await axios.delete(`/users/managers/delete/${driverId}`, { headers: { token: token } })
    return response.data.data;
})

// get driver by id
export const getManagerDataById = async (id) => {
    const response = await axios.get(`/users/managers/${id}`, { headers: { token: token } });
    return response.data.data;
}

// get driver state log limit 10
export const getManagerStateLog = async (driverId) => {
    const response = await axios.get(`/tasks/recent/${driverId}`, { headers: { token: token } });
    return response.data.data;
}

const managersSlice = createSlice({
    name: "managers",
    initialState: {
        allManagers: [],
    },
    reducers: {},
    extraReducers: {
        // get all managers
        [getManagersDataAsync.pending]: (state, action) => {
            console.log("pending");
        },
        [getManagersDataAsync.fulfilled]: (state, action) => {
            console.log("success");
            state.allManagers = action.payload;
        },
        [getManagersDataAsync.rejected]: (state, action) => {
            console.log("error");
        },

        // post driver
        [postManagerDataAsync.pending]: (state, action) => {
            console.log('pending')
        },
        [postManagerDataAsync.fulfilled]: (state, action) => {
            console.log('success')
            state.allManagers.push(action.payload);
        },
        [postManagerDataAsync.rejected]: (state, action) => {
            console.log('error')
        },

        // put driver
        [putManagerDataAsync.pending]: (state, action) => {
            console.log('pending')
        },
        [putManagerDataAsync.fulfilled]: (state, action) => {
            console.log('success')
            const putManager = action.payload;
            const index = state.allManagers.findIndex((driver) => driver.id === putManager.id);
            state.allManagers[index] = putManager;
        },
        [putManagerDataAsync.rejected]: (state, action) => {
            console.log('error')
        },

        // delete driver
        [deleteManagerDataAsync.pending]: (state, action) => {
            console.log('pending')
        },
        [deleteManagerDataAsync.fulfilled]: (state, action) => {
            console.log('success')
            state.allManagers.filter((driver) => driver.id !== action.payload)
        },
        [deleteManagerDataAsync.rejected]: (state, action) => {
            console.log('error')
        },


    }
})

const managersReducer = managersSlice.reducer;

export const managersSelector = state => state.managersReducer.allManagers;


export default managersReducer;