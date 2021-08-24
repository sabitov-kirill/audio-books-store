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
 
 import SearchBarForm from "../../../controllers/books/search_bar_form_controller";
 import SortNFilterForm from "../../../controllers/books/sort_and_filter_controller";
 import BooksList from "../../../controllers/books/books_list_controller";
 import { useEffect } from "react";
 
 export default function BooksPageView(props) {
     useEffect(() => {props.initBookStorage()});
 
     return (
         <Container>
             <SearchBarForm />
             <SortNFilterForm />
             <BooksList />
         </Container>
     );
 };