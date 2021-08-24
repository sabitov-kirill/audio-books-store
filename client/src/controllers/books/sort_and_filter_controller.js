/**
 *
 * CREATION DATE: 19.08.2021
 *
 * PROGRAMMER:    Daniil Smirnov.
 *
 * PURPOSE:       Audio books web store application.
 *                Sort and filter controller handle module
 *
 */

import { connect } from "react-redux";

import SortNFilterForm from "../../views/books/list_page/books_sort_and_filter_form";
import { filter, sorting } from "../../models/books_model";

// Component view, connected to model
export default connect(
    (state) => ({
        options: state.books.filterOptions,
        filters: state.books.filters,
        sortKey: state.books.sortKey,
    }),
    (dispatch) => ({
        sorting: (key) => dispatch(sorting(key)),
        filter: (key) => dispatch(filter(key)),
    })
)(SortNFilterForm);