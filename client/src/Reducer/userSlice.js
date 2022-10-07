import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",

    initialState: {
        displayName: "",
        uid: "",
        accessToken: "",
        isLoading: false,
    },

    reducers: {
        loginUser: (state, action) => {
            state.displayName = action.payload.displayName;
            state.uid = action.payload.uid;
            state.accessToken = action.payload.accessToken;
            state.isLoading = true;
        },
        clearUser: (state) => {
            state.displayName = "";
            state.uid = "";
            state.accessToken = "";
            state.isLoading = true;
        }
    }
})

export const { loginUser, clearUser } = userSlice.actions;

export default userSlice.reducer;