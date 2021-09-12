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
        page: state.reader.page,
        pagesCount: state.reader.pagesCount,
        bookUrl: state.reader.bookUrl,
    }),
    (dispatch) => ({
        prevPage: () => dispatch(prevPage()),
        nextPage: () => dispatch(nextPage()),
    }),
    null,
    { forwardRef: true }
)(ReaderPageView);