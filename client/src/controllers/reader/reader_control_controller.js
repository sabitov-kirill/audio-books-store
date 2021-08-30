/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Daniel Konev.
 *
 * PURPOSE:       Audio books web store application.
 *                Reader page flexer.
 *
 */

import { connect } from "react-redux";
import { switchControlPanel, pauseAudio, playAudio, startPage } from "../../models/reader_model";
import ReaderControl from "../../views/reader/reader_control_view";

// Connecting component view to model with controller
export default connect(
    (state) => ({
        isControlPanel: state.reader.isControlPanel,
        pagesCount: state.reader.pagesCount,
        page: state.reader.page,
        isAudioPaused: state.reader.isPaused,
    }),
    (dispatch) => ({
        switchControlPanel: () => dispatch(switchControlPanel()),
        pauseAudio: () => dispatch(pauseAudio()),
        playAudio: () => dispatch(playAudio()),
        startPage: () => dispatch(startPage())
    })
)(ReaderControl);