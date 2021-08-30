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
import * as cookies from 'cookie';

let onAudioCanPlay, onAudioEnd;
let bookAudio = null;

// App store authorization slice
const readerSlice = createSlice({
    name: 'reader',
    initialState:  {
        bookId: '',
        bookUrl: '',
        page: 0,
        pagesCount: 0,
        isControlPanel: true,
        isPaused: true,        
    },

    reducers: {
        init: (state, action) => {
            // Set book data
            state.bookId = action.payload.bookId;
            state.bookUrl = `/books/${action.payload.bookId}`;
            state.pagesCount = action.payload.pagesCount;
            onAudioCanPlay = action.payload.onAudioCanPlay;
            onAudioEnd = action.payload.onAudioEnd;

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

            // Get last seen page number from cookeis
            const lastSeenPage = cookies.parse(document.cookie)[state.bookId];
            if (lastSeenPage) state.page = Number(lastSeenPage);

            // Load audio for current page
            if (state.page !== 0) {
                bookAudio = new Audio(`${state.bookUrl}/audio_${state.page}.mp3`);
                bookAudio.addEventListener('canplay', onAudioCanPlay);
                bookAudio.addEventListener('ended', onAudioEnd);
            }
        },

        close: (state) => {
            if (bookAudio) bookAudio.pause();
        },

        nextPage: (state) => {
            if (state.page < state.pagesCount - 1) {
                // Turn next page
                state.page = Number(state.page) + 1;

                // Pause audio of previous page
                if (bookAudio) bookAudio.pause();

                // Load new audio
                if (state.page !== 0) {
                    bookAudio = new Audio(`${state.bookUrl}/audio_${state.page}.mp3`);
                    bookAudio.addEventListener('canplay', onAudioCanPlay);
                    bookAudio.addEventListener('ended', onAudioEnd);
                }

                document.cookie = cookies.serialize(state.bookId, state.page, {
                    maxAge: 30 * 24 * 60 * 60 * 1000
                });
            }
        },

        prevPage: (state) => {
            if (state.page > 0) {
                // Turn next page
                state.page = Number(state.page) - 1;

                // Pause audio of previous page
                if (bookAudio) bookAudio.pause();

                // Load new audio
                if (state.page !== 0) {
                    bookAudio = new Audio(`${state.bookUrl}/audio_${state.page}.mp3`);
                    bookAudio.addEventListener('canplay', onAudioCanPlay);
                    bookAudio.addEventListener('ended', onAudioEnd);
                }

                document.cookie = cookies.serialize(state.bookId, state.page, {
                    maxAge: 30 * 24 * 60 * 60 * 1000
                });
            }
        },

        autoPlay(state) {
            if (!state.isPaused) bookAudio.play();
        },

        startPage(state) {
            // Turn next page
            state.page = 0;

            // Pause audio
            bookAudio.pause();
            state.isPaused = true;

            document.cookie = cookies.serialize(state.bookId, state.page, {
                maxAge: 30 * 24 * 60 * 60 * 1000
            });
        },

        playAudio: (state) => {
            if (state.page === 0) {
                state.page = 1;

                // Play audio
                bookAudio = new Audio(`${state.bookUrl}/audio_${state.page}.mp3`);
                bookAudio.addEventListener('ended', onAudioEnd);
                bookAudio.autoplay = true;
                state.isPaused = false;
            } else {
                if (bookAudio) bookAudio.play();
                state.isPaused = false;
            }
        },

        pauseAudio: (state) => {
            if (bookAudio) bookAudio.pause();
            state.isPaused = true;
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
    setSuccessAudioLoad, playAudio, autoPlay,
    pauseAudio, switchControlPanel
} = readerSlice.actions;

// User slice reducer
export default readerSlice.reducer;