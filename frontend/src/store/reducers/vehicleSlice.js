import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, token } from '../../ultils/axiosApi';
// reducer thunk

// get all vehicles
export const getVehiclesDataAsync = createAsyncThunk("vehicles/getAllVehicles", async () => {
    const response = await axios.get("/vehicles", { headers: { token: token } });
    return response.data.data;
})
// get vehicles validation
export const getVehiclesValidationDataAsync = createAsyncThunk("vehicles/validation", async () => {
    const response = await axios.get("/vehicles/validation", { headers: { token: token } });
    return response.data.data;
})

// add | post vehicle
export const postVehicleDataAsync = createAsyncThunk("vehicles/postvehicle", async (vehicle) => {
    const response = await axios.post("/vehicles/add", vehicle, { headers: { token: token } })
    console.log(response);
    return response.data.data;
})

// put vehicle
export const putVehicleDataAsync = createAsyncThunk('vehicles/putVehicle', async (vehicle) => {
    const { formData, vehicleId } = vehicle;
    const response = await axios.put(`/vehicles/edit/${vehicleId}`, formData, { headers: { token: token } });
    console.log(response.data.data);
    return response.data.data;
})

// delete vehicle
export const deleteVehicleDataAsync = createAsyncThunk('vehicles/deleteVehicle', async (vehicleId) => {
    const response = await axios.delete(`/vehicles/delete/${vehicleId}`, { headers: { token: token } })
    return response.data.data;
})

// get routes by vehicle id
export const getRoutesByVehicleId = async (vehicleId) => {
    const response = await axios.get(`/vehicles/routes/${vehicleId}`, { headers: { token: token } });
    return response.data.data;
}
// get vehicle validation
export const getVehicleValidationData = async () => {
    const response = await axios.get(`/vehicles/validation`, { headers: { token: token } });
    return response.data.data;
}
// get vehicle by id
export const getVehicleDataById = async (vehicleId) => {
    const response = await axios.get(`/vehicles/${vehicleId}`, { headers: { token: token } });
    return response.data.data;
}

// get vehicle state log limit 10
export const getVehicleStateLog = async (vehicleId) => {
    const response = await axios.get(`/vehicles/states/recent/${vehicleId}`, { headers: { token: token } });
    return response.data.data;
}

// get all vehicle state log
export const getAllVehicleStateLog = async () => {
    const response = await axios.get(`/vehicles/states`, { headers: { token: token } });
    return response.data.data;
}

const vehicleSlice = createSlice({ // createReducer + createActions
    name: 'vehicles',
    initialState: {
        allVehicles: [],
        vehicleValidation: {
            data: [],
            graph: [],
        },
    },
    reducers: {
        updateVehicles: (state, action) => {
            state.allVehicles = action.payload
        }
    },
    extraReducers: {
        // get all todos
        [getVehiclesDataAsync.pending]: (state, action) => { // pending
            console.log("pending")
        },
        [getVehiclesDataAsync.fulfilled]: (state, action) => { // fulfilled = success
            console.log("success")
            state.allVehicles = action.payload
        },
        [getVehiclesDataAsync.rejected]: (state, action) => { // rejected = error
            console.log("error")
        },

        // get vehicle validation
        [getVehiclesValidationDataAsync.pending]: (state, action) => {
            console.log("pending")
        },
        [getVehiclesValidationDataAsync.fulfilled]: (state, action) => {
            console.log("success")
            state.vehicleValidation = action.payload
        },
        [getVehiclesValidationDataAsync.rejected]: (state, action) => {
            console.log("error")
        },

        // post vehicle
        [postVehicleDataAsync.pending]: (state, action) => {
            console.log("pending");
        },
        [postVehicleDataAsync.fulfilled]: (state, action) => {
            console.log("post success");
            state.allVehicles.push(action.payload)
        },
        [postVehicleDataAsync.rejected]: (state, action) => {
            console.log("post error");
        },

        // put vehicle
        [putVehicleDataAsync.pending]: (state, action) => {
            console.log('pending')
        },
        [putVehicleDataAsync.fulfilled]: (state, action) => {
            console.log('put success', action.payload)
            const putVehicle = action.payload
            // update vehicle have putVehicle.id
            const index = state.allVehicles.findIndex(vehicle => vehicle.id === putVehicle.id);
            state.allVehicles[index] = putVehicle;
        },
        [putVehicleDataAsync.rejected]: (state, action) => {
            console.log('put error')
        },
        // delete vehicle
        [deleteVehicleDataAsync.pending]: (state, action) => {
            console.log("delete pending");
        },
        [deleteVehicleDataAsync.fulfilled]: (state, action) => {
            console.log("delete success");
            state.allVehicles.filter(vehicle => vehicle.id !== action.payload)
        },
        [deleteVehicleDataAsync.rejected]: (state, action) => {
            console.log("delete error");
        },

    }
})

const vehiclesReducer = vehicleSlice.reducer;

export const vehiclesSelector = state => state.vehiclesReducer.allVehicles;
export const vehicleValidation = state => state.vehiclesReducer.vehicleValidation;

// export updateVehicles
export const { updateVehicles } = vehicleSlice.actions;

export default vehiclesReducer