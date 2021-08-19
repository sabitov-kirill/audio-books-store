/**
 *
 * CREATION DATE: 19.08.2021
 *
 * PROGRAMMER:    Daniil Smirnov.
 *
 * PURPOSE:       Audio books web store application.
 *                Search bar controller handle module
 *
 */

import { connect } from "react-redux";

import SearchBarForm from "../../views/books/search_bar_form";
import { search } from "../../models/books_model";

// Component view, connected to model
export default connect(
    (state) => ({
        searchKey: state.books.searchKey,
        isSearch: state.books.searchKey !== '',
    }),
    (dispatch) => ({
        search: (key) => dispatch(search(key)),
    })
)(SearchBarForm);