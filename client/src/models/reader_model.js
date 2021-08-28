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

// App store user slice
const readerSlice = createSlice({
    name: 'reader',
    initialState:  {
        bookUrl: '',
        page: 0,
        audio: '',
        audioStatus: 'none'
    },

    reducers: {
        init: (state, action) => {
            state.bookUrl = action.payload.bookUrl;

            const audioUrl = `${state.bookUrl}/audio_${page}.mp3`;
            state.audio = new Audio(audioUrl);
            state.audioStatus = 'pending';

            state.audio.addEventListener('canplay', () => {
                state.audioStatus = 'canplay';
            });
        },
        nextPage: (state) => {
            state.page += 1;

            const audioUrl = `${state.bookUrl}/audio_${page}.mp3`;
            state.audio = new Audio(audioUrl);
            state.audioStatus = 'pending';
            
            state.audio.addEventListener('canplay', () => {
                if (state.audioStatus !== 'paused') {
                    state.audioStatus = 'playing';
                    state.audio.play();
                } else {
                    state.audioStatus = 'canplay';
                }
            });
        },
        previousPage: (state) => {
            state.page -= 1;

            const audioUrl = `${state.bookUrl}/audio_${page}.mp3`;
            state.audio = new Audio(audioUrl);
            state.audioStatus = 'pending';
            
            state.audio.addEventListener('canplay', () => {
                if (state.audioStatus !== 'paused') {
                    state.audioStatus = 'playing';
                    state.audio.play();
                } else {
                    state.audioStatus = 'canplay';
                }
            });
        },
        playAudio: (state) => {
            if (state.audioStatus === 'canplay' || state.audioStatus !== 'paused') {
                state.audioStatus = 'playing';
                state.audio.play();
            }
        },
        pauseAudio: (state) => {
            if (state.audioStatus === 'playing') {
                state.audioStatus = 'paused';
                state.audio.pause();
            }
        }
    }
});

// User slice reducer
export default readerSlice.reducer;