import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slices/authslice"
import {apiSlice} from "./slices/apislice"

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => 
        {return getDefaultMiddleware().concat(apiSlice.middleware)},
    devTools:true,
});



export default store