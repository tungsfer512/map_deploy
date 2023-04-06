import { createSlice } from '@reduxjs/toolkit';

const waypointSlice = createSlice({ // createReducer + createActions
    name: 'waypoints',
    initialState: {
        data: [],
        hideInMap: false,
        oldVehicleId: null,
    },
    reducers: {
        setWayPoints: (state, action) => {
            state.data = action.payload.data;
            state.hideInMap = action.payload.hideInMap;
            state.oldVehicleId = action.payload.oldVehicleId;
        },
        clearWayPoints: (state, action) => {
            state.data = [];
            state.hideInMap = false;
            state.oldVehicleId = null;
        },
    },
    extraReducers: {},
})

const waypointsReducer = waypointSlice.reducer;

export const waypointsSelector = state => state.waypointsReducer;

// export updateVehicles
export const { setWayPoints, clearWayPoints } = waypointSlice.actions;

export default waypointsReducer