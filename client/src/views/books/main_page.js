/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Smirnov Daniil.
 *
 * PURPOSE:       Audio books web store application.
 *                Main page.
 *
 */

import Container from 'react-bootstrap/Container';
import SearchBarForm from "../../controllers/books/search_bar_controller";
import SortNFilterForm from "../../controllers/books/sort_and_filter_controller";
import BooksListView from "../../controllers/books/books_list_controller";

export default function MainPageView(props) {
    return (
        <Container>
            <SearchBarForm />
            <SortNFilterForm />
            <BooksListView />
        </Container>
    );
};