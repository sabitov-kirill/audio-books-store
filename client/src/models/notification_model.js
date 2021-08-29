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

import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notify(state, code) {
            state = code.payload
        },
    },
    extraReducers: {},
});

export const { notify } = notificationSlice.actions;

// Notification slice reducer
export default notificationSlice.reducer;
