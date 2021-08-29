/**
 *
 * CREATION DATE: 28.08.2021
 *
 * PROGRAMMER:    Daniil Smirnov.
 *
 * PURPOSE:       Audio books web store application.
 *                Notification model declaration module.
 *
 */

import {createSlice, nanoid} from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        code: '',
        id: 0,
    },
    reducers: {
        notify(state, action){
            state.code = action.payload.code;
            state.id = nanoid();
        },
    },
    extraReducers: {},
});

export const { notify } = notificationSlice.actions;

// Notification slice reducer
export default notificationSlice.reducer;
