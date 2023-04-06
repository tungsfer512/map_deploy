import { configureStore } from '@reduxjs/toolkit'
import vehiclesReducer from './reducers/vehicleSlice'
import binsReducer from './reducers/binSlice'
import driversReducer from './reducers/driverSlice'
import managersReducer from './reducers/managerSlice'
import authReducer from './reducers/authSlice'
import notiReducer from './reducers/notiSlice'
import waypointsReducer from './reducers/waypointSlice'

const store = configureStore({
    reducer: {
        vehiclesReducer,
        binsReducer,
        driversReducer,
        managersReducer,
        authReducer,
        notiReducer,
        waypointsReducer,
    }
})

export default store