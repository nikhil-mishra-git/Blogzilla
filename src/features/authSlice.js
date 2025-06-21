import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedin: false,
    userData: null,
    avatarUrl:null,
}

const authSlice = createSlice({
    name: "authReducer",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedin = true;
            state.userData = action.payload.userData;
        },
        logout: (state, action) => {
            state.isLoggedin = false;
            state.userData = null;
        },
        setAvtarUrl:(state, action)=>{
          state.avatarUrl = action.payload
        }
    }
})

export const { login, logout, setAvtarUrl } = authSlice.actions;
export default authSlice.reducer;