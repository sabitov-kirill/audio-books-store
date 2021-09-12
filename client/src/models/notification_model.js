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

    extraReducers: {
        // New book bought
        'user/buyBook/pending': (state) => {
            state.code = 'buyPending';
            state.id = nanoid();
        },
        'user/buyBook/fulfilled': (state) => {
            state.code = 'buySuccess';
            state.id = nanoid();
        },
        'user/buyBook/rejected': (state) => {
            state.code = 'buyError';
            state.id = nanoid();
        },
    },
});

export const { notify } = notificationSlice.actions;

// Notification slice reducer
export default notificationSlice.reducer;
