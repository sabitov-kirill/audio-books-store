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

import { nextPage, prevPage, switchControlPanel } from "../../models/reader_model";
import ReaderPageView from "../../views/reader/reader_page_view";

// Connecting component view to model with controller
export default connect(
    (state) => ({
        imageUrl: `${state.reader.bookUrl}/page_${state.reader.page}.png`
    }),
    (dispatch) => ({
        prevPage: () => dispatch(prevPage()),
        nextPage: () => dispatch(nextPage()),
        switchControlPanel: () => dispatch(switchControlPanel()),
    })
)(ReaderPageView);