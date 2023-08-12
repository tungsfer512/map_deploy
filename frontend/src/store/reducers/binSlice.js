import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL, token } from '../../ultils/axiosApi';

// get all bins
export const getBinsDataAsync = createAsyncThunk('bins/getAllBins', async (companyId) => {
    let response = null;
    if (companyId === undefined || companyId === null) {
        response = await axios.get('/bins', { headers: { token: token } });
    } else {
        response = await axios.get(`/bins?companyId=${companyId}`, { headers: { token: token } });
    }
    return response.data.data;
})

// add | post bin
export const postBinDataAsync = createAsyncThunk("bins/postBin", async (bin) => {
    const response = await axios.post('/bins/add', bin, { headers: { token: token } });
    return response.data.data;
})

// put bin
export const putBinDataAsync = createAsyncThunk('bins/putBin', async (bin) => {
    const { formData, binId } = bin;
    const response = await axios.put(`/bins/edit/${binId}`, formData, { headers: { token: token } });
    console.log(response.data.data);
    return response.data.data;
})

// delete bin
export const deleteBinDataAsync = createAsyncThunk('bins/deleteBin', async (binId) => {
    const response = await axios.delete(`/bins/delete/${binId}`, { headers: { token: token } })
    return response.data.data;
})

// get bin by id
export const getBinDataById = async (id) => {
    const response = await axios.get(`/bins/${id}`, { headers: { token: token } });
    return response.data.data;
}

// get resest bin weight
export const getResetBinWeightAsync = createAsyncThunk('bins/getResetBinWeight', async (binId) => {
    const response = await axios.get(`/bins/reset/${binId}`, { headers: { token: token } });
    return response.data.data;
})

// get bin state log limit 10
export const getBinStateLog = async (binId) => {
    const response = await axios.get(`/bins/states/recent/${binId}`, { headers: { token: token } });
    return response.data.data;
}

// get all bin state log
export const getAllBinStateLog = async () => {
    const response = await axios.get(`/bins/states`, { headers: { token: token } });
    return response.data.data;
}

const binSlice = createSlice({
    name: 'bins',
    initialState: {
        allBins: [],
    },
    reducers: {},
    extraReducers: {
        [getBinsDataAsync.pending]: (state, action) => {
            console.log('pending')
        },
        [getBinsDataAsync.fulfilled]: (state, action) => {
            console.log('success')
            state.allBins = action.payload
        },
        [getBinsDataAsync.rejected]: (state, action) => {
            console.log('error')
        },

        // post bin
        [postBinDataAsync.pending]: (state, action) => {
            console.log('pending')
        },
        [postBinDataAsync.fulfilled]: (state, action) => {
            console.log('success')
            state.allBins.push(action.payload);
        },
        [postBinDataAsync.rejected]: (state, action) => {
            console.log('error')
        },

        // put bin
        [putBinDataAsync.pending]: (state, action) => {
            console.log('pending')
        },
        [putBinDataAsync.fulfilled]: (state, action) => {
            console.log('success')
            const putBin = action.payload;
            const index = state.allBins.findIndex((bin) => bin.id === putBin.id);
            state.allBins[index] = putBin;
        },
        [putBinDataAsync.rejected]: (state, action) => {
            console.log('error')
        },

        // delete bin
        [deleteBinDataAsync.pending]: (state, action) => {
            console.log('pending')
        },
        [deleteBinDataAsync.fulfilled]: (state, action) => {
            console.log('success')
            state.allBins.filter((bin) => bin.id !== action.payload)
        },
        [deleteBinDataAsync.rejected]: (state, action) => {
            console.log('error')
        },
    }
})

const binsReducer = binSlice.reducer

export const binsSelector = state => state.binsReducer.allBins

export default binsReducer