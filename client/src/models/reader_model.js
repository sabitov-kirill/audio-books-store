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

// App store authorization slice
const readerSlice = createSlice({
    name: 'reader',
    initialState:  {
        bookUrl: '',
        page: 0,
        pageCount: 0,

        audio: undefined,
        isAudioLoading: false,
        audioStatus: 'paused',

        isControlPanel: true,
    },

    reducers: {
        init: (state, action) => {
            state.bookUrl = action.payload.bookUrl;
            state.pageCount = action.payload.pageCount;

            // Precahe all book data
            for (let bookPage = 0; bookPage < state.pageCount; bookPage++) {
                fetch(`public/${state.bookUrl}/audio_${bookPage}.mp3`);
                fetch(`public/${state.bookUrl}/page_${bookPage}.mp3`);
            }
        },
        nextPage: (state) => {
            if (state.page < state.pageCount - 1) {
                state.page += 1;

                if (state.audio) state.audio.pause();
                if (state.page != 0) {
                    const audioUrl = `${state.bookUrl}/audio_${state.page}.mp3`;
                    // state.audioStatus = 'playing';
                    state.audio = new Audio(audioUrl);
                    state.isAudioLoading = true;
                }
            }
        },
        prevPage: (state) => {
            if (state.page > 0) {
                state.page -= 1;

                if (state.audio) state.audio.pause();
                if (state.page != 0) {
                    const audioUrl = `${state.bookUrl}/audio_${state.page}.mp3`;
                    state.audio = new Audio(audioUrl);
                    state.isAudioLoading = true;
                }
                else {
                    state.audioStatus = 'paused'
                }
            }
        },
        setSuccessAudioLoad: (state) => {
            state.isAudioLoading = false;
        },
        playAudio: (state) => {
            if (!state.isAudioLoading) {
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
export const { init, nextPage, prevPage, setSuccessAudioLoad, playAudio, pauseAudio, switchControlPanel } = readerSlice.actions;

// User slice reducer
export default readerSlice.reducer;