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
import { switchControlPanel, pauseAudio, playAudio, nextPage, startPage } from "../../models/reader_model";
import ReaderControl from "../../views/reader/reader_control_view";

// Connecting component view to model with controller
export default connect(
    (state) => ({
        isControlPanel: state.reader.isControlPanel,
        audioStatus: state.reader.audioStatus,
        page: state.reader.page,
        pagesCount: state.reader.pagesCount
    }),
    (dispatch) => ({
        switchControlPanel: () => dispatch(switchControlPanel()),
        pauseAudio: () => dispatch(pauseAudio()),
        playAudio: () => dispatch(playAudio()),
        nextPage: () => dispatch(nextPage()),
        startPage: () => dispatch(startPage())
    })
)(ReaderControl);