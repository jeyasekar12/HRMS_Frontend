import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("userinfo")
        ? JSON.parse(localStorage.getItem("userinfo"))
        : null,  // Ensures initialState is not undefined
    isSidebarOpen: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState, // Correctly passing initialState here
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("userinfo", JSON.stringify(action.payload));
        },

        logout: (state) => {
            state.user = null;
            localStorage.removeItem("userinfo");
        },

        setOpenSidebar: (state, action) => {
            state.isSidebarOpen = action.payload;
        },
    },
});

export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;

export default authSlice.reducer;
