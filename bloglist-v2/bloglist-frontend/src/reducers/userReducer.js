import { createSlice } from "@reduxjs/toolkit";
import userServices from '../services/users';

const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUserList(state, action) {
            return action.payload;
        },
    },
});

export const { setUserList } = userSlice.actions;

export const initializeUsers = () => {
    return async dispatch => {
        const users = await userServices.getAll();
        dispatch(setUserList(users));
    };
};

export default userSlice.reducer;