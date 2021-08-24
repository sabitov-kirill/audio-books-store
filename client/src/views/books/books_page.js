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

 import BooksListView from "../../controllers/books/books_list_controller";
 import { useEffect } from "react";
 
 export default function BooksPageView(props) {
     useEffect(() => {props.initBookStorage()});
 
     return (<BooksListView />);
 };