import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
    noti: [],
    position: [],
};

export const notiSlice = createSlice({
    name: "noti",
    initialState,
    reducers: {
        getNoti: (state, action) => {
            state.noti = action.payload;
        },
        getCount: (state, action) => {
            state.count = action.payload;
        },
        setNoti: (state, action) => {
            state.noti = action.payload;
        },
        setCount: (state, action) => {
            state.count = action.payload;
        },
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        addNoti: (state, action) => {
            state.noti.unshift(action.payload);
        },
        removeNoti: (state, action) => {
            state.noti = state.noti.filter((item) => item.id !== action.payload);
        },
        clearNoti: (state) => {
            state.noti = [];
        },
        cleartCount: (state) => {
            state.count = 0;
        },
        setPosition: (state, action) => {
            state.position = action.payload;
        },
    },
});

const notiReducer = notiSlice.reducer;

export const { increment, decrement, addNoti, removeNoti, clearNoti, cleartCount, getNoti, getCount, setNoti, setCount, setPosition } = notiSlice.actions;
export const countSelector = state => state.notiReducer.count;
export const notiSelector = state => state.notiReducer.noti;
export const positionSelector = state => state.notiReducer.position;

export default notiReducer;