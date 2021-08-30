/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov.
 *
 * PURPOSE:       Audio books web store application.
 *                Reader model declaration module.
 *
 */

import { createSlice } from "@reduxjs/toolkit";
import * as cookies from 'cookie'

// App store authorization slice
const readerSlice = createSlice({
    name: 'reader',
    initialState:  {
        bookId: '',
        bookUrl: '',
        page: 0,
        pagesCount: 0,

        audio: undefined,
        isAudioLoading: false,
        audioStatus: 'paused',

        isControlPanel: true,
    },

    reducers: {
        init: (state, action) => {
            // Set book data
            state.bookId = action.payload.bookId;
            state.bookUrl = `/books/${action.payload.bookId}`;
            state.pagesCount = action.payload.pagesCount;

            // Get last seen page number from cookeis
            const lastSeenPage = cookies.parse(document.cookie)[state.bookId];
            if (lastSeenPage) state.page = Number(lastSeenPage);

            // Precahe all book data if not done before
            if (!cookies.parse(document.cookie)[`${state.bookId}_cahed`]) {
                for (let bookPage = 0; bookPage < state.pagesCount; bookPage++) {
                    new Audio(`/books/${action.payload.bookId}/audio_${bookPage}.mp3`);
                    new Image().src = `/books/${action.payload.bookId}/page_${bookPage}.png`;
                }

                document.cookie = cookies.serialize(`${state.bookId}_cahed`, true, {
                    maxAge: 30 * 24 * 60 * 60 * 1000
                });
            }
        },
        close: (state) => {
            document.cookie = cookies.serialize(state.bookId, state.page, { 
                maxAge: 30 * 24 * 60 * 60 * 1000
            });

            if (!state.isAudioLoading) {
                state.audioStatus = 'paused';
                if (state.audio) state.audio.pause();
            }
        },
        nextPage: (state) => {
            if (state.page < state.pagesCount - 1) {
                state.page = Number(state.page) + 1;

                if (state.audio) state.audio.pause();
                if (state.page !== 0) {
                    const audioUrl = `${state.bookUrl}/audio_${state.page}.mp3`;
                    state.audio = new Audio(audioUrl);
                    state.isAudioLoading = true;
                }
            }
        },
        prevPage: (state) => {
            if (state.page > 0) {
                state.page = Number(state.page) - 1;

                if (state.audio) state.audio.pause();
                if (state.page === 0) {
                    state.audioStatus = 'paused';
                }
                else {
                    const audioUrl = `${state.bookUrl}/audio_${state.page}.mp3`;
                    state.audio = new Audio(audioUrl);
                    state.isAudioLoading = true;
                }
            }
        },
        startPage(state) {
            state.page = 0;
            state.audioStatus = 'paused';
            if (state.audio) state.audio.pause();
        },
        setSuccessAudioLoad: (state) => {
            state.isAudioLoading = false;
        },
        playAudio: (state) => {
            if (state.page === 0) {
                state.page = 1;

                const audioUrl = `${state.bookUrl}/audio_${state.page}.mp3`;
                state.audio = new Audio(audioUrl);
                state.isAudioLoading = true;
                state.audioStatus = 'playing';
            } else if (!state.isAudioLoading) {
                state.audioStatus = 'playing';
                if (state.audio) state.audio.play();
            }
        },
        pauseAudio: (state) => {
            if (!state.isAudioLoading) {
                state.audioStatus = 'paused';
                if (state.audio) state.audio.pause();
            }
        },

        switchControlPanel: (state) => {
            state.isControlPanel = !state.isControlPanel;
        },
    }
});

// Export action creators
export const { 
    init, close, 
    nextPage, prevPage, startPage,
    setSuccessAudioLoad, playAudio,
    pauseAudio, switchControlPanel
} = readerSlice.actions;

// User slice reducer
export default readerSlice.reducer;