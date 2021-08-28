/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov.
 *
 * PURPOSE:       Audio books web store application.
 *                User login form controller handle module
 *
 */

import { connect } from "react-redux";

import { init, setSuccessAudioLoad, playAudio, pauseAudio, nextPage } from "../../models/reader_model";
import ReaderView from "../../views/reader/reader_view";

// Connecting component view to model with controller
export default connect(
    (state) => ({
        audio: state.reader.audio,
        isAudioLoading: state.reader.isAudioLoading,
        audioStatus: state.reader.audioStatus,
        ownedBooks: state.user.ownedBooks,
        isLoading: state.user.loginStatus === 'pending',
        books: state.books.bookStorage
    }),
    (dispatch) => ({
        init: (bookData) => dispatch(init(bookData)),
        setSuccessAudioLoad: () => dispatch(setSuccessAudioLoad()),
        playAudio: () => dispatch(playAudio()),
        pauseAudio: () => dispatch(pauseAudio()),
        nextPage: () => dispatch(nextPage())
    })
)(ReaderView);