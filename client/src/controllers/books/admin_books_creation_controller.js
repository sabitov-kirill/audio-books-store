/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Daniil Smirnov.
 *
 * PURPOSE:       Audio books web store application.
 *                Admin panel controller for books creation.
 *
 */

import { connect } from "react-redux";

import AdminBooksCreationView from '../../views/books/admin_books_creation_view'

// Component view, connected to model
export default connect(
    (state) => ({
        isLoading: state.user.loginStatus === 'pending',
        isAdmin: state.user.isAdmin,
    })
)(AdminBooksCreationView);