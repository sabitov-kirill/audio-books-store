/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov,
 *                Daniil Smirnov,
 *                Daniel Konev.
 *
 * PURPOSE:       Audio books web store application.
 *                Application global states store handle module.
 *
 */

import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../models/user_model'

// Application global states store creation
export const store = configureStore({
  reducer: {
    user: userReducer
  },
});