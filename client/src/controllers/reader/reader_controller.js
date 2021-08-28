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

import { init, setSuccessAudioLoad, playAudio } from "../../models/reader_model";
import ReaderView from "../../views/reader/reader_view";

// Connecting component view to model with controller
export default connect(
    (state) => ({
        audio: state.reader.audio,
        isAudioLoading: state.reader.isAudioLoading,
        audioStatus: state.reader.audioStatus
    }),
    (dispatch) => ({
        init: (bookData) => dispatch(init(bookData)),
        setSuccessAudioLoad: () => dispatch(setSuccessAudioLoad()),
        playAudio: () => dispatch(playAudio())
    })
)(ReaderView);