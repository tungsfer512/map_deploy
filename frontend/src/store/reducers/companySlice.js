import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL, token} from '../../ultils/axiosApi';

// get all companies
export const getCompaniesDataAsync = createAsyncThunk("companies/getAllCompanies", async () => {
    const response = await axios.get("/companies", { headers: { token: token } });
    return response.data.data;
})

// add | post company
export const postCompanyDataAsync = createAsyncThunk("companies/postCompany", async (company) => {
    const response = await axios.post('/companies/add', company, { headers: { token: token } });
    return response.data.data;
})

// put company
export const putCompanyDataAsync = createAsyncThunk('companies/putCompany', async (company) => {
    const { formData, companyId } = company;
    const response = await axios.put(`/companies/edit/${companyId}`, formData, { headers: { token: token } });
    console.log(response.data.data);
    return response.data.data;
})

// delete company
export const deleteCompanyDataAsync = createAsyncThunk('companies/deleteCompany', async (companyId) => {
    const response = await axios.delete(`/companies/delete/${companyId}`, { headers: { token: token } })
    return response.data.data;
})

// get company by id
export const getCompanyDataById = async (id) => {
    const response = await axios.get(`/companies/${id}`, { headers: { token: token } });
    return response.data.data;
}

// get company state log limit 10
export const getCompanyStateLog = async (companyId) => {
    const response = await axios.get(`/tasks/recent/${companyId}`, { headers: { token: token } });
    return response.data.data;
}

// delete company staff
export const deleteCompanyAccountDataAsync = createAsyncThunk('companies/deleteCompanyStaff', async (companyId) => {
    const response = await axios.delete(`/companies/staff/delete/${companyId}`, { headers: { token: token } })
    return response.data.data;
})

const companiesSlice = createSlice({
    name: "companies",
    initialState: {
        allCompanies: [],
    },
    reducers: {},
    extraReducers: {
        // get all companies
        [getCompaniesDataAsync.pending]: (state, action) => {
            console.log("pending");
        },
        [getCompaniesDataAsync.fulfilled]: (state, action) => {
            console.log("success");
            state.allCompanies = action.payload;
        },
        [getCompaniesDataAsync.rejected]: (state, action) => {
            console.log("error");
        },

        // post company
        [postCompanyDataAsync.pending]: (state, action) => {
            console.log('pending')
        },
        [postCompanyDataAsync.fulfilled]: (state, action) => {
            console.log('success')
            state.allCompanies.push(action.payload);
        },
        [postCompanyDataAsync.rejected]: (state, action) => {
            console.log('error')
        },

        // put company
        [putCompanyDataAsync.pending]: (state, action) => {
            console.log('pending')
        },
        [putCompanyDataAsync.fulfilled]: (state, action) => {
            console.log('success')
            const putCompany = action.payload;
            const index = state.allCompanies.findIndex((company) => company.id === putCompany.id);
            state.allCompanies[index] = putCompany;
        },
        [putCompanyDataAsync.rejected]: (state, action) => {
            console.log('error')
        },

        // delete company
        [deleteCompanyDataAsync.pending]: (state, action) => {
            console.log('pending')
        },
        [deleteCompanyDataAsync.fulfilled]: (state, action) => {
            console.log('success')
            state.allCompanies.filter((company) => company.id !== action.payload)
        },
        [deleteCompanyDataAsync.rejected]: (state, action) => {
            console.log('error')
        },
        // delete company staff
        [deleteCompanyAccountDataAsync.pending]: (state, action) => {
            console.log('pending')
        },
        [deleteCompanyAccountDataAsync.fulfilled]: (state, action) => {
            console.log('success')
            state.allCompanies.filter((company) => company.id !== action.payload)
        },
        [deleteCompanyAccountDataAsync.rejected]: (state, action) => {
            console.log('error')
        },
    }
})

const companiesReducer = companiesSlice.reducer;

export const companiesSelector = state => state.companiesReducer.allCompanies;


export default companiesReducer;